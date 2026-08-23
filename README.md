# AudioInsight

**AudioInsight** lets you upload audio in any common format and get:
- **Transcription** — accurate, readable text, with speakers automatically labeled ("Speaker A / Speaker B / ...") when more than one voice is detected.
- **Summarization** — a concise summary of the audio.
- **Audio Q&A** — ask questions about an uploaded recording and get answers grounded in its transcript, in real time over WebSockets.

All three can be translated into any of 15 supported languages.

## Live Links

- **Frontend**: [audio-insight.vercel.app](https://audio-insight.vercel.app/)
- **Backend**: not currently deployed — the previous Railway deployment and its database were retired. See [Deployment](#deployment) below.

## Features

- **Audio upload** — drag-and-drop or file picker, MP3/WAV/M4A/OGG/WEBM/AAC/FLAC/AIFF/WMA/MP4, up to 200MB.
- **Upload history** — every past upload is listed and selectable as the "active audio" that Transcribe/Summary/Q&A operate on.
- **Transcription & translation** with automatic speaker diarization.
- **Summarization** with word-count stats.
- **Audio Q&A** — persisted per audio, answers grounded in that recording's transcript.
- **Audio playback** with a seek bar, alongside the transcript/summary/Q&A views.
- **Accounts** — signup/login, profile page, change password.
- **Delete uploads** you no longer need.

## Tech Stack

### Frontend
- **React** + **Vite**
- **Chakra UI** for components, with a custom dark theme (`frontend/audio-insight/src/theme/tokens.js`)
- **Tabler Icons**
- **Socket.IO client** for the Q&A page

### Backend
- **Node.js** + **Express**
- **MySQL** via **Sequelize**
- **Socket.IO** for real-time Q&A
- **Gemini API** for translation, summarization, and Q&A
- **AssemblyAI** for transcription and speaker diarization
- **Cloudinary** for audio file storage

## Local Development

### 1. Database

A local MySQL instance is provided via Docker:

```bash
docker compose up -d
```

This starts MySQL on `localhost:3306` (database `audioinsight`, user/password `root`/`root`). The backend creates its tables automatically on first run.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in the values (see below)
npm run server          # nodemon, or `npm start` for a plain run
```

`.env` requires:
- `DB_URL` — set to `mysql://root:root@127.0.0.1:3306/audioinsight` for the Docker database above, or your own MySQL connection string
- `JWT_SECRET` — any random string
- `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` — from a [Cloudinary](https://cloudinary.com) account
- `GOOGLE_GEMINI_API_KEY` — from [Google AI Studio](https://aistudio.google.com/apikey)
- `ASSEMBLY_API_KEY` — from [AssemblyAI](https://www.assemblyai.com/)
- `FRONTEND_URL` — only required in production (see below); local dev accepts any `localhost` origin automatically

`.env` is gitignored — never commit real credentials to this file.

### 3. Frontend

```bash
cd frontend/audio-insight
npm install
npm run start
```

By default the frontend talks to the deployed backend URL. To point it at your local backend instead, create `frontend/audio-insight/.env.local`:

```
VITE_API_URL=http://localhost:3002
```

(matching whatever `PORT` you set in the backend's `.env`).

## Deployment

- **Frontend**: deployed on Vercel.
- **Backend**: needs a Node host (e.g. Railway or Render) plus a managed MySQL database — the local Docker database above is for development only. Whichever host you use, set the backend's environment variables from `.env.example`, and set `FRONTEND_URL` to your deployed frontend's exact URL (no trailing slash) — CORS and the Q&A WebSocket both depend on it matching exactly.

## Usage

1. **Sign up / log in.**
2. **Upload audio** from the Dashboard — it becomes your active audio automatically.
3. **Transcribe** — pick a language and generate a transcript (with speaker labels, if applicable).
4. **Summarize** — generate a concise summary in any language.
5. **Q&A** — ask questions about the active audio and get transcript-grounded answers.
6. Switch the active audio anytime via the "Active audio" bar, or manage/delete past uploads from the Dashboard.
