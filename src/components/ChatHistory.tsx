
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import ChatMessage from './ChatMessage';
import { Message } from '@/types/chat';

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatHistory = ({ messages, isLoading }: ChatHistoryProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <h3 className="text-lg font-medium mb-2">Welcome to ChatMate Solver!</h3>
            <p>Select a subject and ask any question to get started.</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              content={message.content} 
              isUser={message.isUser} 
              timestamp={message.timestamp} 
            />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-chatmate-primary animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-chatmate-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 rounded-full bg-chatmate-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatHistory;
