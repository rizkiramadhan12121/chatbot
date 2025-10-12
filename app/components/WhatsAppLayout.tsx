'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Settings, Search, Plus, MoreVertical, ArrowLeft, Camera, User, Phone, Video, Info, Archive, Star, Trash2 } from 'lucide-react';
import ChatBot from './ChatBot';
import ChatProfile from './ChatProfile';

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
}

export default function WhatsAppLayout() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'AI Assistant KYY',
      lastMessage: 'Halo! Ada yang bisa saya bantu?',
      timestamp: '12:30',
      unreadCount: 0,
      avatar: '',
      isOnline: true,
      isPinned: true,
      lastSeen: 'Baru saja'
    },
    {
      id: '2',
      name: 'Gemini AI',
      lastMessage: 'Saya siap membantu Anda dengan pertanyaan apapun',
      timestamp: '11:45',
      unreadCount: 2,
      avatar: '',
      isOnline: true,
      isPinned: false,
      lastSeen: '5 menit yang lalu'
    },
    {
      id: '3',
      name: 'ChatBot Support',
      lastMessage: 'Terima kasih sudah menggunakan layanan kami',
      timestamp: '10:20',
      unreadCount: 0,
      avatar: '',
      isOnline: false,
      isPinned: false,
      lastSeen: '1 jam yang lalu'
    },
    {
      id: '4',
      name: 'Assistant Pro',
      lastMessage: 'Bagaimana kabar Anda hari ini?',
      timestamp: '09:15',
      unreadCount: 1,
      avatar: '',
      isOnline: true,
      isPinned: false,
      lastSeen: 'Baru saja'
    }
  ]);

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    setShowProfile(false);
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
    setShowProfile(false);
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
  };

  const handleArchiveChat = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, isArchived: !chat.isArchived } : chat
    ));
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (selectedChat === chatId) {
      setSelectedChat(null);
    }
  };

  // Sort chats: pinned first, then by timestamp
  const sortedChats = [...chats].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(`2024-01-01 ${b.timestamp}`).getTime() - new Date(`2024-01-01 ${a.timestamp}`).getTime();
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 lg:w-1/4 flex-col whatsapp-card shadow-whatsapp-lg`}>
        {/* Header */}
        <div className="whatsapp-bg p-4 text-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">ChatBot KYY</h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari atau mulai chat baru"
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {sortedChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat.id)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-all duration-200 ${
                selectedChat === chat.id ? 'bg-whatsapp-light border-l-4 border-whatsapp-accent' : ''
              } ${chat.isPinned ? 'bg-yellow-50' : ''}`}
            >
              <div className="relative">
                {chat.avatar ? (
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-r from-whatsapp-primary to-whatsapp-secondary rounded-full flex items-center justify-center shadow-md">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                )}
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-whatsapp-accent border-2 border-white rounded-full animate-pulse"></div>
                )}
                {chat.isPinned && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 ml-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                    {chat.isPinned && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                  </div>
                  <span className="text-xs text-gray-500">{chat.timestamp}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  {chat.unreadCount > 0 && (
                    <span className="bg-whatsapp-accent text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-semibold">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-whatsapp-accent to-whatsapp-secondary rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-semibold">U</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">User</p>
              <p className="text-sm text-whatsapp-accent flex items-center">
                <div className="w-2 h-2 bg-whatsapp-accent rounded-full mr-2 animate-pulse"></div>
                Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col whatsapp-card shadow-whatsapp-lg`}>
        {selectedChat && !showProfile && (
          <>
            {/* Chat Header */}
            <div className="whatsapp-bg text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleBackToChats}
                    className="md:hidden p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold">
                      {chats.find(chat => chat.id === selectedChat)?.name}
                    </h2>
                    <p className="text-sm text-white/80 flex items-center">
                      <div className="w-2 h-2 bg-whatsapp-accent rounded-full mr-2 animate-pulse"></div>
                      {chats.find(chat => chat.id === selectedChat)?.lastSeen || 'Online'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleShowProfile}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Component */}
            <div className="flex-1">
              <ChatBot botName={chats.find(chat => chat.id === selectedChat)?.name || "AI Assistant"} />
            </div>
          </>
        )}

        {showProfile && (
          <ChatProfile 
            chat={chats.find(chat => chat.id === selectedChat)}
            onBack={() => setShowProfile(false)}
            onUpdate={(updates) => selectedChat && handleUpdateChat(selectedChat, updates)}
          />
        )}

        {!selectedChat && (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center p-8">
              <div className="w-24 h-24 bg-gradient-to-r from-whatsapp-primary to-whatsapp-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-whatsapp-lg">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3 gradient-text">ChatBot KYY</h3>
              <p className="text-gray-500 mb-6 max-w-md">Pilih chat untuk memulai percakapan dengan AI Assistant yang canggih</p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-whatsapp-accent/10 text-whatsapp-accent rounded-full text-sm font-medium">AI Powered</span>
                <span className="px-4 py-2 bg-whatsapp-primary/10 text-whatsapp-primary rounded-full text-sm font-medium">24/7 Online</span>
                <span className="px-4 py-2 bg-whatsapp-secondary/10 text-whatsapp-secondary rounded-full text-sm font-medium">Smart Responses</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
