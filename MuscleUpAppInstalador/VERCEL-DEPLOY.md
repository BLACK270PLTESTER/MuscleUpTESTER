# MuscleUp — Vercel deployment

## 1. Upload to GitHub

Create a GitHub repository and upload the contents of this folder to the repository root.

## 2. Import into Vercel

Vercel → Add New → Project → Import the GitHub repository.

Use the repository root as Root Directory. No build command is required; this is a static site plus Vercel Node Functions in `/api`.

## 3. Environment variables

In Vercel → Project → Settings → Environment Variables, add:

- `OPENAI_API_KEY` = your server-side OpenAI API key
- `OPENAI_MODEL` = `gpt-6-luna`
- `OPENAI_TTS_MODEL` = `gpt-4o-mini-tts`

Add them to Production (and Preview/Development if you want those environments to use AI too). After changing variables, redeploy.

## 4. Deploy

Click Deploy. The site should be available at the generated `vercel.app` URL.

## 5. Test

- `https://YOUR-DOMAIN.vercel.app/`
- `https://YOUR-DOMAIN.vercel.app/api/muscleup-ai` must reject GET with 405; this is expected.
- In the iPhone app screen, send a message and confirm the cloud badge changes from `IA LOCAL` to `IA ONLINE`.
- Test voice. If server TTS fails, the app falls back to the device voice.
- On iPhone Safari: Share → Add to Home Screen. Open the new MuscleUp icon. It should launch the standalone app shell and hide the landing page.

## Security

Never put `OPENAI_API_KEY` in `index.html`, `js/main.js`, a `NEXT_PUBLIC_*` variable, or any public file. Keep it only in Vercel Environment Variables.
