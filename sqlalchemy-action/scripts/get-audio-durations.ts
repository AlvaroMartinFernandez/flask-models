/**
 * Script para obtener las duraciones de los audios generados
 * y calcular los timings del video (con 0.5s de pausa entre segmentos)
 *
 * Uso:
 *   npx ts-node scripts/get-audio-durations.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const audioDir = path.join(__dirname, '../public/audio');
const FPS = 30;

// Orden de los segmentos (debe coincidir con narrationScript.ts)
const segments = [
  // Acto 1
  'intro',
  'estructura',
  'setup',
  // Acto 2
  'get-all',
  'get-by-id',
  'filter-by',
  // Acto 3
  'post-basico',
  'validaciones',
  'post-relacion',
  // Acto 4
  'put-update',
  'delete',
  'error-handling',
  'conclusion',
];

// Agrupacion por actos
const acts: Record<string, string[]> = {
  'ACTO 1 - Intro y Estructura': ['intro', 'estructura', 'setup'],
  'ACTO 2 - READ': ['get-all', 'get-by-id', 'filter-by'],
  'ACTO 3 - CREATE': ['post-basico', 'validaciones', 'post-relacion'],
  'ACTO 4 - UPDATE/DELETE': ['put-update', 'delete', 'error-handling', 'conclusion'],
};

async function getMP3Duration(filePath: string): Promise<number> {
  const mm = await import('music-metadata');
  const metadata = await mm.parseFile(filePath);
  return metadata.format.duration || 0;
}

async function main() {
  console.log('='.repeat(70));
  console.log('  DURACIONES DE AUDIO - SQLAlchemy CRUD Actions');
  console.log('  (+0.5s de pausa entre segmentos)');
  console.log('='.repeat(70));
  console.log('');

  let currentFrame = 0;
  const results: Record<string, { duration: number; frames: number; startFrame: number }> = {};

  for (const segment of segments) {
    const filePath = path.join(audioDir, `${segment}.mp3`);

    if (fs.existsSync(filePath)) {
      const duration = await getMP3Duration(filePath);
      const durationWithPause = duration + 0.5;
      const frames = Math.ceil(durationWithPause * FPS);

      results[segment] = { duration, frames, startFrame: currentFrame };
      currentFrame += frames;
    } else {
      console.log(`  [!] ${segment}.mp3 NO ENCONTRADO`);
    }
  }

  // Mostrar resultados agrupados por acto
  for (const [actName, actSegments] of Object.entries(acts)) {
    const actStart = results[actSegments[0]]?.startFrame || 0;
    const lastSeg = actSegments[actSegments.length - 1];
    const actEnd = (results[lastSeg]?.startFrame || 0) + (results[lastSeg]?.frames || 0);

    console.log(`\n--- ${actName} (frame ${actStart} - ${actEnd}) ---`);

    for (const seg of actSegments) {
      const r = results[seg];
      if (r) {
        console.log(`  ${seg}:`);
        console.log(`    audio: ${r.duration.toFixed(2)}s | frames: ${r.frames} | start: ${r.startFrame}`);
      }
    }
  }

  // Generar codigo para timings.ts
  console.log('\n' + '='.repeat(70));
  console.log('  CODIGO PARA timings.ts (starts RELATIVOS al acto)');
  console.log('='.repeat(70));

  const timingsMap: Record<string, string> = {
    'intro': 'intro',
    'estructura': 'estructura',
    'setup': 'setup',
    'get-all': 'getAll',
    'get-by-id': 'getById',
    'filter-by': 'filterBy',
    'post-basico': 'postBasico',
    'validaciones': 'validaciones',
    'post-relacion': 'postRelacion',
    'put-update': 'putUpdate',
    'delete': 'delete',
    'error-handling': 'errorHandling',
    'conclusion': 'conclusion',
  };

  // Generar timings relativos por acto
  for (const [actName, actSegments] of Object.entries(acts)) {
    const actStart = results[actSegments[0]]?.startFrame || 0;
    const lastSeg = actSegments[actSegments.length - 1];
    const actEnd = (results[lastSeg]?.startFrame || 0) + (results[lastSeg]?.frames || 0);

    console.log(`\n  // ${actName}`);
    console.log(`  actX: {`);
    console.log(`    start: ${actStart},`);
    console.log(`    end: ${actEnd},`);

    for (const seg of actSegments) {
      const r = results[seg];
      const tsName = timingsMap[seg];
      if (r && tsName) {
        const relativeStart = r.startFrame - actStart;
        console.log(`    ${tsName}: { start: ${relativeStart}, duration: ${r.frames} },`);
      }
    }
    console.log(`  },`);
  }

  // Generar codigo para narrationScript.ts (starts ABSOLUTOS)
  console.log('\n' + '='.repeat(70));
  console.log('  CODIGO PARA narrationScript.ts (starts ABSOLUTOS)');
  console.log('='.repeat(70));

  for (const segment of segments) {
    const r = results[segment];
    if (r) {
      console.log(`    // ${segment}: startFrame: ${r.startFrame}, durationFrames: ${r.frames},`);
    }
  }

  // Resumen
  const totalSeconds = currentFrame / FPS;
  console.log('\n' + '='.repeat(70));
  console.log(`  TOTAL: ${currentFrame} frames = ${totalSeconds.toFixed(1)}s = ${(totalSeconds / 60).toFixed(1)} min`);
  console.log('='.repeat(70));

  // Mostrar act start/end
  console.log('\n  Actos (start/end):');
  for (const [actName, actSegments] of Object.entries(acts)) {
    const actStart = results[actSegments[0]]?.startFrame || 0;
    const lastSeg = actSegments[actSegments.length - 1];
    const actEnd = (results[lastSeg]?.startFrame || 0) + (results[lastSeg]?.frames || 0);
    console.log(`    ${actName}: start: ${actStart}, end: ${actEnd}`);
  }
}

main().catch(console.error);
