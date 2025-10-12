export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          About ChatBotKyy
        </p>
      </div>

      <div className="relative flex place-items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Tentang ChatBotKyy</h1>
          <div className="max-w-3xl mx-auto space-y-6 text-lg">
            <p>
              ChatBotKyy adalah aplikasi chatbot canggih dengan desain modern dan integrasi AI. 
              Dibangun menggunakan Next.js 15, TypeScript, dan Tailwind CSS.
            </p>
            <p>
              Aplikasi ini mendukung dua AI engine: Google Gemini AI dan Claude AI untuk memberikan 
              respons yang kreatif, cerdas, dan kontekstual.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-3">🤖 Dual AI Engine</h3>
                <p>Integrasi dengan Gemini dan Claude AI untuk respons yang optimal.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-3">🎨 Desain Modern</h3>
                <p>Tema gelap dengan efek neon dan animasi yang menarik.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-3">📱 Responsif</h3>
                <p>Optimized untuk mobile dan desktop dengan desain adaptif.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-3">⚡ Real-time</h3>
                <p>Chat real-time dengan typing indicator dan status online.</p>
              </div>
            </div>
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
