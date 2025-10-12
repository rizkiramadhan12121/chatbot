import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '../../services/aiService';

export async function POST(request: NextRequest) {
  try {
    const { message, provider } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Set provider if specified
    if (provider && (provider === 'gemini' || provider === 'claude')) {
      aiService.setProvider(provider);
    }

    // Generate response
    const response = await aiService.generateResponse(message, []);

    return NextResponse.json({
      success: response.success,
      text: response.text,
      provider: response.provider,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: 'Terjadi kesalahan dalam memproses permintaan'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const availableProviders = aiService.getAvailableProviders();
  const currentProvider = aiService.getCurrentProvider();

  return NextResponse.json({
    providers: availableProviders,
    current: currentProvider,
    timestamp: new Date().toISOString()
  });
}
