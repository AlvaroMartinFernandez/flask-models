/**
 * Script para listar las voces disponibles en ElevenLabs
 *
 * Uso: npx ts-node scripts/list-voices.ts
 */

import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    console.error('Error: ELEVENLABS_API_KEY no configurada');
    console.log('\nCrea un archivo .env con:');
    console.log('ELEVENLABS_API_KEY=tu-api-key-aqui');
    process.exit(1);
  }

  const client = new ElevenLabsClient({ apiKey });

  console.log('\n=== Voces disponibles en ElevenLabs ===\n');

  try {
    const voices = await client.voices.getAll();

    // Voces recomendadas para español
    const spanishRecommended = ['Antoni', 'Arnold', 'Bella', 'Rachel', 'Domi', 'Elli'];

    console.log('Voces recomendadas para español (Multilingual v2):\n');

    for (const voice of voices.voices) {
      const isRecommended = spanishRecommended.includes(voice.name);
      const marker = isRecommended ? ' [RECOMENDADA]' : '';

      console.log(`- ${voice.name}${marker}`);
      console.log(`  ID: ${voice.voice_id}`);
      console.log(`  Categoria: ${voice.category || 'N/A'}`);
      if (voice.labels) {
        console.log(`  Labels: ${JSON.stringify(voice.labels)}`);
      }
      console.log('');
    }

    console.log('\n=== Uso ===');
    console.log('Para cambiar la voz, edita CONFIG.voice en scripts/generate-audio.ts');
    console.log('Ejemplo: voice: "Antoni" o voice: "Rachel"');
  } catch (error) {
    console.error('Error obteniendo voces:', error);
  }
}

main().catch(console.error);
