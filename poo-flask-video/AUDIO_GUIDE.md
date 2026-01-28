# Guía Completa: Agregar Audio al Video

Esta guía te muestra paso a paso cómo grabar y agregar tu propia narración al video.

---

## PASO 1: Preparación para Grabar

### Equipamiento Necesario

**Mínimo:**
- Smartphone moderno (la mayoría tienen micrófonos decentes)
- Lugar silencioso
- App de grabación (Voice Memos en iOS, Grabadora en Android)

**Recomendado:**
- Micrófono USB (ej: Blue Yeti, Audio-Technica ATR2100)
- Audacity (software gratuito de edición)
- Habitación con poca reverberación

**Profesional:**
- Micrófono de condensador
- Interfaz de audio
- Tratamiento acústico básico (espuma, mantas)

### Configuración del Espacio

1. **Elige un lugar silencioso:**
   - Apaga aire acondicionado, ventiladores
   - Cierra ventanas (ruido exterior)
   - Avisa a otras personas en casa
   - Apaga notificaciones del teléfono

2. **Reduce reverberación:**
   - Graba en una habitación con alfombra y muebles
   - Evita habitaciones vacías o con paredes duras
   - Truco: graba dentro de un armario lleno de ropa

3. **Posición del micrófono:**
   - 15-20 cm de tu boca
   - Ligeramente debajo del nivel de tu boca (reduce "p" y "b" explosivas)
   - Usa un filtro pop si tienes (o improvisa con medias sobre un marco)

---

## PASO 2: Grabar el Audio

### Opción A: Grabar Todo de Una Vez (Avanzado)

Lee el script completo de [NARRATION_SCRIPT.md](NARRATION_SCRIPT.md) de principio a fin.

**Ventajas:**
- Tono consistente
- Ritmo natural

**Desventajas:**
- Si te equivocas, tienes que empezar de nuevo
- Difícil mantener energía por 5 minutos

### Opción B: Grabar por Segmentos (Recomendado)

Graba cada uno de los 15 segmentos por separado.

**Ventajas:**
- Puedes regrabar solo las partes que no te gustan
- Descansas entre grabaciones
- Mantienes energía constante

**Desventajas:**
- Tienes que asegurar tono consistente
- Más trabajo de edición

### Proceso de Grabación

1. **Calienta la voz:**
   - Bebe agua tibia
   - Haz ejercicios vocales básicos
   - Lee el script en voz alta 2-3 veces

2. **Graba cada segmento:**
   ```
   Para cada segmento en NARRATION_SCRIPT.md:
   1. Lee el segmento mentalmente
   2. Respira profundo
   3. Presiona grabar
   4. Cuenta "3, 2, 1" en tu mente
   5. Lee el texto con naturalidad
   6. Pausa 2 segundos al final
   7. Detén la grabación
   8. Escucha y evalúa
   9. Si no te gusta, repite
   ```

3. **Consejos de interpretación:**
   - **No leas como robot:** Varía tu tono naturalmente
   - **Sonríe al hablar:** Se nota en la voz (sí, funciona)
   - **Respeta las pausas:** El script marca dónde pausar
   - **Enfatiza palabras clave:** Marcadas en el script
   - **Imagina que le explicas a un amigo:** Tono conversacional

4. **Control de calidad:**
   - Escucha cada grabación inmediatamente
   - Verifica que no haya:
     - Ruidos de fondo
     - Respiraciones muy fuertes
     - Clics de boca (bebe agua)
     - Palabras mal pronunciadas
   - Si algo está mal, regraba de inmediato

---

## PASO 3: Editar el Audio

### Software Recomendado: Audacity (Gratuito)

Descarga: https://www.audacityteam.org/

### Proceso de Edición

#### 1. Importar Audio

```
Archivo > Abrir
```

Selecciona tu grabación.

#### 2. Limpiar Audio

**Remover ruido de fondo:**
```
1. Selecciona 1-2 segundos de silencio (solo ruido de fondo)
2. Efecto > Reducción de Ruido > Obtener Perfil de Ruido
3. Selecciona toda la pista (Ctrl+A)
4. Efecto > Reducción de Ruido > Aceptar
   - Reducción de ruido: 12 dB
   - Sensibilidad: 6.00
   - Suavizado de frecuencia: 3
```

**Normalizar volumen:**
```
1. Selecciona toda la pista (Ctrl+A)
2. Efecto > Normalizar
   - Marca "Normalizar amplitud pico a -1.0 dB"
   - Aceptar
```

**Comprimir dinámicas (opcional):**
```
1. Selecciona toda la pista (Ctrl+A)
2. Efecto > Compresor
   - Umbral: -12 dB
   - Ratio: 3:1
   - Ataque: 0.2 seg
   - Release: 1.0 seg
   - Aceptar
```

#### 3. Cortar y Ajustar

**Remover silencios largos:**
```
1. Usa la herramienta de selección
2. Selecciona silencios mayores a 1 segundo
3. Presiona Delete
4. Deja ~0.5 segundos de silencio entre palabras
```

**Ajustar timing:**
```
- Cada segmento debe durar EXACTAMENTE lo que dice el script
- Usa Efecto > Cambiar Velocidad para ajustar (máximo ±10%)
- Si es demasiado largo, habla más rápido en la regrabación
- Si es muy corto, agrega pausas naturales
```

#### 4. Exportar Archivos

Para cada segmento:

```
1. Selecciona el audio del segmento
2. Archivo > Exportar > Exportar Audio Seleccionado
3. Formato: MP3
4. Calidad: 192 kbps
5. Canales: Mono
6. Sample Rate: 44100 Hz
7. Nombrar según NARRATION_SCRIPT.md:
   - act1_hook.mp3
   - act1_clase_concepto.mp3
   - etc.
8. Guardar en: poo-flask-video/public/audio/
```

---

## PASO 4: Integrar Audio en Remotion

He creado todo el código necesario. Solo necesitas:

### 1. Crear carpeta de audio

```bash
mkdir -p public/audio
```

### 2. Copiar tus archivos MP3

Copia los 15 archivos MP3 que grabaste a `public/audio/`

### 3. Código ya está listo

Ya he actualizado todos los archivos necesarios:

- ✅ Componente AudioNarration creado
- ✅ Escenas actualizadas con audio
- ✅ Timings sincronizados
- ✅ Volumen configurado

---

## PASO 5: Preview y Ajustes

### 1. Ejecutar preview

```bash
npm run dev
```

### 2. Verificar sincronización

Ve frame por frame y verifica que:

- ✅ El audio empieza cuando debe
- ✅ El audio termina cuando debe
- ✅ La narración coincide con lo visual
- ✅ No hay silencios extraños
- ✅ El volumen es consistente

### 3. Ajustar si es necesario

Si el audio no sincroniza:

**Opción A: Ajustar en código**

Edita `src/data/audioTimings.ts`:

```typescript
export const AUDIO_TIMINGS = {
  act1: {
    hook: {
      file: 'act1_hook.mp3',
      startFrame: 0,        // Ajusta esto
      volume: 1.0,
    },
    // ...
  },
};
```

**Opción B: Re-editar audio**

Vuelve a Audacity y ajusta la duración del clip.

---

## PASO 6: Render Final

Una vez que todo se vea y escuche perfecto:

```bash
npm run build
```

El video final con audio estará en `out/video.mp4`.

---

## TROUBLESHOOTING

### "El audio suena distorsionado"

**Problema:** Nivel de grabación muy alto
**Solución:** Graba con nivel más bajo, normaliza en post-producción

### "Se escuchan clics y pops"

**Problema:** Boca seca
**Solución:** Bebe agua, edita los clics con Audacity (Efecto > Eliminador de Clics)

### "El audio no se sincroniza"

**Problema:** Duración incorrecta
**Solución:** Verifica duración exacta con:

```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 act1_hook.mp3
```

Debe coincidir con lo especificado en NARRATION_SCRIPT.md

### "No tengo micrófono profesional"

**Problema:** Audio de baja calidad
**Solución:**
- Graba en habitación silenciosa
- Acércate al micrófono del teléfono
- Graba en app de calidad (no la nativa)
- Procesa bien en Audacity
- Smartphones modernos graban sorprendentemente bien

### "Mi voz suena plana/aburrida"

**Problema:** Falta de energía/entusiasmo
**Solución:**
- Párate mientras grabas (mejor energía)
- Sonríe genuinamente
- Gesticula con las manos (ayuda con el tono)
- Imagina que le explicas a alguien a quien le importa
- Toma descansos entre segmentos

---

## ALTERNATIVAS RÁPIDAS

### Si no quieres grabar tú mismo:

**1. Contratar locutor en Fiverr**
- Costo: $20-50 USD
- Tiempo: 2-3 días
- Busca: "Spanish voiceover educational"

**2. Usar Text-to-Speech (si cambias de opinión)**
- OpenAI TTS API
- Google Cloud TTS
- Calidad aceptable para prototipos

**3. Hacer video sin voz**
- Mantener solo música de fondo
- El contenido visual es suficientemente claro
- Opción totalmente válida

---

## RECURSOS ADICIONALES

**Tutoriales de grabación:**
- YouTube: "How to record professional voiceover at home"
- YouTube: "Audacity tutorial for beginners"

**Música de fondo (opcional):**
- https://www.youtube.com/audiolibrary (gratis)
- https://incompetech.com/ (Creative Commons)
- https://freemusicarchive.org/

**Apps de grabación móvil:**
- iOS: Voice Memos (incluida), Ferrite
- Android: Easy Voice Recorder, RecForge II

---

## CHECKLIST FINAL

Antes de considerar el audio terminado:

- [ ] Los 15 clips están grabados
- [ ] Todos los clips están editados (ruido removido, normalizados)
- [ ] Duración de cada clip coincide con el script
- [ ] Archivos MP3 en `public/audio/`
- [ ] Nombres de archivos correctos
- [ ] Preview completo revisado
- [ ] Audio sincroniza con visuals
- [ ] Volumen consistente en todos los clips
- [ ] Sin clics, pops o ruidos
- [ ] Tono y energía apropiados

Una vez completado todo esto, ¡tu video educativo estará listo! 🎉
