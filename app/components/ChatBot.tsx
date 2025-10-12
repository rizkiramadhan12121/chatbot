'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Settings, Bot, User, Edit3, Check, Smile, Paperclip, Mic, MoreVertical, Image as ImageIcon } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  image?: string;
  isTyping?: boolean;
}

interface ChatBotProps {
  botName?: string;
  initialMessages?: Message[];
}

export default function ChatBot({ botName = "AI Assistant", initialMessages = [] }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentBotName, setCurrentBotName] = useState(botName);
  const [tempBotName, setTempBotName] = useState(botName);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = [
    "Halo! Ada yang bisa saya bantu hari ini?",
    "Menarik! Ceritakan lebih lanjut tentang itu.",
    "Saya mengerti maksud Anda. Bagaimana perasaan Anda tentang hal itu?",
    "Itu adalah pertanyaan yang bagus! Mari kita bahas lebih detail.",
    "Saya di sini untuk membantu Anda. Ada hal lain yang ingin Anda tanyakan?",
    "Terima kasih sudah berbagi dengan saya. Saya menghargai kepercayaan Anda.",
    "Saya bisa membantu Anda dengan berbagai topik. Apa yang ingin Anda diskusikan?",
    "Menurut saya, itu adalah pendekatan yang baik. Apakah Anda sudah mencobanya?",
    "Saya senang bisa membantu Anda. Ada yang lain yang ingin Anda ketahui?",
    "Itu adalah ide yang kreatif! Bagaimana Anda memikirkan hal itu?"
  ];

  const getRandomResponse = () => {
    return botResponses[Math.floor(Math.random() * botResponses.length)];
  };

  const getAIResponse = async (userMessage: string) => {
    try {
      const response = await geminiService.generateContextualResponse(userMessage, messages);
      return response;
    } catch (error) {
      console.error('Error getting AI response:', error);
      return getRandomResponse();
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulasi delay untuk respons bot
    setTimeout(async () => {
      const botResponse = await getAIResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay 1-3 detik
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setInputText(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const imageMessage: Message = {
          id: Date.now().toString(),
          text: '',
          image: imageUrl,
          isBot: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, imageMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Simulasi recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessage: Message = {
          id: Date.now().toString(),
          text: '🎤 Pesan suara',
          isBot: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, voiceMessage]);
      }, 3000);
    }
  };

  const handleSaveBotName = () => {
    setCurrentBotName(tempBotName);
    setShowSettings(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-r from-whatsapp-primary to-whatsapp-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-whatsapp-lg">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Selamat datang!</h3>
            <p className="text-gray-500 mb-4">Mulai percakapan dengan {currentBotName}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-whatsapp-primary/10 text-whatsapp-primary rounded-full text-sm">AI Assistant</span>
              <span className="px-3 py-1 bg-whatsapp-accent/10 text-whatsapp-accent rounded-full text-sm">24/7 Online</span>
              <span className="px-3 py-1 bg-whatsapp-secondary/10 text-whatsapp-secondary rounded-full text-sm">Responsif</span>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} fade-in`}
          >
            <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                message.isBot 
                  ? 'bg-gradient-to-r from-whatsapp-primary to-whatsapp-secondary' 
                  : 'bg-gradient-to-r from-whatsapp-accent to-whatsapp-secondary'
              }`}>
                {message.isBot ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`px-4 py-3 rounded-2xl shadow-whatsapp message-bubble ${
                message.isBot
                  ? 'bg-white border border-gray-200'
                  : 'bg-gradient-to-r from-whatsapp-accent to-whatsapp-secondary text-white'
              }`}>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Uploaded"
                    className="w-48 h-32 object-cover rounded-lg mb-2"
                  />
                )}
                {message.text && <p className="text-sm">{message.text}</p>}
                <p className={`text-xs mt-1 ${
                  message.isBot ? 'text-gray-500' : 'text-white/80'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-whatsapp-primary to-whatsapp-secondary flex items-center justify-center shadow-md">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white shadow-whatsapp border border-gray-200 px-4 py-3 rounded-2xl">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-whatsapp-lg">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="emoji-picker bg-white border border-gray-200 rounded-lg p-4 shadow-whatsapp-lg">
            <div className="grid grid-cols-8 gap-2">
              {['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3">
          {/* Attachment Button */}
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="p-3 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </label>
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan Anda..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-whatsapp-accent resize-none shadow-sm"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Smile className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Voice/Record Button */}
          <button
            onClick={handleVoiceRecord}
            className={`p-3 rounded-full transition-all duration-200 ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="p-3 btn-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-whatsapp"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
