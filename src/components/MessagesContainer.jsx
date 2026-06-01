import { useEffect, useRef } from 'react';
import { FaBrain, FaUser } from 'react-icons/fa6';

const MessageContainer = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full px-md">
        <p className="text-label-md font-label-md text-on-surface-variant text-center">
          No messages yet. Start a conversation!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-sm overflow-y-auto h-full p-md">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex gap-xs items-end ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {/* Avatar */}
          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs ${message.role === 'user' ? 'bg-surface-container text-on-surface-variant' : 'bg-primary text-on-primary'}`}>
            {message.role === 'user' ? <FaUser /> : <FaBrain />}
          </div>

          {/* Bubble */}
          <div
            className={`max-w-[78%] px-md py-sm text-body-sm leading-relaxed ${
              message.role === 'user'
                ? 'bg-primary text-on-primary rounded-xl rounded-br-xs'
                : 'bg-surface-container-low border border-primary-fixed-dim text-on-surface rounded-xl rounded-bl-xs'
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageContainer;
