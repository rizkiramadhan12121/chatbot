export default function ApiPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          API Documentation
        </p>
      </div>

      <div className="relative flex place-items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">API Documentation</h1>
          <div className="max-w-4xl mx-auto space-y-8 text-left">
            <section>
              <h2 className="text-2xl font-semibold mb-4">🔌 API Endpoints</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">POST /api/chat</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Mengirim pesan ke AI dan mendapatkan respons</p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                    <pre>{`{
  "message": "Hello, how are you?",
  "provider": "gemini" // atau "claude"
}`}</pre>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">GET /api/providers</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Mendapatkan daftar AI providers yang tersedia</p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                    <pre>{`{
  "providers": ["gemini", "claude"],
  "current": "gemini"
}`}</pre>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">🔑 Authentication</h2>
              <div className="p-4 border rounded-lg">
                <p className="text-sm mb-2">API menggunakan environment variables untuk authentication:</p>
                <ul className="text-sm space-y-1">
                  <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">NEXT_PUBLIC_GEMINI_API_KEY</code></li>
                  <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">NEXT_PUBLIC_CLAUDE_API_KEY</code></li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">📝 Response Format</h2>
              <div className="p-4 border rounded-lg">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                  <pre>{`{
  "success": true,
  "text": "Hello! I'm ChatBotKyy, how can I help you?",
  "provider": "gemini",
  "timestamp": "2024-01-01T00:00:00.000Z"
}`}</pre>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">⚡ Rate Limits</h2>
              <div className="p-4 border rounded-lg">
                <p className="text-sm">Rate limits mengikuti kebijakan dari masing-masing AI provider:</p>
                <ul className="text-sm space-y-1 mt-2">
                  <li>• <strong>Gemini AI:</strong> Sesuai dengan quota Google AI Studio</li>
                  <li>• <strong>Claude AI:</strong> Sesuai dengan quota Anthropic Console</li>
                </ul>
              </div>
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
          href="/docs"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Dokumentasi lengkap.
          </p>
        </a>
      </div>
    </main>
  );
}
