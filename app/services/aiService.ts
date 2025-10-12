import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';

export type AIProvider = 'gemini' | 'claude';

export interface AIMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  image?: string;
  provider?: AIProvider;
}

export interface AIResponse {
  text: string;
  provider: AIProvider;
  success: boolean;
  error?: string;
}

class AIService {
  private geminiAI: GoogleGenerativeAI | null = null;
  private claudeAI: Anthropic | null = null;
  private currentProvider: AIProvider = 'gemini';

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize Gemini
    if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      this.geminiAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    }

    // Initialize Claude
    if (process.env.NEXT_PUBLIC_CLAUDE_API_KEY) {
    this.claudeAI = new Anthropic({
      apiKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    }
  }

  setProvider(provider: AIProvider) {
    this.currentProvider = provider;
  }

  getCurrentProvider(): AIProvider {
    return this.currentProvider;
  }

  async generateResponse(prompt: string, chatHistory: AIMessage[] = []): Promise<AIResponse> {
    try {
      switch (this.currentProvider) {
        case 'gemini':
          return await this.generateGeminiResponse(prompt, chatHistory);
        case 'claude':
          return await this.generateClaudeResponse(prompt, chatHistory);
        default:
          return this.getDefaultResponse();
      }
    } catch (error) {
      console.error(`Error generating ${this.currentProvider} response:`, error);
      return this.getErrorResponse(error as Error);
    }
  }

  private async generateGeminiResponse(prompt: string, chatHistory: AIMessage[]): Promise<AIResponse> {
    if (!this.geminiAI) {
      return this.getDefaultResponse();
    }

    try {
      const model = this.geminiAI.getGenerativeModel({ model: 'gemini-pro' });
      
      // Build context from chat history
      const context = chatHistory.slice(-5).map(msg => 
        `${msg.isBot ? 'Assistant' : 'User'}: ${msg.text}`
      ).join('\n');

      const fullPrompt = `Anda adalah ChatBotKyy - AI Assistant yang sangat canggih, kreatif, dan menarik. 

Karakteristik Anda:
- Sangat kreatif dan imajinatif dalam memberikan jawaban
- Menggunakan bahasa Indonesia yang natural, ramah, dan mudah dipahami
- Memberikan jawaban yang informatif namun tidak membosankan
- Suka menggunakan analogi, contoh, dan metafora yang relevan
- Selalu positif, membantu, dan memberikan solusi yang praktis
- Respons maksimal 2-3 kalimat yang padat dan bermakna
- Sesekali menggunakan emoji yang sesuai untuk membuat jawaban lebih hidup

${context ? `Konteks percakapan sebelumnya:\n${context}\n\n` : ''}Pertanyaan user: ${prompt}

Berikan respons yang kreatif, menarik, dan sangat membantu:`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      return {
        text: text || this.getDefaultResponse().text,
        provider: 'gemini',
        success: true
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      return this.getErrorResponse(error as Error);
    }
  }

  private async generateClaudeResponse(prompt: string, chatHistory: AIMessage[]): Promise<AIResponse> {
    if (!this.claudeAI) {
      return this.getDefaultResponse();
    }

    try {
      // Build conversation history for Claude
      const messages = chatHistory.slice(-5).map(msg => ({
        role: msg.isBot ? 'assistant' as const : 'user' as const,
        content: msg.text
      }));

      // Add current user message
      messages.push({
        role: 'user',
        content: prompt
      });

      const response = await this.claudeAI.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 500,
        messages: messages,
        system: `Anda adalah ChatBotKyy - AI Assistant yang sangat canggih, kreatif, dan menarik.

Karakteristik Anda:
- Sangat kreatif dan imajinatif dalam memberikan jawaban
- Menggunakan bahasa Indonesia yang natural, ramah, dan mudah dipahami
- Memberikan jawaban yang informatif namun tidak membosankan
- Suka menggunakan analogi, contoh, dan metafora yang relevan
- Selalu positif, membantu, dan memberikan solusi yang praktis
- Respons maksimal 2-3 kalimat yang padat dan bermakna
- Sesekali menggunakan emoji yang sesuai untuk membuat jawaban lebih hidup
- Menyesuaikan gaya komunikasi dengan konteks percakapan

Berikan respons yang kreatif, menarik, dan sangat membantu!`
      });

      const text = response.content[0].type === 'text' ? response.content[0].text : '';

      return {
        text: text || this.getDefaultResponse().text,
        provider: 'claude',
        success: true
      };
    } catch (error) {
      console.error('Claude API error:', error);
      return this.getErrorResponse(error as Error);
    }
  }

  private getDefaultResponse(): AIResponse {
    const creativeResponses = [
      "🌟 Halo! Saya ChatBotKyy, siap membantu Anda dengan teknologi terdepan. Ada yang bisa saya bantu hari ini?",
      "✨ Selamat datang di dunia AI! Saya di sini untuk memberikan jawaban yang kreatif dan informatif. Mari mulai percakapan yang menarik!",
      "🚀 Wow, senang bertemu dengan Anda! Sebagai AI assistant yang canggih, saya siap menjawab pertanyaan apapun dengan pendekatan yang kreatif.",
      "💡 Halo! ChatBotKyy di sini untuk membantu Anda. Saya suka berpikir di luar kotak dan memberikan solusi yang praktis dan menarik.",
      "🎯 Selamat datang! Saya AI assistant yang sangat kreatif dan informatif. Mari kita eksplorasi berbagai topik menarik bersama!",
      "🌈 Halo! Saya ChatBotKyy yang siap membantu Anda dengan jawaban yang kreatif dan bermanfaat. Ada yang ingin Anda tanyakan?",
      "🔥 Selamat datang di ChatBotKyy! Saya di sini untuk memberikan respons yang menarik dan informatif. Mari mulai percakapan yang seru!",
      "⭐ Halo! Sebagai AI assistant yang canggih, saya siap membantu Anda dengan berbagai pertanyaan. Mari kita mulai petualangan pengetahuan!",
      "🎨 Selamat datang! Saya ChatBotKyy yang suka memberikan jawaban kreatif dan praktis. Ada topik menarik yang ingin kita bahas?",
      "🌟 Halo! Saya AI assistant yang sangat kreatif dan informatif. Mari kita mulai percakapan yang penuh dengan ide-ide menarik!"
    ];

    return {
      text: creativeResponses[Math.floor(Math.random() * creativeResponses.length)],
      provider: this.currentProvider,
      success: true
    };
  }

  private getErrorResponse(error: Error): AIResponse {
    let errorMessage = "Maaf, terjadi kesalahan teknis. ChatBotKyy sedang mengalami gangguan kecil. Silakan coba lagi!";

    if (error.message.includes('API key')) {
      errorMessage = "🔑 Oops! Sepertinya ada masalah dengan kunci API. ChatBotKyy butuh akses yang tepat untuk membantu Anda!";
    } else if (error.message.includes('quota')) {
      errorMessage = "📊 Maaf, kuota API telah habis. ChatBotKyy perlu istirahat sejenak. Silakan coba lagi nanti!";
    } else if (error.message.includes('network')) {
      errorMessage = "🌐 Ups! Ada masalah koneksi. ChatBotKyy tidak bisa terhubung ke server. Periksa internet Anda!";
    }

    return {
      text: errorMessage,
      provider: this.currentProvider,
      success: false,
      error: error.message
    };
  }

  // Check if providers are available
  isProviderAvailable(provider: AIProvider): boolean {
    switch (provider) {
      case 'gemini':
        return !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      case 'claude':
        return !!process.env.NEXT_PUBLIC_CLAUDE_API_KEY;
      default:
        return false;
    }
  }

  getAvailableProviders(): AIProvider[] {
    const providers: AIProvider[] = [];
    if (this.isProviderAvailable('gemini')) providers.push('gemini');
    if (this.isProviderAvailable('claude')) providers.push('claude');
    return providers;
  }
}

export const aiService = new AIService();
