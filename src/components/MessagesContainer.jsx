import React, { useEffect, useRef } from 'react';

const MessageContainer = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className='flex items-center justify-center h-full text-on-surface-variant'>
        <p className='text-body-md'>No messages yet. Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-lg overflow-y-scroll max-h-80 p-lg'>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[80%] px-lg py-md rounded-lg ${
              message.role === 'user'
                ? 'bg-primary text-on-primary rounded-br-none'
                : 'bg-surface-container text-on-surface rounded-bl-none'
            }`}
          >
            <p className='text-body-md'>{message.content}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageContainer;
