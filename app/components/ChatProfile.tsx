'use client';

import { useState, useRef } from 'react';
import { ArrowLeft, Camera, Edit3, Save, X, Upload, User, Phone, Video, MessageCircle, Star, Archive, Trash2, Settings } from 'lucide-react';

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

interface ChatProfileProps {
  chat: Chat | undefined;
  onBack: () => void;
  onUpdate: (updates: Partial<Chat>) => void;
}

export default function ChatProfile({ chat, onBack, onUpdate }: ChatProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(chat?.name || '');
  const [profileImage, setProfileImage] = useState(chat?.avatar || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onUpdate({ name: editedName });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(chat?.name || '');
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulasi upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setProfileImage(result);
          onUpdate({ avatar: result });
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Chat tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="whatsapp-bg text-white p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold">Profile</h2>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Image */}
        <div className="flex flex-col items-center py-8 px-4">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-whatsapp-primary to-whatsapp-secondary rounded-full flex items-center justify-center mb-4 overflow-hidden shadow-whatsapp-lg">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
            </div>
            
            <button
              onClick={handleCameraClick}
              disabled={isUploading}
              className="absolute -bottom-2 -right-2 bg-whatsapp-accent text-white p-3 rounded-full hover:bg-whatsapp-accent/80 transition-colors disabled:opacity-50 shadow-whatsapp"
            >
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Camera className="w-5 h-5" />
              )}
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Name Section */}
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Nama</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Edit3 className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-accent"
                  placeholder="Masukkan nama"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-1 px-4 py-2 btn-primary text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Batal</span>
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-lg text-gray-700 bg-white p-3 rounded-lg shadow-whatsapp">{chat.name}</p>
            )}
          </div>
        </div>

        {/* Chat Info */}
        <div className="px-4 pb-8">
          <div className="bg-white rounded-lg p-4 space-y-4 shadow-whatsapp">
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Status</h4>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${chat.isOnline ? 'bg-whatsapp-accent' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-700">
                  {chat.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Pesan Terakhir</h4>
              <p className="text-sm text-gray-700">{chat.lastMessage}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Waktu</h4>
              <p className="text-sm text-gray-700">{chat.timestamp}</p>
            </div>

            {chat.unreadCount > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Pesan Belum Dibaca</h4>
                <span className="inline-flex items-center px-3 py-1 bg-whatsapp-accent/10 text-whatsapp-accent text-sm rounded-full">
                  {chat.unreadCount} pesan
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 pb-8">
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-lg transition-colors shadow-whatsapp">
              <div className="w-10 h-10 bg-whatsapp-primary/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-whatsapp-primary" />
              </div>
              <span className="text-gray-700">Panggilan Suara</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-lg transition-colors shadow-whatsapp">
              <div className="w-10 h-10 bg-whatsapp-secondary/10 rounded-full flex items-center justify-center">
                <Video className="w-5 h-5 text-whatsapp-secondary" />
              </div>
              <span className="text-gray-700">Panggilan Video</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-lg transition-colors shadow-whatsapp">
              <div className="w-10 h-10 bg-whatsapp-accent/10 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-whatsapp-accent" />
              </div>
              <span className="text-gray-700">Kirim Pesan</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-lg transition-colors shadow-whatsapp">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-gray-700">Pin Chat</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-lg transition-colors shadow-whatsapp">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Archive className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-gray-700">Arsipkan Chat</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-3 bg-white hover:bg-red-50 rounded-lg transition-colors shadow-whatsapp">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-red-600">Hapus Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
