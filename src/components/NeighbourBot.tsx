import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  requiresFeedback?: boolean;
  showOptions?: boolean;
}

interface Intent {
  name: string;
  patterns: string[];
  entities: string[];
  response: (entities: any) => string;
}

const mockKnowledgeBase = {
  tailors: [
    { name: "Stitch & Style", contact: "98765xxxxx", location: "Block A", rating: 4.8, hours: "Mon-Sat" },
    { name: "Modern Tailors", contact: "98764xxxxx", location: "Block B", rating: 4.3, hours: "Mon-Fri" }
  ],
  electricians: [
    { name: "Rahul Electric Works", verified: true, available: "24/7", location: "Block B", contact: "98767xxxxx" },
    { name: "PowerFix Co.", verified: true, available: "10 AM - 8 PM", location: "Block C", contact: "98768xxxxx" }
  ],
  garbage: {
    "Block A": { days: ["Mon", "Wed", "Fri"], time: "7:30 AM", lastPickup: "2023-08-29T07:32:00" },
    "Block B": { days: ["Tue", "Thu", "Sat"], time: "8:00 AM", lastPickup: "2023-08-29T08:05:00" },
    "Block C": { days: ["Mon", "Wed", "Fri"], time: "9:00 AM", lastPickup: "2023-08-29T09:01:00" }
  },
  events: [
    { name: "Clean-up Drive", date: "2023-09-02T08:00:00", location: "Park Lane", rsvpCount: 15 },
    { name: "Ganesh Utsav", date: "2023-09-03T18:00:00", location: "Clubhouse", rsvpCount: 45 }
  ],
  emergency: {
    fire: { number: "101", station: "Block D Fire Station", contact: "98761xxxxx" },
    police: { number: "100", station: "Local Police Station", contact: "98762xxxxx" },
    medical: { name: "24/7 Health Clinic", location: "Block D", contact: "98769xxxxx" }
  }
};

const intents: Intent[] = [
  {
    name: "FindTailor",
    patterns: ["tailor", "stitch", "blouse", "alterations"],
    entities: ["location", "service_type"],
    response: () => {
      return `🧵 Here are nearby tailoring options:\n\n${mockKnowledgeBase.tailors.map(t => 
        `${t.name} – ${t.rating}★ | ${t.hours}\n📍 ${t.location} | 📞 ${t.contact}`
      ).join('\n\n')}\n\nWould you like directions or to call?`;
    }
  },
  {
    name: "FindElectrician",
    patterns: ["electrician", "power", "electrical"],
    entities: ["location", "urgency"],
    response: () => {
      return `⚡ Available Electricians:\n\n${mockKnowledgeBase.electricians.map(e => 
        `${e.name}\n${e.verified ? '✓ Verified' : 'Pending verification'} | ${e.available}\n📍 ${e.location} | 📞 ${e.contact}`
      ).join('\n\n')}\n\nWould you like me to connect you with one of them?`;
    }
  },
  {
    name: "GarbageSchedule",
    patterns: ["garbage", "trash", "waste", "pickup"],
    entities: ["location", "day"],
    response: (entities: { location?: string }) => {
      const block = entities.location || "Block A";
      const schedule = mockKnowledgeBase.garbage[block];
      return `🗑️ Garbage collection in ${block}:\n\n📅 ${schedule.days.join(', ')} at ${schedule.time}\n✅ Last pickup: ${format(new Date(schedule.lastPickup), 'PPp')}\n\nWould you like to file a complaint?`;
    }
  },
  {
    name: "CommunityEvents",
    patterns: ["event", "happening", "meetup", "drive"],
    entities: ["date", "event_type"],
    response: () => {
      return `📅 Upcoming Community Events:\n\n${mockKnowledgeBase.events.map(e => 
        `• ${e.name}\n📍 ${e.location} | 🕒 ${format(new Date(e.date), 'PPp')}\n👥 ${e.rsvpCount} people attending`
      ).join('\n\n')}\n\nWould you like to RSVP for any event?`;
    }
  },
  {
    name: "EmergencyContacts",
    patterns: ["emergency", "fire", "police", "ambulance", "clinic"],
    entities: ["emergency_type"],
    response: () => {
      return `🚨 Emergency Contacts:\n\n🚒 Fire: ${mockKnowledgeBase.emergency.fire.number}\n👮 Police: ${mockKnowledgeBase.emergency.police.number}\n🏥 Medical: ${mockKnowledgeBase.emergency.medical.contact}\n\nFor immediate assistance, which service should I connect you to?`;
    }
  }
];

const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' }
];

function NeighbourBot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: t('welcome_message', {
        defaultValue: "👋 Hi! I'm NeighbourBot, your community assistant. How can I help you today?\n\nYou can ask me about:\n• 🧵 Tailoring services\n• ⚡ Electricians\n• 🗑️ Garbage collection\n• 📅 Community events\n• 🚨 Emergency contacts"
      }),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [awaitingFeedback, setAwaitingFeedback] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectIntent = (input: string): Intent | undefined => {
    const lowerInput = input.toLowerCase();
    return intents.find(intent => 
      intent.patterns.some(pattern => lowerInput.includes(pattern))
    );
  };

  const extractEntities = (input: string) => {
    const entities: { [key: string]: string } = {};
    const blocks = ["Block A", "Block B", "Block C", "Block D"];
    
    blocks.forEach(block => {
      if (input.includes(block)) {
        entities.location = block;
      }
    });

    return entities;
  };

  const handleFeedback = (satisfied: boolean) => {
    const response = satisfied
      ? "✅ Great! I'm always here to help.\n\nWould you like to:\n• Ask something else\n• Go back to the main menu\n• Exit"
      : "😔 I'm sorry I couldn't help fully.\n\nWould you like to:\n• Talk to a local admin/moderator 👤\n• Post your query in your block chat 📢\n• Try searching again 🔄";

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
        showOptions: true
      }
    ]);
    setAwaitingFeedback(false);
  };

  const processUserInput = (input: string): string => {
    const intent = detectIntent(input);
    const entities = extractEntities(input);

    if (intent) {
      return intent.response(entities);
    }

    return "❗ I'm not sure about that. Would you like to know about:\n\n• 🧵 Tailoring services\n• ⚡ Electricians\n• 🗑️ Garbage collection\n• 📅 Community events\n• 🚨 Emergency contacts\n\nOr would you like to talk to a local admin?";
  };

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    i18n.changeLanguage(langCode);
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: t('language_changed', { language: supportedLanguages.find(l => l.code === langCode)?.name }),
      sender: 'bot',
      timestamp: new Date()
    }]);
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
      timestamp: new Date(),
      requiresFeedback: true
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputValue('');
    setAwaitingFeedback(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <span className="sr-only">{t('open_chat')}</span>
          <span className="text-2xl">💬</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-gray-800 rounded-2xl shadow-xl w-96 max-w-full border border-gray-700">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">{t('bot_name')}</h3>
              <p className="text-sm text-gray-400">{t('bot_description')}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  className="text-gray-400 hover:text-white transition-colors p-2"
                  onClick={() => document.getElementById('language-selector')?.click()}
                >
                  <LanguageIcon className="h-5 w-5" />
                </button>
                <select
                  id="language-selector"
                  value={currentLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                >
                  {supportedLanguages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div
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
                {message.requiresFeedback && awaitingFeedback && (
                  <div className="flex justify-center space-x-4 mt-4">
                    <button
                      onClick={() => handleFeedback(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Yes, helpful 👍
                    </button>
                    <button
                      onClick={() => handleFeedback(false)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      No, not helpful 👎
                    </button>
                  </div>
                )}
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