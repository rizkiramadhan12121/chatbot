# 🚀 Quick Deploy ke Vercel

## Langkah 1: Deploy dari GitHub

1. **Buka [vercel.com](https://vercel.com)**
2. **Login dengan GitHub**
3. **Klik "New Project"**
4. **Import repository: `rizkiramadhan12121/chatbot`**
5. **Klik "Deploy"**

## Langkah 2: Setup Environment Variables

**SETELAH DEPLOYMENT PERTAMA:**

1. **Buka project di Vercel Dashboard**
2. **Go to Settings → Environment Variables**
3. **Tambahkan 2 environment variables:**

### Variable 1:
- **Name:** `NEXT_PUBLIC_GEMINI_API_KEY`
- **Value:** `your_gemini_api_key_here`
- **Environment:** Production, Preview, Development

### Variable 2:
- **Name:** `NEXT_PUBLIC_CLAUDE_API_KEY`
- **Value:** `your_claude_api_key_here`
- **Environment:** Production, Preview, Development

## Langkah 3: Redeploy

1. **Go to Deployments tab**
2. **Klik "..." pada deployment terbaru**
3. **Pilih "Redeploy"**

## ✅ Selesai!

Aplikasi ChatBotKyy akan tersedia di URL Vercel Anda.

## 🔧 Troubleshooting

### Error: "Environment Variable references Secret which does not exist"
- **Solusi:** Tambahkan environment variables di Vercel Dashboard
- **Jangan** menggunakan format `@secret_name` di vercel.json

### Error: "Build failed"
- **Solusi:** Pastikan semua dependencies terinstall
- **Check:** `npm run build` berhasil di local

### Error: "API not working"
- **Solusi:** Pastikan environment variables sudah di-set
- **Check:** API keys valid dan aktif

## 📱 Test Aplikasi

Setelah deployment:
1. **Buka URL Vercel**
2. **Klik "Chat" untuk masuk ke chatbot**
3. **Test dengan mengirim pesan**

## 🌐 Custom Domain (Opsional)

1. **Go to Settings → Domains**
2. **Add domain Anda**
3. **Follow DNS instructions**

---

**Happy Deploying! 🎉**
