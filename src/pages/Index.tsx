
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-green-50">
      <header className="py-6 px-4 bg-white shadow-sm">
        <div className="container max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-chatmate-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">CA</span>
            </div>
            <h1 className="text-xl font-bold text-chatmate-dark">Chaotic AI</h1>
          </div>
          <div className="text-sm text-gray-500">Real-time AI doubt solving for students</div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-chatmate-dark mb-3">Get Instant Help with Your Studies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ask any academic question and receive immediate, detailed explanations from our AI tutor.
            Select your subject for more precise answers.
          </p>
        </div>
        
        <div className="flex justify-center">
          <ChatInterface />
        </div>
      </main>
      
      <footer className="py-6 bg-white border-t">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Chaotic AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
