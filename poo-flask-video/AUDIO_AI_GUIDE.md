# Guía: Generar Audio con IA (OpenAI TTS)

Esta guía te muestra cómo generar TODOS los audios automáticamente usando inteligencia artificial.

**Tiempo total:** 10-15 minutos
**Costo:** ~$0.10 USD (menos de 10 centavos)
**Resultado:** 15 clips de audio profesionales en español

---

## ¿Qué es OpenAI TTS?

OpenAI Text-to-Speech es un servicio de IA que convierte texto en audio con voces muy naturales.

**Ventajas:**
- ✅ Voces naturales y expresivas
- ✅ Soporte perfecto para español
- ✅ Generación en segundos
- ✅ Muy económico
- ✅ Sin necesidad de grabar

**Voces disponibles en español:**
- **alloy** - Neutral, clara (recomendada) ⭐
- **nova** - Femenina, amigable
- **shimmer** - Femenina, suave
- **echo** - Masculina, cálida
- **fable** - Masculina, expresiva
- **onyx** - Masculina, profunda

---

## Paso 1: Obtener API Key de OpenAI (5 minutos)

### 1.1 Crear cuenta

1. Ve a: https://platform.openai.com/signup
2. Regístrate con email o Google/Microsoft
3. Verifica tu email

### 1.2 Agregar método de pago

1. Ve a: https://platform.openai.com/account/billing
2. Click en "Add payment method"
3. Agrega una tarjeta de crédito/débito

**Nota:** OpenAI regala $5 USD de crédito a nuevos usuarios. Si ya tienes cuenta, el costo total será ~$0.10 USD.

### 1.3 Crear API Key

1. Ve a: https://platform.openai.com/api-keys
2. Click en "Create new secret key"
3. Nombra la key: "Remotion Video"
4. **COPIA LA KEY** (empieza con `sk-...`)
5. ⚠️ **NO LA COMPARTAS** - guárdala en lugar seguro

---

## Paso 2: Configurar el Proyecto (2 minutos)

### 2.1 Instalar dependencias de Python

Si no tienes Python instalado:

**Windows:**
```bash
# Descargar de: https://www.python.org/downloads/
# Durante instalación, marca "Add Python to PATH"
```

**macOS:**
```bash
brew install python3
```

**Linux:**
```bash
sudo apt update && sudo apt install python3 python3-pip
```

### 2.2 Instalar librería OpenAI

```bash
cd poo-flask-video
pip install -r requirements.txt
```

O directamente:
```bash
pip install openai
```

---

## Paso 3: Generar los Audios (5 minutos)

### 3.1 Configurar API Key

**Windows (PowerShell):**
```powershell
$env:OPENAI_API_KEY="sk-tu-api-key-aqui"
```

**Windows (CMD):**
```cmd
set OPENAI_API_KEY=sk-tu-api-key-aqui
```

**macOS/Linux:**
```bash
export OPENAI_API_KEY="sk-tu-api-key-aqui"
```

### 3.2 Ejecutar el script

```bash
python generate_audio.py
```

Verás algo como:
```
============================================================
Generador de Audio con OpenAI TTS
============================================================
Voz seleccionada: alloy
Directorio de salida: public\audio
Total de clips: 15
============================================================

[1/15] Generando: act1_hook.mp3
✓ Generado: act1_hook.mp3
[2/15] Generando: act1_clase_concepto.mp3
✓ Generado: act1_clase_concepto.mp3
...
[15/15] Generando: act3_cta.mp3
✓ Generado: act3_cta.mp3

============================================================
✓ ¡Todos los archivos generados exitosamente!
============================================================
```

**Tiempo estimado:** 2-3 minutos (dependiendo de tu conexión)

### 3.3 Verificar archivos

```bash
cd public/audio
ls
```

Deberías ver 15 archivos MP3:
```
act1_abstraccion.mp3
act1_clase_concepto.mp3
act1_encapsulacion.mp3
act1_herencia.mp3
act1_hook.mp3
act1_polimorfismo.mp3
act2_clase_usuarios.mp3
act2_demo.mp3
act2_flask_setup.mp3
act2_get_endpoints.mp3
act2_post_endpoint.mp3
act2_presentacion.mp3
act2_put_delete.mp3
act3_cta.mp3
act3_recap.mp3
```

---

## Paso 4: Preview y Render (5 minutos)

### 4.1 Preview del video

```bash
cd ../..  # Volver a la raíz del proyecto
npm run dev
```

Se abrirá http://localhost:3000

**Verifica:**
- ✅ Se escucha el audio
- ✅ Audio sincroniza con visuales
- ✅ Volumen es adecuado
- ✅ Pronunciación es correcta

### 4.2 Render final

Si todo se ve bien:

```bash
npm run build
```

El video completo con audio estará en `out/video.mp4` 🎉

---

## Personalización

### Cambiar la Voz

Edita `generate_audio.py` línea 12:

```python
VOICE = "alloy"  # Cambiar a: nova, shimmer, echo, fable, onyx
```

Luego regenera:
```bash
python generate_audio.py
```

### Ajustar Velocidad

Edita `generate_audio.py` línea 217:

```python
speed=1.0,  # Cambiar a 0.9 (más lento) o 1.1 (más rápido)
```

Rango válido: 0.25 - 4.0

### Modificar el Texto

Edita `generate_audio.py` en la sección `NARRATION_TEXTS` (línea 22).

Por ejemplo, para cambiar el hook:

```python
"act1_hook": """
¡Hola! Hoy aprenderás POO en Python.
Vamos a crear una API completa con Flask.
""",
```

---

## Troubleshooting

### "ERROR: No se encontró OPENAI_API_KEY"

**Problema:** La variable de entorno no está configurada.

**Solución:**
```bash
# Windows PowerShell
$env:OPENAI_API_KEY="sk-tu-key"

# macOS/Linux
export OPENAI_API_KEY="sk-tu-key"
```

Ejecuta en la MISMA terminal donde vas a correr el script.

### "openai.AuthenticationError: Incorrect API key"

**Problema:** API key incorrecta o inválida.

**Solución:**
1. Verifica que copiaste la key completa (empieza con `sk-`)
2. Genera una nueva key en: https://platform.openai.com/api-keys
3. Asegúrate de no tener espacios extra al pegarla

### "ModuleNotFoundError: No module named 'openai'"

**Problema:** Librería no instalada.

**Solución:**
```bash
pip install openai
```

O si tienes múltiples versiones de Python:
```bash
python3 -m pip install openai
```

### "RateLimitError: Rate limit exceeded"

**Problema:** Demasiadas peticiones muy rápido.

**Solución:**
- Espera 1 minuto y vuelve a intentar
- El script ya incluye manejo de este error

### "InsufficientQuotaError: You exceeded your current quota"

**Problema:** No tienes crédito en tu cuenta OpenAI.

**Solución:**
1. Ve a: https://platform.openai.com/account/billing
2. Agrega crédito ($5 mínimo)
3. El costo total es ~$0.10, así que $5 es más que suficiente

### "El audio no sincroniza con el video"

**Problema:** Duración del audio no coincide con los timings.

**Solución:**
Los audios generados por IA ya están optimizados para los timings del video. Si hay pequeñas diferencias:

1. Ajusta la velocidad en `generate_audio.py`:
   ```python
   speed=1.05,  # Ligeramente más rápido
   ```

2. O ajusta los timings en `src/data/audioTimings.ts`

### "La pronunciación es incorrecta"

**Problema:** La IA pronuncia mal algunas palabras técnicas.

**Solución:**
Modifica el texto en `generate_audio.py` para usar pronunciación fonética:

```python
# Mal pronunciado
"__init__"

# Mejor
"dunder init" o "doble guión bajo init"

# Mal pronunciado
"app.py"

# Mejor
"app punto py"
```

---

## Costos

### OpenAI TTS Pricing (2024)

- Modelo: `tts-1-hd` (alta calidad)
- Precio: $15.00 por 1 millón de caracteres
- Este proyecto: ~5,000 caracteres
- **Costo total: ~$0.075 USD** (menos de 8 centavos)

### Comparación con Alternativas

| Opción | Costo | Tiempo | Calidad |
|--------|-------|--------|---------|
| **OpenAI TTS** | $0.08 | 5 min | ⭐⭐⭐⭐⭐ |
| Google Cloud TTS | $0.06 | 10 min | ⭐⭐⭐⭐ |
| ElevenLabs | $5-10 | 5 min | ⭐⭐⭐⭐⭐ |
| Grabar tú mismo | Gratis | 2-4 hrs | Variable |
| Contratar locutor | $20-50 | 2-3 días | ⭐⭐⭐⭐⭐ |

---

## Ventajas de OpenAI TTS para Este Proyecto

✅ **Velocidad:** 5 minutos vs 2-4 horas grabando
✅ **Consistencia:** Mismo tono y energía en todos los clips
✅ **Re-generación:** Si cambias el texto, regeneras en segundos
✅ **Sin equipo:** No necesitas micrófono ni lugar silencioso
✅ **Profesional:** Calidad broadcast-ready
✅ **Económico:** Menos de 10 centavos por todo el proyecto

---

## Próximos Pasos

Una vez generados los audios:

1. ✅ Verifica que los 15 MP3 estén en `public/audio/`
2. ✅ Ejecuta `npm run dev` para preview
3. ✅ Navega el video frame por frame
4. ✅ Si algo no te gusta, modifica el texto y regenera
5. ✅ Render final: `npm run build`

---

## Alternativas Gratuitas (Menor Calidad)

Si no quieres pagar nada:

### Google Cloud TTS (Free Tier)
- 1 millón de caracteres gratis al mes
- Calidad aceptable
- Requiere configuración de GCP

### gTTS (Google Translate TTS) - Totalmente Gratis
- Voz robótica pero funcional
- Sin límites
- Calidad básica

Para usar gTTS en lugar de OpenAI:

```bash
pip install gtts

# Modificar generate_audio.py para usar gTTS
# (puedo crear este script si lo necesitas)
```

---

## Soporte

Si tienes problemas:

1. Revisa esta guía completa
2. Verifica troubleshooting
3. Consulta docs de OpenAI: https://platform.openai.com/docs/guides/text-to-speech

¡Tu video educativo con voz profesional está a solo 10 minutos de distancia! 🎙️✨
