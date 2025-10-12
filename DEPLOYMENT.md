# Deployment ke Vercel

Panduan lengkap untuk deploy ChatBotKyy ke Vercel.

## 🚀 Quick Deploy

### 1. Deploy dari GitHub

1. **Fork atau Clone Repository**
   ```bash
   git clone https://github.com/rizkiramadhan12121/chatbot.git
   cd chatbot
   ```

2. **Deploy ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Login dengan GitHub
   - Klik "New Project"
   - Import repository `chatbot`
   - Klik "Deploy"

### 2. Setup Environment Variables

Di Vercel Dashboard, tambahkan environment variables:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_CLAUDE_API_KEY=your_claude_api_key_here
```

**Cara menambahkan:**
1. Buka project di Vercel Dashboard
2. Go to Settings → Environment Variables
3. Add variable:
   - Name: `NEXT_PUBLIC_GEMINI_API_KEY`
   - Value: `your_actual_gemini_key`
   - Environment: Production, Preview, Development
4. Repeat for `NEXT_PUBLIC_CLAUDE_API_KEY`

### 3. Redeploy

Setelah menambahkan environment variables:
1. Go to Deployments tab
2. Klik "..." pada deployment terbaru
3. Pilih "Redeploy"

## 🔧 Manual Deploy dengan Vercel CLI

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Login ke Vercel

```bash
vercel login
```

### 3. Deploy

```bash
vercel
```

### 4. Set Environment Variables

```bash
vercel env add NEXT_PUBLIC_GEMINI_API_KEY
vercel env add NEXT_PUBLIC_CLAUDE_API_KEY
```

### 5. Production Deploy

```bash
vercel --prod
```

## 📋 Checklist Deployment

- [ ] Repository sudah di-push ke GitHub
- [ ] Environment variables sudah di-set di Vercel
- [ ] Build berhasil tanpa error
- [ ] Domain sudah di-set (opsional)
- [ ] SSL certificate aktif (otomatis)

## 🌐 Custom Domain (Opsional)

### 1. Add Domain di Vercel

1. Go to Project Settings → Domains
2. Add domain: `yourdomain.com`
3. Follow DNS instructions

### 2. DNS Configuration

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

## 🔍 Troubleshooting

### Build Error

**Error: framer-motion not found**
```bash
npm install framer-motion@latest
```

**Error: Environment variables not found**
- Pastikan environment variables sudah di-set di Vercel Dashboard
- Redeploy setelah menambahkan environment variables

### Runtime Error

**Error: API key not working**
- Cek environment variables di Vercel Dashboard
- Pastikan format API key benar
- Cek quota API provider

### Performance Issues

**Slow loading**
- Enable Vercel Analytics
- Optimize images
- Use Vercel Edge Functions untuk API

## 📊 Monitoring

### Vercel Analytics

1. Go to Project Settings → Analytics
2. Enable Vercel Analytics
3. Monitor performance metrics

### Error Tracking

1. Go to Functions tab
2. Monitor API errors
3. Check logs untuk debugging

## 🔄 Auto Deploy

### GitHub Integration

Setelah setup awal, setiap push ke branch `main` akan auto-deploy:

```bash
git add .
git commit -m "Update features"
git push origin main
```

### Branch Deployments

- `main` → Production
- `develop` → Preview
- Feature branches → Preview

## 📱 Mobile Optimization

Aplikasi sudah optimized untuk mobile:
- Responsive design
- Touch-friendly interface
- Fast loading
- PWA ready

## 🔒 Security

- Environment variables encrypted
- HTTPS enabled
- CORS configured
- Rate limiting (sesuai provider)

## 📞 Support

Jika ada masalah deployment:
1. Check Vercel Documentation
2. Check GitHub Issues
3. Contact: [your-email@example.com]

---

**Happy Deploying! 🚀**
