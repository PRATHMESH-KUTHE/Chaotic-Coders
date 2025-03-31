
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const topics = [
  { id: 'math', name: 'Mathematics' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' },
  { id: 'computer', name: 'Computer Science' },
  { id: 'history', name: 'History' },
  { id: 'geography', name: 'Geography' },
  { id: 'literature', name: 'Literature' },
];

interface TopicSelectorProps {
  onTopicSelect: (topic: string) => void;
  selectedTopic: string;
}

const TopicSelector = ({ onTopicSelect, selectedTopic }: TopicSelectorProps) => {
  const selectedTopicName = topics.find(topic => topic.id === selectedTopic)?.name || 'Select Subject';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedTopicName}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[200px]">
        {topics.map((topic) => (
          <DropdownMenuItem
            key={topic.id}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => onTopicSelect(topic.id)}
          >
            {topic.name}
            {selectedTopic === topic.id && <Check className="h-4 w-4 text-chatmate-secondary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TopicSelector;
