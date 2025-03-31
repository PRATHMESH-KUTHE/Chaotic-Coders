
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ content, isUser, timestamp }: ChatMessageProps) => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    setFormattedTime(`${formattedHours}:${formattedMinutes}`);
  }, [timestamp]);

  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
        isUser
          ? "bg-chatmate-primary text-white"
          : "bg-white border border-gray-200"
      )}>
        <div className="flex flex-col">
          <div className="text-sm">{content}</div>
          <div className={cn(
            "text-xs mt-1 text-right",
            isUser ? "text-blue-100" : "text-gray-500"
          )}>
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
