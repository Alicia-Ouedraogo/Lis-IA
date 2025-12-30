
import React from 'react';
import { Message, MessageRole } from '../types';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;

  return (
    <div className={`flex w-full mb-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[85%]`}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center border border-orange-200 shadow-sm mb-1">
            <i className="fa-solid fa-leaf text-orange-500 text-[10px]"></i>
          </div>
        )}
        <div 
          className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed transition-all ${
            isUser 
              ? 'bg-orange-600 text-white rounded-br-none' 
              : 'bg-white text-slate-700 border border-orange-50 rounded-bl-none'
          }`}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
          <div className={`text-[10px] mt-2 opacity-50 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};
