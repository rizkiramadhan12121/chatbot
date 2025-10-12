export default function DocsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Dokumentasi ChatBotKyy
        </p>
      </div>

      <div className="relative flex place-items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Dokumentasi</h1>
          <div className="max-w-4xl mx-auto space-y-8 text-left">
            <section>
              <h2 className="text-2xl font-semibold mb-4">🚀 Quick Start</h2>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">
{`# Clone repository
git clone https://github.com/rizkiramadhan12121/chatbot.git
cd chatbot

# Install dependencies
npm install

# Setup environment
cp env.example .env.local

# Run development server
npm run dev`}
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">🔧 Setup API Keys</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Google Gemini AI</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Kunjungi <a href="https://makersuite.google.com/app/apikey" className="text-blue-500 hover:underline">Google AI Studio</a></li>
                    <li>Buat API key baru</li>
                    <li>Tambahkan ke `.env.local`: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">NEXT_PUBLIC_GEMINI_API_KEY=your_key</code></li>
                  </ol>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Claude AI</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Kunjungi <a href="https://console.anthropic.com/" className="text-blue-500 hover:underline">Anthropic Console</a></li>
                    <li>Buat API key baru</li>
                    <li>Tambahkan ke `.env.local`: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">NEXT_PUBLIC_CLAUDE_API_KEY=your_key</code></li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">📁 Struktur Project</h2>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">
{`chatbotkyy/
├── app/
│   ├── components/
│   │   ├── CyberChatBot.tsx
│   │   ├── CyberLayout.tsx
│   │   └── ...
│   ├── services/
│   │   └── aiService.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── tailwind.config.js
└── package.json`}
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">🎨 Fitur Utama</h2>
              <ul className="space-y-2 text-sm">
                <li>• Chat dengan AI (Gemini & Claude)</li>
                <li>• Desain modern dengan tema gelap</li>
                <li>• Upload gambar</li>
                <li>• Emoji picker</li>
                <li>• Edit dan hapus pesan</li>
                <li>• Responsif untuk mobile dan desktop</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <a
          href="/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Home{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Kembali ke halaman utama.
          </p>
        </a>

        <a
          href="/chat"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Chat{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Mulai chat dengan AI assistant.
          </p>
        </a>

        <a
          href="/about"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            About{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Pelajari lebih lanjut tentang ChatBotKyy.
          </p>
        </a>
      </div>
    </main>
  );
}
