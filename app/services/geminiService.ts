import { GoogleGenerativeAI } from '@google/generative-ai';

// Inisialisasi Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export class GeminiService {
  private model: any;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      // Jika tidak ada API key, return response default
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        console.warn('Gemini API key tidak ditemukan, menggunakan response default');
        return this.getDefaultResponse();
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      if (!text || text.trim().length === 0) {
        return this.getDefaultResponse();
      }
      
      return text;
    } catch (error) {
      console.error('Error generating Gemini response:', error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return "Maaf, terjadi masalah dengan konfigurasi API. Silakan coba lagi nanti.";
        }
        if (error.message.includes('quota')) {
          return "Maaf, kuota API telah habis. Silakan coba lagi nanti.";
        }
        if (error.message.includes('network')) {
          return "Maaf, terjadi masalah koneksi. Silakan periksa internet Anda.";
        }
      }
      
      return this.getDefaultResponse();
    }
  }

  private getDefaultResponse(): string {
    const defaultResponses = [
      "Halo! Saya adalah AI Assistant yang siap membantu Anda. Ada yang bisa saya bantu?",
      "Terima kasih sudah menghubungi saya! Saya di sini untuk membantu dengan pertanyaan Anda.",
      "Menarik! Ceritakan lebih lanjut tentang apa yang Anda butuhkan.",
      "Saya mengerti maksud Anda. Bagaimana saya bisa membantu lebih lanjut?",
      "Itu adalah pertanyaan yang bagus! Mari kita bahas lebih detail.",
      "Saya senang bisa membantu Anda hari ini. Ada hal lain yang ingin Anda tanyakan?",
      "Terima kasih sudah berbagi dengan saya. Saya menghargai kepercayaan Anda.",
      "Saya bisa membantu Anda dengan berbagai topik. Apa yang ingin Anda diskusikan?",
      "Menurut saya, itu adalah pendekatan yang baik. Apakah Anda sudah mencobanya?",
      "Saya di sini untuk membantu Anda. Jangan ragu untuk bertanya apapun!"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  async generateContextualResponse(userMessage: string, chatHistory: any[]): Promise<string> {
    try {
      // Jika tidak ada API key, return response default
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        console.warn('Gemini API key tidak ditemukan, menggunakan response default');
        return this.getContextualDefaultResponse(userMessage);
      }

      // Buat context dari chat history
      const context = chatHistory.slice(-5).map(msg => 
        `${msg.isBot ? 'Assistant' : 'User'}: ${msg.text}`
      ).join('\n');

      const prompt = `Anda adalah AI Assistant yang ramah dan membantu. Berikan respons yang relevan dan bermanfaat.

Context percakapan sebelumnya:
${context}

Pesan user terbaru: ${userMessage}

Berikan respons yang:
1. Relevan dengan konteks percakapan
2. Ramah dan membantu
3. Tidak terlalu panjang (maksimal 2-3 kalimat)
4. Dalam bahasa Indonesia

Respons:`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      if (!text || text.trim().length === 0) {
        return this.getContextualDefaultResponse(userMessage);
      }
      
      return text;
    } catch (error) {
      console.error('Error generating contextual response:', error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return "Maaf, terjadi masalah dengan konfigurasi API. Silakan coba lagi nanti.";
        }
        if (error.message.includes('quota')) {
          return "Maaf, kuota API telah habis. Silakan coba lagi nanti.";
        }
        if (error.message.includes('network')) {
          return "Maaf, terjadi masalah koneksi. Silakan periksa internet Anda.";
        }
      }
      
      return this.getContextualDefaultResponse(userMessage);
    }
  }

  private getContextualDefaultResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hi')) {
      return "Halo! Senang bertemu dengan Anda. Ada yang bisa saya bantu hari ini?";
    }
    
    if (lowerMessage.includes('terima kasih') || lowerMessage.includes('thanks')) {
      return "Sama-sama! Saya senang bisa membantu Anda. Ada hal lain yang ingin Anda tanyakan?";
    }
    
    if (lowerMessage.includes('bagaimana') || lowerMessage.includes('cara')) {
      return "Saya bisa membantu menjelaskan langkah-langkahnya. Bisa Anda berikan lebih detail tentang apa yang ingin Anda ketahui?";
    }
    
    if (lowerMessage.includes('apa') || lowerMessage.includes('what')) {
      return "Itu pertanyaan yang menarik! Saya akan berusaha memberikan penjelasan yang bermanfaat untuk Anda.";
    }
    
    if (lowerMessage.includes('kenapa') || lowerMessage.includes('mengapa') || lowerMessage.includes('why')) {
      return "Pertanyaan yang bagus! Mari kita bahas alasan di balik hal tersebut.";
    }
    
    return "Terima kasih sudah berbagi dengan saya. Saya menghargai kepercayaan Anda dan siap membantu lebih lanjut!";
  }
}

export const geminiService = new GeminiService();

