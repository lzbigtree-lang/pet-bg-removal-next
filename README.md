# Pet Background Removal - Next.js

Pet photo background removal tool built with Next.js + TailwindCSS.

## Tech Stack

- **Frontend:** Next.js 15 + React 19 + TailwindCSS
- **API:** Replicate (RMBG-1.4 model)
- **Deployment:** Vercel / Cloudflare Pages

## Features

- ✅ Drag & drop upload
- ✅ Real-time preview
- ✅ Transparent PNG output
- ✅ Mobile responsive
- ✅ Error handling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```bash
cp .env.local.example .env.local
```

3. Add your Replicate API token:
```
REPLICATE_API_TOKEN=your_token_here
```

Get token at: https://replicate.com/account/api-tokens

4. Run dev server:
```bash
npm run dev
```

Visit: http://localhost:3000

## Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Add environment variable in Vercel dashboard.

### Build
```bash
npm run build
npm start
```

## Project Structure

```
app/
├── api/remove-bg/route.ts  # API endpoint
├── layout.tsx              # Root layout
├── page.tsx                # Main page
└── globals.css             # Tailwind styles
```

## Cost

- Replicate API: ~$0.0023/image
- Vercel: Free tier available

## License

MIT
