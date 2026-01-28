/**
 * Script para obtener las duraciones de los audios
 */

import * as fs from 'fs';
import * as path from 'path';

const audioDir = path.join(__dirname, '../public/audio');

// Orden de los segmentos
const segments = [
  'intro',
  'clases-objetos',
  'init-detallado',
  'metodos-magicos',
  'herencia-basica',
  'herencia-super',
  'encapsulacion',
  'polimorfismo',
  'abstraccion',
  'clase-usuarios-intro',
  'init-usuarios',
  'get-all',
  'get-one',
  'add-member',
  'edit-delete',
  'flask-intro',
  'flask-demo',
  'get-endpoints',
  'post-endpoint',
  'put-delete-endpoints',
  'conclusion',
];

async function getMP3Duration(filePath: string): Promise<number> {
  // Usamos music-metadata para obtener la duración
  const mm = await import('music-metadata');
  const metadata = await mm.parseFile(filePath);
  return metadata.format.duration || 0;
}

async function main() {
  console.log('=== Duraciones de Audios ===\n');

  let currentTime = 0;
  const FPS = 30;

  for (const segment of segments) {
    const filePath = path.join(audioDir, `${segment}.mp3`);

    if (fs.existsSync(filePath)) {
      const duration = await getMP3Duration(filePath);
      const durationWithPause = duration + 0.5; // +0.5s de pausa
      const frames = Math.ceil(durationWithPause * FPS);

      console.log(`${segment}:`);
      console.log(`  Audio: ${duration.toFixed(2)}s`);
      console.log(`  Con pausa: ${durationWithPause.toFixed(2)}s (${frames} frames)`);
      console.log(`  Start: ${currentTime.toFixed(2)}s (frame ${Math.round(currentTime * FPS)})`);
      console.log('');

      currentTime += durationWithPause;
    } else {
      console.log(`${segment}: NO ENCONTRADO`);
    }
  }

  console.log(`\nDuración total: ${currentTime.toFixed(2)}s (${Math.ceil(currentTime * FPS)} frames)`);
  console.log(`Minutos: ${(currentTime / 60).toFixed(2)}`);
}

main().catch(console.error);
