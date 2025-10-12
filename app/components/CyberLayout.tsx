'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Settings, Search, Plus, MoreVertical, ArrowLeft, Camera, User, Phone, Video, Info, Archive, Star, Trash2, Zap, Brain, Sparkles, Menu, X } from 'lucide-react';
import CyberChatBot from './CyberChatBot';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
  isOnline: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
  lastSeen?: string;
  provider?: 'gemini' | 'claude';
}

export default function CyberLayout() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'ChatBotKyy',
      lastMessage: '🌟 Selamat datang! Saya ChatBotKyy, siap membantu Anda dengan teknologi terdepan.',
      timestamp: '12:30',
      unreadCount: 0,
      avatar: '',
      isOnline: true,
      isPinned: true,
      lastSeen: 'Baru saja',
      provider: 'gemini'
    },
    {
      id: '2',
      name: 'Claude Assistant',
      lastMessage: '🧠 Halo! Saya Claude AI, siap memberikan respons yang kreatif dan informatif.',
      timestamp: '11:45',
      unreadCount: 2,
      avatar: '',
      isOnline: true,
      isPinned: false,
      lastSeen: '5 menit yang lalu',
      provider: 'claude'
    },
    {
      id: '3',
      name: 'Gemini Pro',
      lastMessage: '⚡ Terima kasih sudah menggunakan layanan AI kami. Ada yang bisa saya bantu?',
      timestamp: '10:20',
      unreadCount: 0,
      avatar: '',
      isOnline: false,
      isPinned: false,
      lastSeen: '1 jam yang lalu',
      provider: 'gemini'
    },
    {
      id: '4',
      name: 'AI Support',
      lastMessage: '🚀 Bagaimana pengalaman Anda dengan AI assistant hari ini?',
      timestamp: '09:15',
      unreadCount: 1,
      avatar: '',
      isOnline: true,
      isPinned: false,
      lastSeen: 'Baru saja',
      provider: 'claude'
    }
  ]);

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    setShowProfile(false);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
    setShowProfile(false);
    if (window.innerWidth < 768) {
      setSidebarOpen(true);
    }
  };

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleUpdateChat = (chatId: string, updates: Partial<Chat>) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, ...updates } : chat
    ));
  };

  const handlePinChat = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
    ));
    toast.success('Chat berhasil di-pin!');
  };

  const handleArchiveChat = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, isArchived: !chat.isArchived } : chat
    ));
    toast.success('Chat berhasil diarsipkan!');
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (selectedChat === chatId) {
      setSelectedChat(null);
    }
    toast.success('Chat berhasil dihapus!');
  };

  // Filter chats based on search query
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort chats: pinned first, then by timestamp
  const sortedChats = [...filteredChats].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(`2024-01-01 ${b.timestamp}`).getTime() - new Date(`2024-01-01 ${a.timestamp}`).getTime();
  });

  const getProviderIcon = (provider?: 'gemini' | 'claude') => {
    switch (provider) {
      case 'gemini':
        return <Zap className="w-3 h-3 text-cyber-orange" />;
      case 'claude':
        return <Brain className="w-3 h-3 text-cyber-green" />;
      default:
        return <Sparkles className="w-3 h-3 text-cyber-neon" />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-cyber-dark-bg via-cyber-primary to-cyber-secondary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-neon/5 via-transparent to-cyber-purple/5"></div>
      
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 lg:w-1/4 flex-col cyber-card shadow-cyber-lg relative z-10`}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="cyber-bg p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-neon/10 via-transparent to-cyber-purple/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-r from-cyber-neon to-cyber-purple rounded-full flex items-center justify-center shadow-neon-lg"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h1 className="text-xl font-bold gradient-text">ChatBotKyy</h1>
                      <p className="text-sm text-cyber-neon/80">Advanced AI Assistant</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button 
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                    <motion.button 
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyber-dark-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari chat atau AI assistant..."
                    className="w-full pl-10 pr-4 py-3 cyber-input rounded-xl focus:outline-none focus:ring-2 focus:ring-cyber-neon/50 text-cyber-dark-text placeholder-cyber-dark-muted"
                  />
                </div>
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {sortedChats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleChatSelect(chat.id)}
                  className={`flex items-center p-4 hover:bg-cyber-neon/10 cursor-pointer border-b border-cyber-dark-border transition-all duration-200 ${
                    selectedChat === chat.id ? 'bg-cyber-neon/20 border-l-4 border-cyber-neon' : ''
                  } ${chat.isPinned ? 'bg-cyber-orange/10' : ''}`}
                >
                  <div className="relative">
                    {chat.avatar ? (
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full object-cover shadow-cyber-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-cyber-neon to-cyber-purple rounded-full flex items-center justify-center shadow-cyber-lg">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                    )}
                    {chat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyber-green border-2 border-cyber-dark-surface rounded-full animate-pulse"></div>
                    )}
                    {chat.isPinned && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-orange rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 ml-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-cyber-dark-text">{chat.name}</h3>
                        {chat.isPinned && <Star className="w-3 h-3 text-cyber-orange fill-current" />}
                        {getProviderIcon(chat.provider)}
                      </div>
                      <span className="text-xs text-cyber-dark-muted">{chat.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-cyber-dark-muted truncate">{chat.lastMessage}</p>
                      {chat.unreadCount > 0 && (
                        <span className="bg-cyber-neon text-cyber-dark-bg text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-semibold neon-glow">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-cyber-dark-border bg-cyber-dark-surface/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full flex items-center justify-center shadow-cyber-lg">
                  <span className="text-white font-semibold">U</span>
                </div>
                <div>
                  <p className="font-semibold text-cyber-dark-text">Rizki Ramadhan</p>
                  <p className="text-sm text-cyber-neon flex items-center">
                    <div className="w-2 h-2 bg-cyber-neon rounded-full mr-2 animate-pulse"></div>
                    Online
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col cyber-card shadow-cyber-lg relative z-10`}>
        {selectedChat && !showProfile && (
          <>
            {/* Chat Header */}
            <div className="cyber-bg text-white p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-neon/10 via-transparent to-cyber-purple/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={handleBackToChats}
                      className="md:hidden p-2 hover:bg-white/20 rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </motion.button>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-semibold">
                        {chats.find(chat => chat.id === selectedChat)?.name}
                      </h2>
                      <p className="text-sm text-white/80 flex items-center">
                        <div className="w-2 h-2 bg-cyber-neon rounded-full mr-2 animate-pulse"></div>
                        {chats.find(chat => chat.id === selectedChat)?.lastSeen || 'Online'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button 
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Video className="w-5 h-5" />
                    </motion.button>
                    <motion.button 
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={handleShowProfile}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Info className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Component */}
            <div className="flex-1">
              <CyberChatBot botName={chats.find(chat => chat.id === selectedChat)?.name || "ChatBotKyy"} />
            </div>
          </>
        )}

        {!selectedChat && (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-cyber-dark-bg via-cyber-primary to-cyber-secondary relative">
            <div className="text-center p-8 relative z-10">
              <motion.div 
                className="w-32 h-32 bg-gradient-to-r from-cyber-neon to-cyber-purple rounded-full flex items-center justify-center mx-auto mb-8 shadow-neon-lg"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Sparkles className="w-16 h-16 text-white" />
              </motion.div>
              
              <motion.h3 
                className="text-3xl font-bold text-cyber-dark-text mb-4 gradient-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                ChatBotKyy
              </motion.h3>
              
              <motion.p 
                className="text-cyber-dark-muted mb-8 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Pilih AI assistant untuk memulai percakapan yang canggih dan menarik
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="px-6 py-3 bg-cyber-neon/10 text-cyber-neon rounded-full text-sm font-medium neon-border">
                  🚀 AI Powered
                </span>
                <span className="px-6 py-3 bg-cyber-purple/10 text-cyber-purple rounded-full text-sm font-medium neon-border">
                  🧠 Smart Responses
                </span>
                <span className="px-6 py-3 bg-cyber-pink/10 text-cyber-pink rounded-full text-sm font-medium neon-border">
                  ⚡ Real-time
                </span>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      {!sidebarOpen && (
        <motion.button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-20 p-3 bg-cyber-dark-surface/80 backdrop-blur-xl border border-cyber-neon/30 rounded-full neon-border"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5 text-cyber-neon" />
        </motion.button>
      )}
    </div>
  );
}
