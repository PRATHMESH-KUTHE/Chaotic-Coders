import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import TopicSelector from './TopicSelector';
import ReactMarkdown from 'react-markdown'; // Import markdown renderer
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('gemini-api-key') || '');
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(!localStorage.getItem('gemini-api-key'));
  const { toast } = useToast();

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini-api-key', apiKey);
      setShowApiKeyDialog(false);
      toast({ title: "API Key Saved", description: "Your Gemini API key has been saved." });
    } else {
      toast({ title: "API Key Required", description: "Please enter a valid API key.", variant: "destructive" });
    }
  };

  const getGeminiResponse = async (message: string, topic: string): Promise<string> => {
    const apiKey = localStorage.getItem('gemini-api-key');
    if (!apiKey) {
      setShowApiKeyDialog(true);
      throw new Error("API key is required");
    }

    const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

    try {
      const response = await fetch(`${API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are an AI tutor specialized in ${topic}. Answer clearly with headings, lists, and code blocks if needed:\n\n${message}` }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
          ]
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message || "Error getting response from Gemini API");

      // Extract and return the response text in markdown format
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedTopic) {
      toast({ title: "Please select a subject", description: "Select a subject before asking a question", variant: "destructive" });
      return;
    }

    const userMessage: Message = { content, isUser: true, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(content, selectedTopic);
      const aiMessage: Message = { content: response, isUser: false, timestamp: new Date() };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      if (!localStorage.getItem('gemini-api-key')) setShowApiKeyDialog(true);
      else toast({ title: "Error", description: "Failed to get a response. Please check your API key and try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicSelect = (topic: string) => setSelectedTopic(topic);

  return (
    <>
      <Card className="w-full max-w-4xl shadow-lg border-t-4 border-t-chatmate-primary">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-chatmate-dark">ChatMate Solver</CardTitle>
            <div className="w-48">
              <TopicSelector onTopicSelect={handleTopicSelect} selectedTopic={selectedTopic} />
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <div className="flex flex-col h-[600px]">
            <div className="flex-1 overflow-auto p-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`p-2 rounded-md ${msg.isUser ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ))}
            </div>
            <Separator />
            <div className="p-4">
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Gemini API Key</DialogTitle>
            <DialogDescription>To use Chaotic AI, you need to provide a Gemini API key from Google AI Studio.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input placeholder="Paste your Gemini API key here" value={apiKey} onChange={(e) => setApiKey(e.target.value)} type="password" />
            <p className="text-xs text-gray-500">
              You can get your API key from{" "}
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                Google AI Studio
              </a>. Your API key is stored locally in your browser.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={saveApiKey}>Save API Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatInterface;
