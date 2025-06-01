import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      bot_name: 'NeighbourBot',
      bot_description: 'Your community assistant',
      open_chat: 'Open chat',
      welcome_message: "👋 Hi! I'm NeighbourBot, your community assistant. How can I help you today?\n\nYou can ask me about:\n• 🧵 Tailoring services\n• ⚡ Electricians\n• 🗑️ Garbage collection\n• 📅 Community events\n• 🚨 Emergency contacts",
      language_changed: "Language changed to {{language}}",
      type_message: "Type your message...",
      yes_helpful: "Yes, helpful 👍",
      no_not_helpful: "No, not helpful 👎"
    }
  },
  hi: {
    translation: {
      bot_name: 'नेबरबॉट',
      bot_description: 'आपका सामुदायिक सहायक',
      open_chat: 'चैट खोलें',
      welcome_message: "👋 नमस्ते! मैं नेबरबॉट हूं, आपका सामुदायिक सहायक। मैं आपकी कैसे मदद कर सकता हूं?\n\nआप इनके बारे में पूछ सकते हैं:\n• 🧵 दर्जी सेवाएं\n• ⚡ इलेक्ट्रीशियन\n• 🗑️ कचरा संग्रह\n• 📅 सामुदायिक कार्यक्रम\n• 🚨 आपातकालीन संपर्क",
      language_changed: "भाषा बदलकर {{language}} कर दी गई है",
      type_message: "अपना संदेश लिखें...",
      yes_helpful: "हां, सहायक 👍",
      no_not_helpful: "नहीं, सहायक नहीं 👎"
    }
  },
  ta: {
    translation: {
      bot_name: 'நேபர்போட்',
      bot_description: 'உங்கள் சமூக உதவியாளர்',
      open_chat: 'அரட்டையைத் திற',
      welcome_message: "👋 வணக்கம்! நான் நேபர்போட், உங்கள் சமூக உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?\n\nநீங்கள் இவற்றைப் பற்றி கேட்கலாம்:\n• 🧵 தையல் சேவைகள்\n• ⚡ மின்சாரி\n• 🗑️ குப்பை சேகரிப்பு\n• 📅 சமூக நிகழ்வுகள்\n• 🚨 அவசர தொடர்புகள்",
      language_changed: "மொழி {{language}} ஆக மாற்றப்பட்டது",
      type_message: "உங்கள் செய்தியை தட்டச்சு செய்யவும்...",
      yes_helpful: "ஆம், உதவியாக இருந்தது 👍",
      no_not_helpful: "இல்லை, உதவியாக இல்லை 👎"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;