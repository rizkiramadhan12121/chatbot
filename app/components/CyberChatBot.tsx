'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Smile, Paperclip, Mic, MoreVertical, Image as ImageIcon, Zap, Brain, Sparkles, Edit3, Trash2, Copy, Check, RotateCcw } from 'lucide-react';
import { aiService, AIMessage, AIProvider } from '../services/aiService';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface CyberChatBotProps {
  botName?: string;
  initialMessages?: AIMessage[];
}

export default function CyberChatBot({ botName = "ChatBotKyy", initialMessages = [] }: CyberChatBotProps) {
  const [messages, setMessages] = useState<AIMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<AIProvider>('gemini');
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Set default provider based on available APIs
    const availableProviders = aiService.getAvailableProviders();
    if (availableProviders.length > 0) {
      setCurrentProvider(availableProviders[0]);
      aiService.setProvider(availableProviders[0]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
      provider: currentProvider
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      const response = await aiService.generateResponse(currentInput, messages);
      
      const botMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        provider: response.provider
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      if (!response.success) {
        toast.error('Terjadi kesalahan dalam mendapatkan respons AI');
      } else {
        toast.success('Respons AI berhasil diterima!');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Terjadi kesalahan dalam mengirim pesan');
      
      // Fallback response
      const fallbackMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        text: "Maaf, terjadi kesalahan teknis. Silakan coba lagi atau gunakan AI provider lain.",
        isBot: true,
        timestamp: new Date(),
        provider: currentProvider
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
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
        const imageMessage: AIMessage = {
          id: Date.now().toString(),
          text: '',
          image: imageUrl,
          isBot: false,
          timestamp: new Date(),
          provider: currentProvider
        };
        setMessages(prev => [...prev, imageMessage]);
        toast.success('Gambar berhasil diunggah!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessage: AIMessage = {
          id: Date.now().toString(),
          text: '🎤 Pesan suara',
          isBot: false,
          timestamp: new Date(),
          provider: currentProvider
        };
        setMessages(prev => [...prev, voiceMessage]);
        toast.success('Pesan suara direkam!');
      }, 3000);
    }
  };

  const switchProvider = (provider: AIProvider) => {
    if (aiService.isProviderAvailable(provider)) {
      setCurrentProvider(provider);
      aiService.setProvider(provider);
      toast.success(`Beralih ke ${provider === 'gemini' ? 'Gemini AI' : 'Claude AI'}`);
    } else {
      toast.error(`API ${provider === 'gemini' ? 'Gemini' : 'Claude'} tidak tersedia`);
    }
  };

  const handleEditMessage = (messageId: string, currentText: string) => {
    setEditingMessageId(messageId);
    setEditingText(currentText);
  };

  const handleSaveEdit = () => {
    if (editingMessageId && editingText.trim()) {
      setMessages(prev => prev.map(msg => 
        msg.id === editingMessageId 
          ? { ...msg, text: editingText.trim() }
          : msg
      ));
      setEditingMessageId(null);
      setEditingText('');
      toast.success('Pesan berhasil diedit!');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingText('');
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    toast.success('Pesan berhasil dihapus!');
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Pesan berhasil disalin!');
  };

  const handleRegenerateResponse = async (messageId: string) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return;

    const previousMessages = messages.slice(0, messageIndex);
    const lastUserMessage = previousMessages.filter(msg => !msg.isBot).pop();
    
    if (!lastUserMessage) return;

    setIsTyping(true);
    try {
      const response = await aiService.generateResponse(lastUserMessage.text, previousMessages);
      
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, text: response.text, provider: response.provider }
          : msg
      ));
      
      toast.success('Respons berhasil diperbarui!');
    } catch (error) {
      toast.error('Gagal memperbarui respons');
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    if (messages.length > 0) {
      setMessages([]);
      toast.success('Chat berhasil dihapus!');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getProviderIcon = (provider?: AIProvider) => {
    switch (provider) {
      case 'gemini':
        return <Zap className="w-3 h-3" />;
      case 'claude':
        return <Brain className="w-3 h-3" />;
      default:
        return <Sparkles className="w-3 h-3" />;
    }
  };

  const getProviderColor = (provider?: AIProvider) => {
    switch (provider) {
      case 'gemini':
        return 'text-cyber-orange';
      case 'claude':
        return 'text-cyber-green';
      default:
        return 'text-cyber-neon';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-cyber-dark-bg via-cyber-primary to-cyber-secondary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-neon/5 via-transparent to-cyber-purple/5"></div>
      
      {/* AI Provider Switcher & Controls */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex space-x-2">
          {aiService.getAvailableProviders().map((provider) => (
            <motion.button
              key={provider}
              onClick={() => switchProvider(provider)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentProvider === provider
                  ? 'bg-cyber-neon/20 border border-cyber-neon/50 neon-glow'
                  : 'bg-cyber-dark-surface/50 border border-cyber-dark-border hover:border-cyber-neon/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={`Switch to ${provider === 'gemini' ? 'Gemini AI' : 'Claude AI'}`}
            >
              {getProviderIcon(provider)}
            </motion.button>
          ))}
          
          {messages.length > 0 && (
            <motion.button
              onClick={handleClearChat}
              className="p-2 rounded-lg bg-cyber-red/20 border border-cyber-red/30 hover:border-cyber-red/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Clear chat"
            >
              <RotateCcw className="w-4 h-4 text-cyber-red" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {messages.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-cyber-neon to-cyber-purple rounded-full flex items-center justify-center mx-auto mb-8 shadow-neon-lg float">
              <Bot className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-cyber-dark-text mb-4 gradient-text">
              Selamat datang di CyberMind AI!
            </h3>
            <p className="text-cyber-dark-muted mb-8 max-w-md mx-auto">
              AI Assistant canggih yang siap membantu Anda dengan teknologi terdepan. 
              Pilih antara Gemini atau Claude AI untuk pengalaman yang optimal.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-cyber-neon/10 text-cyber-neon rounded-full text-sm font-medium neon-border">
                🚀 AI Powered
              </span>
              <span className="px-4 py-2 bg-cyber-purple/10 text-cyber-purple rounded-full text-sm font-medium neon-border">
                🧠 Smart Responses
              </span>
              <span className="px-4 py-2 bg-cyber-pink/10 text-cyber-pink rounded-full text-sm font-medium neon-border">
                ⚡ Real-time
              </span>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} fade-in group`}
              onMouseEnter={() => setHoveredMessageId(message.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                <motion.div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-cyber-lg ${
                    message.isBot 
                      ? 'bg-gradient-to-r from-cyber-neon to-cyber-purple' 
                      : 'bg-gradient-to-r from-cyber-purple to-cyber-pink'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {message.isBot ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </motion.div>
                
                <div className={`px-4 py-3 rounded-2xl shadow-cyber-lg message-bubble relative ${
                  message.isBot
                    ? 'bg-cyber-dark-surface/80 border border-cyber-neon/20'
                    : 'bg-gradient-to-r from-cyber-neon to-cyber-purple text-white'
                }`}>
                  {/* Message Actions */}
                  {hoveredMessageId === message.id && (
                    <motion.div 
                      className="absolute -top-8 right-0 flex space-x-1 bg-cyber-dark-surface/90 backdrop-blur-sm rounded-lg p-1 border border-cyber-neon/30"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <motion.button
                        onClick={() => handleCopyMessage(message.text)}
                        className="p-1 hover:bg-cyber-neon/20 rounded transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Salin pesan"
                      >
                        <Copy className="w-3 h-3 text-cyber-neon" />
                      </motion.button>
                      
                      {!message.isBot && (
                        <motion.button
                          onClick={() => handleEditMessage(message.id, message.text)}
                          className="p-1 hover:bg-cyber-neon/20 rounded transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Edit pesan"
                        >
                          <Edit3 className="w-3 h-3 text-cyber-neon" />
                        </motion.button>
                      )}
                      
                      {message.isBot && (
                        <motion.button
                          onClick={() => handleRegenerateResponse(message.id)}
                          className="p-1 hover:bg-cyber-neon/20 rounded transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Regenerate respons"
                        >
                          <Sparkles className="w-3 h-3 text-cyber-neon" />
                        </motion.button>
                      )}
                      
                      <motion.button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="p-1 hover:bg-cyber-red/20 rounded transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Hapus pesan"
                      >
                        <Trash2 className="w-3 h-3 text-cyber-red" />
                      </motion.button>
                    </motion.div>
                  )}

                  {message.image && (
                    <img
                      src={message.image}
                      alt="Uploaded"
                      className="w-48 h-32 object-cover rounded-lg mb-2"
                    />
                  )}
                  
                  {editingMessageId === message.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full px-3 py-2 cyber-input rounded-lg resize-none text-sm"
                        rows={3}
                        autoFocus
                      />
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={handleSaveEdit}
                          className="px-3 py-1 bg-cyber-neon text-cyber-dark-bg rounded text-xs font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Check className="w-3 h-3 inline mr-1" />
                          Simpan
                        </motion.button>
                        <motion.button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 bg-cyber-dark-muted text-cyber-dark-text rounded text-xs font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Batal
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    message.text && (
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    )
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <p className={`text-xs ${
                      message.isBot ? 'text-cyber-dark-muted' : 'text-white/80'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                    {message.provider && (
                      <div className={`flex items-center space-x-1 ${getProviderColor(message.provider)}`}>
                        {getProviderIcon(message.provider)}
                        <span className="text-xs font-medium">
                          {message.provider === 'gemini' ? 'Gemini' : 'Claude'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyber-neon to-cyber-purple flex items-center justify-center shadow-cyber-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-cyber-dark-surface/80 border border-cyber-neon/20 px-4 py-3 rounded-2xl shadow-cyber-lg">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-cyber-dark-surface/80 backdrop-blur-xl border-t border-cyber-neon/20 p-4 shadow-cyber-lg relative z-10">
        {/* Emoji Picker */}
        <AnimatePresence>
          {showEmojiPicker && (
            <motion.div 
              className="emoji-picker"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-8 gap-2 p-4">
                {['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏'].map((emoji) => (
                  <motion.button
                    key={emoji}
                    onClick={() => handleEmojiClick(emoji)}
                    className="p-2 hover:bg-cyber-neon/20 rounded-lg text-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
            <motion.label
              htmlFor="image-upload"
              className="p-3 hover:bg-cyber-neon/20 rounded-full transition-colors cursor-pointer neon-border"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Paperclip className="w-5 h-5 text-cyber-neon" />
            </motion.label>
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan Anda..."
              className="w-full px-4 py-3 pr-12 cyber-input rounded-2xl resize-none shadow-cyber"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <motion.button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-cyber-neon/20 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Smile className="w-5 h-5 text-cyber-neon" />
            </motion.button>
          </div>

          {/* Voice/Record Button */}
          <motion.button
            onClick={handleVoiceRecord}
            className={`p-3 rounded-full transition-all duration-200 ${
              isRecording 
                ? 'bg-cyber-red text-white animate-pulse neon-glow' 
                : 'hover:bg-cyber-neon/20 text-cyber-neon neon-border'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic className="w-5 h-5" />
          </motion.button>

          {/* Send Button */}
          <motion.button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="p-3 btn-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-neon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
