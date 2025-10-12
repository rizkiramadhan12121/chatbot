'use client';

import React from 'react';
import { Bot, MessageCircle } from 'lucide-react';

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Loading({ message = 'Memuat...', size = 'md' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-whatsapp-primary to-whatsapp-secondary rounded-full flex items-center justify-center mb-4 animate-pulse`}>
        <MessageCircle className={`${iconSizes[size]} text-white`} />
      </div>
      
      <div className="loading-dots mb-2">
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}

export function ChatLoading() {
  return (
    <div className="flex justify-start p-4">
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
  );
}

export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-whatsapp-primary to-whatsapp-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-whatsapp-lg animate-pulse">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-700 mb-2">ChatBot KYY</h3>
        
        <div className="loading-dots mb-4">
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <p className="text-gray-500">Memuat aplikasi...</p>
      </div>
    </div>
  );
}
