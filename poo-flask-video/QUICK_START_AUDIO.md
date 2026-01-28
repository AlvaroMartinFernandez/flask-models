# Quick Start: Agregar Audio en 30 Minutos

Guía rápida para grabar y agregar audio a tu video lo más rápido posible.

---

## Opción Rápida: Smartphone

### Paso 1: Preparar (2 minutos)

1. **Encuentra un lugar silencioso**
   - Habitación con ropa/muebles (reduce eco)
   - Cierra ventanas
   - Apaga ventiladores/AC

2. **Abre la app de grabación**
   - iOS: Voice Memos (pre-instalada)
   - Android: Grabadora de voz

3. **Posición del teléfono**
   - 15-20 cm de tu boca
   - En modo vertical
   - Micrófono apuntando hacia ti

### Paso 2: Grabar (15 minutos)

1. **Abre [NARRATION_SCRIPT.md](NARRATION_SCRIPT.md)**

2. **Graba cada segmento por separado:**

   ```
   Para cada uno de los 15 segmentos:
   1. Lee el texto mentalmente
   2. Toca grabar
   3. Cuenta "3, 2, 1" mentalmente
   4. Lee el texto en voz alta
   5. Pausa 2 segundos
   6. Detén la grabación
   7. Guarda como: act1_hook, act1_clase_concepto, etc.
   ```

3. **Consejos rápidos:**
   - Habla claro pero natural
   - Sonríe (se nota en la voz)
   - Si te equivocas, regraba
   - No te preocupes por ser perfecto

### Paso 3: Transferir (3 minutos)

1. **Conecta el teléfono a la computadora**

2. **Copia archivos a:**
   ```
   poo-flask-video/public/audio/
   ```

3. **Renombra los archivos exactamente como:**
   ```
   act1_hook.mp3
   act1_clase_concepto.mp3
   act1_encapsulacion.mp3
   act1_herencia.mp3
   act1_polimorfismo.mp3
   act1_abstraccion.mp3
   act2_presentacion.mp3
   act2_clase_usuarios.mp3
   act2_flask_setup.mp3
   act2_get_endpoints.mp3
   act2_post_endpoint.mp3
   act2_put_delete.mp3
   act2_demo.mp3
   act3_recap.mp3
   act3_cta.mp3
   ```

### Paso 4: Preview (5 minutos)

1. **Ejecuta:**
   ```bash
   npm run dev
   ```

2. **Verifica:**
   - Audio se escucha
   - Sincroniza con el video
   - Volumen es bueno

3. **Si algo está mal:**
   - Regraba solo ese segmento
   - Reemplaza el archivo
   - Recarga el preview

### Paso 5: Render (5 minutos)

```bash
npm run build
```

¡Listo! Tu video con audio está en `out/video.mp4`

---

## Mejoras Opcionales (Si Tienes Más Tiempo)

### Editar en Audacity

**Solo si tienes ruido de fondo:**

1. Descarga [Audacity](https://www.audacityteam.org/)
2. Abre el audio
3. Selecciona 1 seg de silencio
4. Efecto > Reducción de Ruido > Obtener Perfil
5. Ctrl+A (seleccionar todo)
6. Efecto > Reducción de Ruido > Aceptar
7. Archivo > Exportar > MP3

### Normalizar Volumen

**Si algunos clips están muy bajos:**

1. Audacity > Abrir audio
2. Ctrl+A
3. Efecto > Normalizar > Aceptar
4. Exportar

---

## Troubleshooting Rápido

### "No se escucha el audio"

✓ Verifica que los archivos están en `public/audio/`
✓ Verifica los nombres exactos de los archivos
✓ Recarga el preview con Ctrl+R

### "Audio no sincroniza"

✓ Verifica la duración del audio con:
```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 public/audio/act1_hook.mp3
```

Debe ser ~15 segundos para el hook, etc.

Si es muy largo/corto:
- Regraba más rápido/lento
- O edita en Audacity (Efecto > Cambiar Velocidad)

### "Audio suena mal"

✓ Graba en lugar más silencioso
✓ Acércate más al micrófono
✓ Habla más fuerte pero sin gritar
✓ Usa Audacity para limpiar ruido

---

## Apps de Grabación Recomendadas

### iOS (Gratis)
- **Voice Memos** (pre-instalada) ⭐ Recomendada
- **Just Press Record** (de pago, mejor calidad)

### Android (Gratis)
- **Easy Voice Recorder** ⭐ Recomendada
- **RecForge II** (más opciones)
- **Voice Recorder by Samsung** (en dispositivos Samsung)

### Configuración recomendada:
- Formato: MP3 o M4A/AAC
- Calidad: Alta o Máxima
- Sample rate: 44.1 kHz
- Bit rate: 192 kbps (si la app lo permite)

---

## Checklist Final

Antes de hacer el render final:

- [ ] Los 15 archivos MP3 en `public/audio/`
- [ ] Nombres exactos según la lista
- [ ] Preview completo visto
- [ ] Audio sincroniza con visuales
- [ ] Volumen es consistente
- [ ] No hay ruidos extraños

¡Todo listo! 🎉

---

## ¿No Tienes Tiempo?

### Alternativa 1: Hazlo en partes
Graba 5 clips por día durante 3 días.

### Alternativa 2: Contrata en Fiverr
Busca "Spanish voiceover" por $20-50 USD.

### Alternativa 3: Sin audio
El video funciona perfectamente sin audio.
El contenido visual es suficientemente claro.
