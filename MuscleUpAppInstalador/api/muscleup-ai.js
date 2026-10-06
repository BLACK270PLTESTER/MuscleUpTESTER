const OpenAI = require('openai');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = process.env.OPENAI_MODEL || 'gpt-5.6';

const PROFILES = {
  jarvis: 'Habla como un asistente masculino cinematográfico inspirado en interfaces de ciencia ficción: grave, sereno, preciso y elegante. No imites ni afirmes ser una voz concreta o personaje protegido.',
  siri: 'Habla como una asistente femenina muy clara, natural, cálida y concisa. No imites ni afirmes ser una voz concreta de Apple.',
  loquendo: 'Usa una personalidad TTS masculina, sintética, grave y muy articulada, con pausas breves. No afirmes ser Loquendo.',
  calm: 'Sé un entrenador masculino calmado, paciente y tranquilizador.',
  energy: 'Sé una coach femenina energética, positiva y directa, sin gritar.',
  coach: 'Sé un coach firme, breve, práctico y responsable.'
};

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  if (!process.env.OPENAI_API_KEY) return send(res, 503, { error: 'AI backend is not configured' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const message = String(body.message || '').trim().slice(0, 4000);
    if (!message) return send(res, 400, { error: 'Missing message' });

    const profile = PROFILES[body.profile] || PROFILES.jarvis;
    const context = body.context || {};
    const history = Array.isArray(body.history) ? body.history.slice(-10) : [];

    const instructions = `Eres MuscleUp AI, un copiloto de entrenamiento, recuperación, alimentación y hábitos.\n\nPERSONALIDAD: ${profile}\n\nREGLAS:\n- Responde en el idioma del usuario.\n- Sé útil y concreto; evita respuestas genéricas.\n- Usa el contexto disponible, pero no inventes datos biométricos.\n- Para temas médicos, lesiones, síntomas o nutrición clínica, sé prudente y recomienda consultar a un profesional cuando corresponda.\n- No prometas acceso a Apple Health, HealthKit, Apple Watch, sensores o datos que no estén realmente presentes.\n- No digas que eres Siri, JARVIS o Loquendo. Son perfiles estilísticos de MuscleUp.\n- Prioriza decisiones accionables para hoy: tiempo disponible, sueño, energía, objetivo, equipo y entrenamiento reciente.\n\nCONTEXTO DEL USUARIO:\nNombre: ${context.name || 'atleta'}\nCómo se siente: ${context.feel || 'no indicado'}\nTiempo disponible: ${context.time || 'no indicado'}\nEnergía: ${context.energy || 'no indicada'}`;

    const input = [
      ...history.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 1500) })),
      { role: 'user', content: message }
    ];

    const response = await client.responses.create({
      model: MODEL,
      instructions,
      input,
      store: false,
      max_output_tokens: 500
    });

    return send(res, 200, { reply: response.output_text || 'No pude generar una respuesta.' });
  } catch (error) {
    console.error('MuscleUp AI error:', error);
    return send(res, 500, { error: 'AI request failed' });
  }
};
