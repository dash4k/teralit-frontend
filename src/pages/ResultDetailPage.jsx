import { useNavigate, useParams } from 'react-router-dom';
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
import { CLASSIMAGE, CLASSLABEL, DIAGNOSISMAP } from '../utils/utilities/classification.js';

const ResultDetailPage = ({ authedUser }) => {
  const navigate = useNavigate();
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
    if (chat === '') {
      return;
    }
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

  if (!session) navigate('/invalid-sessionId');

  if (loading) return (
    <section className="w-full min-h-dvh lg:h-auto px-container-margin mx-auto flex flex-col justify-center items-center text-on-surface dark:text-inverse-on-surface">
      <LoadingIcon />
    </section>
  );
  return (
    <section className="w-full min-h-dvh lg:h-auto px-container-margin mx-auto flex flex-col justify-center items-center lg:items-start">
      <div className="flex flex-col gap-lg">
        <Heading>Result</Heading>
        <div className="grid grid-cols-3 gap-sm mb-lg">
          {[
            { label: 'Status', content: <SessionStatus status={session?.status ?? ''} /> },
            { label: 'Created', content: <BodyText>{new Date(session?.createdAt ?? '').toLocaleString('ID')}</BodyText> },
            { label: 'Updated', content: <BodyText>{new Date(session?.updatedAt ?? '').toLocaleString('ID')}</BodyText> },
          ].map(({ label, content }) => (
            <div
              key={label}
              className="bg-surface-container dark:bg-inverse-surface rounded p-md flex flex-col items-start justify-start"
            >
              <p className="text-label-bold font-label-bold text-on-surface-variant dark:text-inverse-on-surface uppercase tracking-widest mb-xs">{label}</p>
              {content}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-md mb-lg">
          {[
            { label: 'Uploaded Image', src: imageUrl, alt: 'uploaded image' },
            { label: 'Reference Example', src: CLASSIMAGE[classification?.diagnosis] ?? '', alt: `Example of ${CLASSLABEL[classification?.diagnosis] ?? ''}` },
          ].map(({ label, src, alt }) => (
            <div
              key={label}
              className="border border-outline rounded-lg overflow-hidden"
            >
              <div className="bg-surface-container-low dark:bg-inverse-surface px-md py-xs border-b border-outline">
                <p className="text-label-bold font-label-bold text-primary dark:text-inverse-primary uppercase tracking-widest py-2">{label}</p>
              </div>
              <div className="p-md flex items-center justify-center bg-surface-dim dark:bg-gray-900 h-full">
                <img
                  src={src ?? ''}
                  alt={alt}
                  className="max-h-40 object-contain pb-8"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="border border-outline rounded-lg overflow-hidden mb-lg">
          <div className="bg-surface-container-low dark:bg-inverse-surface px-md py-xs border-b border-outline flex items-center gap-sm">
            <p className="text-label-bold font-label-bold text-primary dark:text-inverse-primary uppercase tracking-widest py-2">Classification Result</p>
          </div>
          <div className="grid grid-rows-[auto_auto] gap-lg p-md max-w-150 ">
            <div className='grid grid-cols-3 gap-xl px-lg'>
              <div>
                <p className="text-label-bold font-label-bold text-on-surface-variant dark:text-inverse-on-surface mb-xs">Diagnosis</p>
                <BodyText>{CLASSLABEL[classification?.diagnosis] ?? 'Not found'}</BodyText>
              </div>
              <div>
                <p className="text-label-bold font-label-bold text-on-surface-variant dark:text-inverse-on-surface mb-xs">Confidence</p>
                <BodyText>{((classification?.confidence ?? 0) * 100).toFixed(2)}%</BodyText>
                <div className="h-1 bg-outline-variant rounded-full mt-xs overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${((classification?.confidence ?? 0) * 100).toFixed(0)}%` }}
                  />
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <div className="flex flex-col">
                  <p className="text-label-bold font-label-bold text-on-surface-variant dark:text-inverse-on-surface mb-xs">Risk Level</p>
                  <BodyText>{classification?.riskLevel ? classification?.riskLevel[0].toUpperCase() + classification?.riskLevel.slice(1) : 'Not found'}</BodyText>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-start justify-start px-lg'>
              <BodyText>{`"${DIAGNOSISMAP[classification?.diagnosis] ?? 'Not found'}"`}</BodyText>
            </div>
          </div>
        </div>
      </div>
      <div className={`fixed bottom-0 right-0 flex flex-col border border-outline rounded-tl-lg overflow-hidden bg-surface dark:bg-gray-800 transition-all duration-300 shadow-lg ${chatOpened ? 'w-70 h-100 lg:w-100 lg:h-100' : 'w-36 h-auto'}`}>

        {/* Header — always visible, toggles open/close */}
        <div
          onClick={toggleChat}
          className="bg-primary px-md py-sm flex items-center justify-between cursor-pointer shrink-0"
        >
          <div className="flex items-center gap-sm">
            <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
              <FaBrain className="text-on-primary text-xs" />
            </div>
            {chatOpened && (
              <div>
                <p className="text-label-bold font-label-bold text-on-primary">Alit Chatbot</p>
                <p className="text-label-md font-label-md text-on-primary opacity-60">AI Assistant</p>
              </div>
            )}
            {!chatOpened && (
              <p className="text-label-bold font-label-bold text-on-primary">Alit</p>
            )}
          </div>
          <FaCircleChevronRight className={`text-on-primary opacity-70 transition-transform duration-300 ${chatOpened ? 'rotate-90' : '-rotate-90'}`} />
        </div>

        {/* Messages */}
        {chatOpened && (
          <>
            <section className="flex-1 overflow-hidden">
              <MessageContainer messages={messages} />
            </section>

            {/* Input */}
            <form
              onSubmit={askAgent}
              className="flex items-center gap-xs p-xs border-t border-outline bg-surface-container dark:bg-inverse-surface shrink-0"
            >
              <input
                type="text"
                value={chat}
                onChange={onChatChange}
                disabled={chatLoading}
                placeholder="Ask about your diagnosis…"
                className="flex-1 text-body-sm px-sm py-xs h-full rounded border border-outline bg-surface text-on-surface dark:bg-gray-900 dark:text-inverse-on-surface focus:outline-none focus:border-primary"
              />
              <Button
                className="rounded w-8 h-8 shrink-0 flex items-center justify-center p-0"
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
