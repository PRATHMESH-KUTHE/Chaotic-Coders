
# AI Chatbot using Vite and TypeScript

This is an AI chatbot built using **Vite**, **TypeScript**, **React**, and **OpenAI API**. It features a clean, modular architecture with reusable components.

## 🚀 Features
- AI-powered chatbot using OpenAI's API
- Modular component-based architecture
- TypeScript support for better type safety
- Styled with TailwindCSS

---

## 🛠 Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/ai-chatbot.git
cd ai-chatbot
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up OpenAI API Key
Create a `.env.local` file in the root directory and add your OpenAI API key:
```env
VITE_OPENAI_API_KEY=your-api-key-here
```

### 4️⃣ Run the Development Server
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to see the chatbot in action!

---

## 📂 Project Structure
```
ai-chatbot/
│── public/                    # Static assets
│── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── ChatHistory.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── TopicSelector.tsx
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   ├── use-toast.ts
│   ├── lib/
│   ├── pages/
│   ├── types/
│   │   ├── vite-env.d.ts
│   ├── App.tsx                 # Main App Component
│   ├── main.tsx                # App Entry Point
│   ├── index.css               # Global Styles
│
│── .gitignore                  # Ignored files for Git
│── package.json                # Dependencies and scripts
│── vite.config.ts               # Vite Configuration
│── README.md                   # Project documentation
```

---

## 📝 Usage
- Type a message in the chat input box and press **Enter** or click **Send**.
- The chatbot will generate a response using OpenAI's API.
- Responses appear in real-time, creating a smooth conversational experience.

---

## 🚀 Deployment
To deploy the chatbot, use **Vercel** or **Netlify**:
```sh
npx vercel


