import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const mockKnowledgeBase = {
  tailors: [
    { name: "Stitch & Style", contact: "98765xxxxx", location: "Block A", rating: 4.8 },
    { name: "Modern Tailors", contact: "98764xxxxx", location: "Block B", rating: 4.3 }
  ],
  electricians: [
    { name: "Rahul Electric Works", verified: true, available: "Now", location: "Block B" },
    { name: "PowerFix Co.", verified: true, available: "4 PM onwards", location: "Block C" }
  ],
  garbage: {
    "Block A": { days: ["Mon", "Wed", "Fri"], time: "8:00 AM" },
    "Block B": { days: ["Tue", "Thu", "Sat"], time: "8:00 AM" },
    "Block C": { days: ["Mon", "Wed", "Fri"], time: "9:00 AM" }
  }
};

function NeighbourBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hi! I'm NeighbourBot, your community assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('tailor')) {
      return `Here are nearby tailoring options:\n\n${mockKnowledgeBase.tailors.map(t => 
        `${t.name}, ${t.rating}★ – ${t.location}\n📞 ${t.contact}`
      ).join('\n\n')}\n\nWould you like directions or to call?`;
    }
    
    if (lowerInput.includes('electrician')) {
      return `Available electricians:\n\n${mockKnowledgeBase.electricians.map(e => 
        `${e.name} – ${e.verified ? '✓ Verified' : 'Pending verification'}\n📍 ${e.location}\n⏰ ${e.available}`
      ).join('\n\n')}\n\nShall I connect you with one of them?`;
    }
    
    if (lowerInput.includes('garbage')) {
      const schedule = Object.entries(mockKnowledgeBase.garbage)
        .map(([block, info]) => `${block}: ${info.days.join(', ')} at ${info.time}`)
        .join('\n');
      return `Here's the garbage collection schedule:\n\n${schedule}\n\nNeed to report a missed pickup?`;
    }

    return "I'm not sure about that. Would you like to know about:\n- Tailoring services\n- Electricians\n- Garbage collection schedule\n- Community events\n- Emergency contacts";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: processUserInput(inputValue),
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputValue('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <span className="sr-only">Open chat</span>
          <span className="text-2xl">💬</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-gray-800 rounded-2xl shadow-xl w-96 max-w-full border border-gray-700">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">NeighbourBot</h3>
              <p className="text-sm text-gray-400">Your community assistant</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {format(message.timestamp, 'HH:mm')}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default NeighbourBot;