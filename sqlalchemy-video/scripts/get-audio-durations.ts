/**
 * Script para obtener las duraciones de los audios generados
 * y calcular los timings del video (con 0.5s de pausa entre segmentos)
 *
 * Uso:
 *   npm install music-metadata
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
  'que-es-orm',
  'que-es-sqlalchemy',
  'inicializacion',
  // Acto 2
  'sintaxis-moderna',
  'tipos-columnas',
  'opciones-columnas',
  // Acto 3
  'relacion-uno-a-uno',
  'relacion-uno-a-muchos',
  'relacion-muchos-db-table',
  'relacion-muchos-clase',
  'on-delete',
  // Acto 4
  'metodo-repr',
  'metodo-serialize',
  'serializacion-relaciones',
  'conclusion',
];

// Agrupacion por actos
const acts: Record<string, string[]> = {
  'ACTO 1 - Fundamentos': ['intro', 'que-es-orm', 'que-es-sqlalchemy', 'inicializacion'],
  'ACTO 2 - Modelos': ['sintaxis-moderna', 'tipos-columnas', 'opciones-columnas'],
  'ACTO 3 - Relaciones': ['relacion-uno-a-uno', 'relacion-uno-a-muchos', 'relacion-muchos-db-table', 'relacion-muchos-clase', 'on-delete'],
  'ACTO 4 - Serializacion': ['metodo-repr', 'metodo-serialize', 'serializacion-relaciones', 'conclusion'],
};

async function getMP3Duration(filePath: string): Promise<number> {
  const mm = await import('music-metadata');
  const metadata = await mm.parseFile(filePath);
  return metadata.format.duration || 0;
}

async function main() {
  console.log('='.repeat(70));
  console.log('  DURACIONES DE AUDIO - SQLAlchemy Video');
  console.log('  (+0.5s de pausa entre segmentos)');
  console.log('='.repeat(70));
  console.log('');

  let currentFrame = 0;
  const results: Record<string, { duration: number; frames: number; startFrame: number }> = {};

  for (const segment of segments) {
    const filePath = path.join(audioDir, `${segment}.mp3`);

    if (fs.existsSync(filePath)) {
      const duration = await getMP3Duration(filePath);
      const durationWithPause = duration + 0.5; // +0.5s de respiro
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

  // Generar codigo para narrationScript.ts
  console.log('\n' + '='.repeat(70));
  console.log('  CODIGO PARA narrationScript.ts (startFrame + durationFrames)');
  console.log('='.repeat(70));

  for (const segment of segments) {
    const r = results[segment];
    if (r) {
      console.log(`    // ${segment}`);
      console.log(`    startFrame: ${r.startFrame},`);
      console.log(`    durationFrames: ${r.frames},`);
      console.log('');
    }
  }

  // Generar codigo para timings.ts
  console.log('='.repeat(70));
  console.log('  CODIGO PARA timings.ts (start + duration)');
  console.log('='.repeat(70));

  const timingsMap: Record<string, string> = {
    'intro': 'intro',
    'que-es-orm': 'queEsOrm',
    'que-es-sqlalchemy': 'queEsSqlalchemy',
    'inicializacion': 'inicializacion',
    'sintaxis-moderna': 'sintaxisModerna',
    'tipos-columnas': 'tiposColumnas',
    'opciones-columnas': 'opcionesColumnas',
    'relacion-uno-a-uno': 'relacionUnoAUno',
    'relacion-uno-a-muchos': 'relacionUnoAMuchos',
    'relacion-muchos-db-table': 'relacionMuchosDbTable',
    'relacion-muchos-clase': 'relacionMuchosClase',
    'on-delete': 'onDelete',
    'metodo-repr': 'metodoRepr',
    'metodo-serialize': 'metodoSerialize',
    'serializacion-relaciones': 'serializacionRelaciones',
    'conclusion': 'conclusion',
  };

  for (const segment of segments) {
    const r = results[segment];
    const tsName = timingsMap[segment];
    if (r && tsName) {
      console.log(`    ${tsName}: { start: ${r.startFrame}, duration: ${r.frames} },`);
    }
  }

  // Resumen
  const totalSeconds = currentFrame / FPS;
  console.log('\n' + '='.repeat(70));
  console.log(`  TOTAL: ${currentFrame} frames = ${totalSeconds.toFixed(1)}s = ${(totalSeconds / 60).toFixed(1)} min`);
  console.log('='.repeat(70));

  // Mostrar act start/end para timings.ts
  console.log('\n  Actos (start/end):');
  for (const [actName, actSegments] of Object.entries(acts)) {
    const actStart = results[actSegments[0]]?.startFrame || 0;
    const lastSeg = actSegments[actSegments.length - 1];
    const actEnd = (results[lastSeg]?.startFrame || 0) + (results[lastSeg]?.frames || 0);
    console.log(`    ${actName}: start: ${actStart}, end: ${actEnd}`);
  }
}

main().catch(console.error);
