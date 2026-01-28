# Guía: Generar Audio GRATIS (Sin API Keys)

Tres opciones 100% gratuitas para generar el audio de tu video sin pagar nada.

---

## Comparación de Opciones Gratuitas

| Opción | Calidad | Velocidad | Internet | Complejidad |
|--------|---------|-----------|----------|-------------|
| **gTTS (Google)** | ⭐⭐⭐⭐ | Rápido | ✅ Requiere | ⭐ Muy fácil |
| **pyttsx3 (Local)** | ⭐⭐⭐ | Rápido | ❌ No requiere | ⭐ Muy fácil |
| **OpenAI TTS** | ⭐⭐⭐⭐⭐ | Rápido | ✅ Requiere | ⭐⭐ Fácil (cuesta $0.10) |

---

## OPCIÓN 1: gTTS (Recomendada - Gratis) ⭐

**Google Text-to-Speech** - Usa la misma voz de Google Translate

### Ventajas
✅ 100% gratuito
✅ Sin límites de uso
✅ No requiere API key
✅ No requiere cuenta
✅ Buena calidad
✅ Funciona bien en español

### Desventajas
⚠️ Requiere internet
⚠️ Voz un poco robótica (pero clara)
⚠️ Sin opciones de personalización

### Cómo Usar

```bash
# 1. Instalar librería
pip install gtts

# 2. Generar audios
python generate_audio_free.py
```

**¡Listo!** Los 15 archivos MP3 estarán en `public/audio/`

**Tiempo:** ~5 minutos

---

## OPCIÓN 2: pyttsx3 (Offline - Gratis)

**Motor TTS Local** - Usa las voces instaladas en tu sistema operativo

### Ventajas
✅ 100% gratuito
✅ Funciona sin internet (offline)
✅ Sin límites de uso
✅ Rápido

### Desventajas
⚠️ Calidad variable según sistema operativo
⚠️ Voz más robótica
⚠️ Voces en español limitadas (según tu OS)

### Cómo Usar

**Windows:**
```bash
pip install pyttsx3
python generate_audio_offline.py
```

**macOS:**
```bash
pip install pyttsx3 pyobjc
python generate_audio_offline.py
```

**Linux:**
```bash
sudo apt-get install espeak
pip install pyttsx3
python generate_audio_offline.py
```

**Tiempo:** ~3 minutos

---

## OPCIÓN 3: Sin Audio

El video funciona perfectamente sin narración. Los visuales son suficientemente claros.

---

## Instalación Paso a Paso

### Para gTTS (Opción 1 - Recomendada)

#### 1. Verificar Python

```bash
python --version
# Debe ser 3.8 o superior
```

Si no tienes Python: https://www.python.org/downloads/

#### 2. Instalar gTTS

```bash
pip install gtts
```

O si tienes problemas:
```bash
python -m pip install gtts
```

#### 3. Generar Audios

```bash
cd poo-flask-video
python generate_audio_free.py
```

Verás:
```
============================================================
Generador de Audio GRATUITO con Google TTS
============================================================
Idioma: Español
Directorio de salida: public\audio
Total de clips: 15
============================================================

[1/15] Generando: act1_hook.mp3
✓ Generado: act1_hook.mp3
[2/15] Generando: act1_clase_concepto.mp3
✓ Generado: act1_clase_concepto.mp3
...
```

#### 4. Verificar Archivos

```bash
cd public/audio
ls
```

Deberías ver 15 archivos MP3.

#### 5. Preview y Render

```bash
cd ../..
npm run dev     # Preview
npm run build   # Render final
```

---

## Troubleshooting

### "ModuleNotFoundError: No module named 'gtts'"

**Solución:**
```bash
pip install gtts
```

### "pip: command not found"

**Windows:**
```bash
python -m pip install gtts
```

**macOS/Linux:**
```bash
python3 -m pip install gtts
```

### "ERROR: Could not install packages"

**Intenta con permisos de administrador:**

**Windows (PowerShell como Admin):**
```bash
pip install gtts --user
```

**macOS/Linux:**
```bash
sudo pip3 install gtts
```

### "urllib.error.URLError: [Errno -3] Temporary failure in name resolution"

**Problema:** No hay conexión a internet.

**Solución:**
- Verifica tu conexión
- O usa la opción offline: `python generate_audio_offline.py`

### "Los audios suenan muy robóticos"

Es normal con gTTS. Opciones:

1. **Ajustar velocidad** - Edita `generate_audio_free.py` línea 12:
   ```python
   SLOW = True  # Habla más lento (más natural)
   ```

2. **Usar OpenAI TTS** - Mejor calidad (~$0.10):
   ```bash
   python generate_audio.py
   ```

3. **Grabar tú mismo** - Mejor calidad pero más tiempo:
   - Ver [AUDIO_GUIDE.md](AUDIO_GUIDE.md)

### "El audio está en inglés, no español"

**Problema:** gTTS detectó mal el idioma.

**Solución:** Ya está configurado en español en el script (línea 11):
```python
LANGUAGE = "es"  # Español
```

Si aún tienes problemas, verifica que instalaste la versión correcta:
```bash
pip install --upgrade gtts
```

---

## Personalización

### Cambiar Velocidad (gTTS)

Edita `generate_audio_free.py` línea 12:

```python
SLOW = False  # Normal
SLOW = True   # Más lento (más natural)
```

### Cambiar Velocidad (pyttsx3)

Edita `generate_audio_offline.py` línea 13:

```python
RATE = 160  # Normal
RATE = 140  # Más lento
RATE = 180  # Más rápido
```

### Modificar el Texto

Edita cualquiera de los scripts en la sección `NARRATION_TEXTS` (línea ~25).

---

## Comparación con OpenAI TTS

| Característica | gTTS (Gratis) | OpenAI TTS (~$0.10) |
|----------------|---------------|---------------------|
| Costo | $0 | ~$0.08 |
| Calidad | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Naturalidad | Robótica pero clara | Muy natural |
| Voces | 1 (Google) | 6 opciones |
| Velocidad | 5 min | 3 min |
| Requiere cuenta | ❌ No | ✅ Sí |
| API key | ❌ No | ✅ Sí |

**Recomendación:**
- Para **prototipo/prueba**: Usa gTTS (gratis)
- Para **video final profesional**: Considera OpenAI TTS ($0.10)

---

## Próximos Pasos

Una vez generados los audios:

1. ✅ Verifica que los 15 MP3 estén en `public/audio/`
2. ✅ Ejecuta `npm run dev`
3. ✅ Navega el video para verificar sincronización
4. ✅ Si la calidad no te convence, considera OpenAI TTS
5. ✅ Render final: `npm run build`

---

## Scripts Disponibles

```bash
# Opción 1: Google TTS (gratis, internet)
python generate_audio_free.py

# Opción 2: TTS local (gratis, offline)
python generate_audio_offline.py

# Opción 3: OpenAI TTS (mejor calidad, $0.10)
python generate_audio.py
```

---

## FAQ

### ¿Puedo usar estos audios comercialmente?

**gTTS:** Sí, es gratuito para uso personal y comercial.
**pyttsx3:** Sí, es open source (MPL-2.0).

### ¿Cuál es mejor?

Para tu caso:
1. **Primera opción:** gTTS (gratis, buena calidad)
2. **Si no tienes internet:** pyttsx3 (offline)
3. **Si quieres lo mejor:** OpenAI TTS (muy barato)

### ¿Puedo combinar?

Sí, puedes generar algunos clips con gTTS y otros con OpenAI si quieres.

### ¿Los audios sincronizan con el video?

Los textos ya están optimizados para los timings del video. Puede haber pequeñas diferencias de 1-2 segundos, lo cual es aceptable.

---

## ¡Empieza Ahora!

La forma más rápida:

```bash
# 1. Instalar
pip install gtts

# 2. Generar
python generate_audio_free.py

# 3. Ver
npm run dev

# 4. Renderizar
npm run build
```

**Total:** ~10 minutos | Costo: $0 🎉
