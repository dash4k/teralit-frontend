import { useParams } from 'react-router-dom';
import { viewSession } from '../utils/api/session';
import { viewImage } from '../utils/api/session-image';
import { viewPrediction } from '../utils/api/classification-result';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaBrain, FaCircleChevronRight } from 'react-icons/fa6';
import Heading from '../components/Heading.jsx';
import SessionStatus from '../components/SessionStatus.jsx';
import BodyText from '../components/BodyText.jsx';
import LoadingIcon from '../components/LoadingIcon.jsx';
import Button from '../components/Button.jsx';
import MessageContainer from '../components/MessagesContainer.jsx';
import { agentAnswer, listMessages } from '../utils/api/message.js';

const ResultDetailPage = ({ authedUser }) => {
  const { sessionId } = useParams();
  if (!sessionId) return null;

  const [session, setSession] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [classification, setClassification] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatOpened, setChatOpened] = useState(false);
  const [chat, setChat] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const onChatChange = (e) => setChat(e.target.value);

  const toggleChat = () => setChatOpened((prev) => !prev);

  const askAgent = async (e) => {
    e.preventDefault();
    const content = chat;
    setChat('');
    setChatLoading(true);
    setMessages((prev) => [...prev, {
      role: 'user',
      content: chat
    }]);
    const { agentMessage } = await agentAnswer({ sessionId, role: 'user', content });
    setMessages((prev) => [...prev, {
      role: 'agent',
      content: agentMessage
    }]);
    setChatLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { session } = await viewSession({ id: sessionId });
        const { imageUrl } = await viewImage({ sessionId });
        const { classification } = await viewPrediction({ sessionId });
        const { messages: fetchedMessages } = await listMessages({ sessionId });

        console.log(classification);
        setSession(session);
        setImageUrl(imageUrl);
        setClassification(classification);
        if (fetchedMessages.length === 0) {
          setMessages([{
            role: 'agent',
            content: `Hello ${authedUser.name}! How can i help you today?`,
          }]);
        } else {
          setMessages(fetchedMessages);
        }

        toast.success('Data loaded successfuly!');
      } catch (err) {
        toast.error(err?.message ?? 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  if (loading) return (
    <section className="w-full min-h-dvh lg:h-auto px-container-margin mx-auto flex flex-col justify-center items-center text-on-surface dark:text-inverse-on-surface">
      <LoadingIcon />
    </section>
  );
  return (
    <section className="w-full min-h-dvh lg:h-auto px-container-margin mx-auto flex flex-col justify-center items-center lg:items-start">
      <div className="flex flex-col gap-lg">
        <Heading>Result</Heading>
        <div className="w-70 px-4 py-1 border border-dashed border-outline flex flex-col gap-md">
          <div className="flex flex-row justify-start items-center gap-container-margin">
            <p className="w-20 text-label-bold font-label-bold text-on-surface dark:text-inverse-on-surface">Status:</p>
            <SessionStatus status={session.status} />
          </div>
          <div className="flex flex-row justify-start items-center gap-container-margin">
            <p className="w-20 text-label-bold font-label-bold text-on-surface dark:text-inverse-on-surface">Created:</p>
            <BodyText>{new Date(session.createdAt).toLocaleString()}</BodyText>
          </div>
          <div className="flex flex-row justify-start items-center gap-container-margin">
            <p className="w-20 text-label-bold font-label-bold text-on-surface dark:text-inverse-on-surface">Updated:</p>
            <BodyText>{new Date(session.updatedAt).toLocaleString()}</BodyText>
          </div>
        </div>
        <img
          src={imageUrl}
          alt="uploaded image"
          className='border border-outline p-2'
        />
        <div className="w-full">
          <div className="w-full px-4 py-1 border border-dashed border-outline flex flex-col gap-md">
            <div className="flex flex-row justify-start items-center gap-container-margin">
              <p className="w-20 text-label-bold font-label-bold text-on-surface dark:text-inverse-on-surface">Diagnosis:</p>
              <BodyText>{classification.diagnosis}</BodyText>
            </div>
            <div className="flex flex-row justify-start items-center gap-container-margin">
              <p className="w-20 text-label-bold font-label-bold text-on-surface dark:text-inverse-on-surface">Confidence:</p>
              <BodyText>{(classification.confidence * 100).toFixed(2)}%</BodyText>
            </div>
            <div className="flex flex-row justify-start items-center gap-container-margin">
              <p className="w-20 text-label-bold font-label-bold text-on-surface dark:text-inverse-on-surface">Risk Level:</p>
              <BodyText>{classification.riskLevel}</BodyText>
            </div>
          </div>
        </div>
      </div>
      <div className={`fixed bottom-0 right-0 flex ${chatOpened ? 'flex-col' : 'items-start justify-center'} gap-sm ${chatOpened ? 'w-70 h-auto lg:w-100 lg:h-100' : 'w-30'} border border-outline bg-surface dark:bg-inverse-surface transition-all`}>
        {!chatOpened && (
          <div
            className='flex items-center justify-center gap-sm py-1'
            onClick={toggleChat}
          >
            <FaBrain />
            <BodyText>Alit Chatbot</BodyText>
          </div>
        )}
        {chatOpened && (
          <>
            <div
              onClick={toggleChat}
              className="px-3 py-1 mb-auto w-full flex items-center justify-start gap-lg border-b border-outline"
            >
              <FaBrain />
              <BodyText>Alit Chatbot</BodyText>
            </div>
            <section className='flex-1 w-full'>
              <MessageContainer messages={messages} />
            </section>
            <form
              className='flex justify-center items-start bg-surface dark:bg-inverse-surface'
              onSubmit={askAgent}
            >
              <input
                type="text"
                value={chat}
                onChange={onChatChange}
                disabled={chatLoading}
                className='border-t border-outline p-2 flex-1'
              />
              <Button
                className='rounded-none h-full py-4 lg:py-2'
                disabled={chatLoading}
                loading={chatLoading}
                onClick={askAgent}
              >
                <FaCircleChevronRight />
              </Button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default ResultDetailPage;
