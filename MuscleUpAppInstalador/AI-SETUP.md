# MuscleUp AI — activación opcional

La web funciona sin backend: usa una respuesta local y las voces del dispositivo.

Para activar IA real + TTS de servidor, despliega este proyecto en un hosting con funciones Node (por ejemplo, Vercel) y configura las variables de entorno:

- `OPENAI_API_KEY`
- `OPENAI_MODEL` (por defecto `gpt-5.6`)
- `OPENAI_TTS_MODEL` (por defecto `gpt-4o-mini-tts`)

Las funciones son:

- `POST /api/muscleup-ai` → respuesta inteligente contextual.
- `POST /api/muscleup-tts` → audio TTS con perfiles JARVIS/SIRI-style/etc.

**Nunca** pongas `OPENAI_API_KEY` en JavaScript del navegador. La documentación oficial de OpenAI indica que las claves deben permanecer en servidor y no exponerse en código cliente.

Los perfiles JARVIS y SIRI-STYLE son estilos de personalidad/voz. No son clones ni voces oficiales de esos nombres.
