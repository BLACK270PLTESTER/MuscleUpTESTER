const OpenAI = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const DEFAULT_MODEL = process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts';
const VOICES = new Set(['alloy','ash','ballad','coral','echo','fable','onyx','nova','sage','shimmer','verse','marin','cedar']);
const INSTRUCTIONS = {
  jarvis: 'Speak in Spanish with a deep, calm, cinematic assistant tone. Precise, elegant, measured pauses. Do not imitate any specific character or person.',
  siri: 'Speak in Spanish with a clear, warm, natural, concise female assistant style. Do not imitate any specific person.',
  loquendo: 'Speak in Spanish with a synthetic, masculine, low and highly articulated TTS style. Do not claim to be Loquendo.',
  calm: 'Speak in Spanish slowly, calmly and reassuringly.',
  energy: 'Speak in Spanish with friendly energy and confidence, without shouting.',
  coach: 'Speak in Spanish firmly, directly and briefly like a disciplined coach.'
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.statusCode = 405; return res.end('Method not allowed'); }
  if (!process.env.OPENAI_API_KEY) { res.statusCode = 503; return res.end('TTS backend is not configured'); }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const input = String(body.text || '').trim().slice(0, 4096);
    if (!input) { res.statusCode = 400; return res.end('Missing text'); }
    const profile = body.profile || 'jarvis';
    const voice = VOICES.has(body.voice) ? body.voice : 'onyx';
    const audio = await client.audio.speech.create({
      model: DEFAULT_MODEL,
      voice,
      input,
      instructions: INSTRUCTIONS[profile] || INSTRUCTIONS.jarvis,
      response_format: 'mp3'
    });
    const buffer = Buffer.from(await audio.arrayBuffer());
    res.statusCode = 200;
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');
    res.end(buffer);
  } catch (error) {
    console.error('MuscleUp TTS error:', error);
    res.statusCode = 500;
    res.end('TTS request failed');
  }
};
