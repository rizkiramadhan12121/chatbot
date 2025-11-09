# ChatBotKyy

Aplikasi chatbot sederhana dengan desain modern dan integrasi AI.

## Fitur Utama

kyy

- Chat dengan AI (Gemini & Claude)
- Desain modern dengan tema gelap
- Upload gambar
- Emoji picker
- Edit dan hapus pesan
- Responsif untuk mobile dan desktop

## Cara Install

1. Clone repository:
```bash
git clone <repository-url>
cd chatbotkyy
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp env.example .env.local
```

Edit `.env.local` dan tambahkan API keys:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_CLAUDE_API_KEY=your_claude_api_key_here
```

4. Jalankan aplikasi:
```bash
npm run dev
```

5. Buka http://localhost:3000 di browser

## Setup API Keys

### Google Gemini AI
1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Buat API key baru
3. Tambahkan ke `.env.local`:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### Claude AI
1. Kunjungi [Anthropic Console](https://console.anthropic.com/)
2. Buat API key baru
3. Tambahkan ke `.env.local`:
```env
NEXT_PUBLIC_CLAUDE_API_KEY=your_claude_api_key_here
```

**Note**: Tanpa API key, aplikasi tetap bisa berjalan dengan respons default.
