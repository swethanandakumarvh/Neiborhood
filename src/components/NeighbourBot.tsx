import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon, ChevronDownIcon, MicrophoneIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
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

type GarbageSchedule = {
  days: string[];
  time: string;
  lastPickup: string;
};

type GarbageData = {
  [key in "Block A" | "Block B" | "Block C"]: GarbageSchedule;
};

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
  } as GarbageData,
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
      
      // Check if the block is a valid key in the garbage data
      if (!(block in mockKnowledgeBase.garbage)) {
        return `❌ Sorry, I don't have garbage collection information for ${block}. Available blocks are: Block A, Block B, and Block C.`;
      }
      
      const schedule = mockKnowledgeBase.garbage[block as keyof GarbageData];
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
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
];

function NeighbourBot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: t('welcome_message'),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [awaitingFeedback, setAwaitingFeedback] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceAssistantEnabled, setVoiceAssistantEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

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

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = currentLanguage;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        handleSubmit(new Event('submit') as any);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.start();
    } else {
      console.error('Speech recognition not supported');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
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

    if (voiceAssistantEnabled) {
      speakMessage(botResponse.content);
    }
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
              <button
                onClick={() => setVoiceAssistantEnabled(!voiceAssistantEnabled)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                  voiceAssistantEnabled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={voiceAssistantEnabled ? "Disable voice assistant" : "Enable voice assistant"}
              >
                <MicrophoneIcon className="h-4 w-4" />
                <SpeakerWaveIcon className="h-4 w-4" />
              </button>

              <div className="relative">
                <button
                  className="flex items-center space-x-1 bg-gray-700 text-white px-3 py-1.5 rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                >
                  <span>{supportedLanguages.find(l => l.code === currentLanguage)?.flag}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg py-1 border border-gray-600">
                    {supportedLanguages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          handleLanguageChange(lang.code);
                          setIsLanguageMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 flex items-center space-x-3 hover:bg-gray-600 transition-colors ${
                          currentLanguage === lang.code ? 'bg-gray-600' : ''
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-white">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
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
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs opacity-70">
                        {format(message.timestamp, 'HH:mm')}
                      </p>
                      {message.sender === 'bot' && voiceAssistantEnabled && (
                        <button
                          onClick={() => isSpeaking ? stopSpeaking() : speakMessage(message.content)}
                          className="text-gray-300 hover:text-white transition-colors ml-2"
                        >
                          {isSpeaking ? (
                            <SpeakerXMarkIcon className="h-4 w-4" />
                          ) : (
                            <SpeakerWaveIcon className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {message.requiresFeedback && awaitingFeedback && (
                  <div className="flex justify-center space-x-4 mt-4">
                    <button
                      onClick={() => handleFeedback(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      {t('yes_helpful')}
                    </button>
                    <button
                      onClick={() => handleFeedback(false)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      {t('no_not_helpful')}
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              {voiceAssistantEnabled && (
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <MicrophoneIcon className={`h-5 w-5 ${isListening ? 'text-white animate-pulse' : 'text-gray-300'}`} />
                </button>
              )}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('type_message')}
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