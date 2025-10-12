# Setup Gemini AI API

## Langkah-langkah Setup:

1. **Dapatkan API Key Gemini:**
   - Kunjungi: https://makersuite.google.com/app/apikey
   - Login dengan Google account
   - Klik "Create API Key"
   - Copy API key yang dihasilkan

2. **Setup Environment Variable:**
   - Buat file `.env.local` di root project
   - Tambahkan kode berikut:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Restart Development Server:**
   ```bash
   npm run dev
   ```

## Fitur yang Tersedia:

- ✅ Layout seperti WhatsApp dengan sidebar
- ✅ Daftar chat di sidebar kiri
- ✅ Profile chat dengan foto yang bisa diubah
- ✅ Integrasi Gemini AI untuk respons cerdas
- ✅ Upload foto profile
- ✅ Edit nama chat
- ✅ Responsive design

## Catatan:
- Jika tidak ada API key, bot akan menggunakan respons default
- API key diperlukan untuk menggunakan fitur AI yang cerdas
- Semua data disimpan di local storage browser

