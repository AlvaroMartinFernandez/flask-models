# Video Educativo: POO en Python + Flask con Remotion

Video de 5 minutos que enseña Programación Orientada a Objetos en Python para crear APIs con Flask.

## Características

- **Duración:** 5 minutos exactos (300 segundos)
- **Resolución:** 1920x1080 (Full HD)
- **FPS:** 30
- **Formato:** H.264 (MP4)

## Contenido del Video

### Acto 1: Fundamentos POO (0:00 - 2:00)
- Hook y contexto
- ¿Qué es una Clase?
- Los 4 pilares: Encapsulación, Herencia, Polimorfismo, Abstracción

### Acto 2: CRUD Flask con POO (2:00 - 4:45)
- Clase Usuarios (gestión de datos)
- Integración con Flask
- Endpoints GET, POST, PUT, DELETE
- Demo en vivo

### Acto 3: Conclusión (4:45 - 5:00)
- Resumen visual
- Call to action

## Requisitos

- Node.js 18 o superior
- npm o yarn
- Python 3.8+ (solo para generar audio con IA)

## Instalación

1. Instalar dependencias:

```bash
npm install
```

## 🎙️ Generar Audio con IA (Recomendado)

El video incluye narración en español. Puedes generar TODOS los audios automáticamente usando OpenAI TTS:

### Opción 1: Audio con IA (10 minutos, ~$0.10 USD) ⭐ Recomendado

```bash
# 1. Instalar librería OpenAI
pip install openai

# 2. Configurar API key (obtener en https://platform.openai.com/api-keys)
# Windows PowerShell:
$env:OPENAI_API_KEY="sk-tu-api-key"
# macOS/Linux:
export OPENAI_API_KEY="sk-tu-api-key"

# 3. Generar todos los audios (15 clips)
python generate_audio.py
```

**Resultado:** 15 archivos MP3 con voz profesional en `public/audio/`

📖 **Guía completa:** [AUDIO_AI_GUIDE.md](AUDIO_AI_GUIDE.md)

### Opción 2: Grabar tu propia voz (2-4 horas)

📖 **Guía completa:** [AUDIO_GUIDE.md](AUDIO_GUIDE.md)
📖 **Guía rápida:** [QUICK_START_AUDIO.md](QUICK_START_AUDIO.md)

### Opción 3: Sin audio

El video funciona perfectamente sin narración. Los visuales son suficientemente claros.

## Uso

### Preview en desarrollo

Abre un preview interactivo en el navegador donde puedes ver el video frame por frame:

```bash
npm run dev
```

Esto abrirá `http://localhost:3000` donde podrás:
- Ver el video en tiempo real
- Navegar frame por frame
- Ajustar configuraciones
- Probar diferentes secciones

### Render del video completo

Para generar el video final en formato MP4:

```bash
npm run build
```

El video se generará en: `out/video.mp4`

### Render de secciones específicas (para testing)

Si quieres renderizar solo los primeros 10 segundos para probar:

```bash
npx remotion render src/index.ts Video out/test.mp4 --frames=0-300
```

### Verificar duración

Para confirmar que el video dura exactamente 5 minutos:

```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 out/video.mp4
```

Debería mostrar: `300.000000`

## Estructura del Proyecto

```
poo-flask-video/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── CodeBlock.tsx    # Código con syntax highlighting
│   │   ├── Terminal.tsx     # Terminal simulado
│   │   ├── JSONViewer.tsx   # Visualizador JSON
│   │   ├── SplitScreen.tsx  # Pantalla dividida
│   │   ├── AnimatedTitle.tsx
│   │   └── AnimatedList.tsx
│   │
│   ├── scenes/              # Escenas principales
│   │   ├── Act1_Introduction.tsx
│   │   ├── Act2_Practice.tsx
│   │   └── Act3_Conclusion.tsx
│   │
│   ├── data/                # Datos y configuración
│   │   ├── codeSnippets.ts  # Todos los códigos Python
│   │   ├── userData.ts      # Datos de usuarios
│   │   └── timings.ts       # Configuración de tiempos
│   │
│   ├── styles/              # Estilos y tema
│   │   ├── colors.ts
│   │   └── theme.ts
│   │
│   ├── Video.tsx            # Video principal
│   ├── Root.tsx             # Composición raíz
│   └── index.ts             # Punto de entrada
│
├── package.json
├── remotion.config.ts
├── tsconfig.json
└── README.md
```

## Personalización

### Cambiar colores

Edita `src/styles/colors.ts` para modificar la paleta de colores.

### Ajustar timings

Modifica `src/data/timings.ts` para cambiar la duración de cada segmento.

### Modificar código

Actualiza `src/data/codeSnippets.ts` para cambiar los ejemplos de código Python.

### Cambiar contenido

- **Act 1:** Edita `src/scenes/Act1_Introduction.tsx`
- **Act 2:** Edita `src/scenes/Act2_Practice.tsx`
- **Act 3:** Edita `src/scenes/Act3_Conclusion.tsx`

## Optimización

### Calidad de render

Edita `remotion.config.ts`:

```typescript
Config.setCrf(18); // Menor = mejor calidad (18 recomendado)
```

### Velocidad de animaciones

Ajusta los `durationInFrames` en cada componente o escena.

### Tamaño del archivo

- CRF 18: ~200-300 MB (alta calidad)
- CRF 23: ~100-150 MB (calidad media)
- CRF 28: ~50-75 MB (calidad baja)

## Problemas Comunes

### Error: "Cannot find module 'remotion'"

Asegúrate de haber instalado las dependencias:

```bash
npm install
```

### El video se ve cortado

Verifica que la resolución en `src/data/timings.ts` sea 1920x1080.

### Las animaciones van muy rápido/lento

Ajusta los valores de `durationInFrames` en `src/data/timings.ts`.

### Error de memoria al renderizar

Reduce la concurrencia en `remotion.config.ts`:

```typescript
Config.setConcurrency(2); // En lugar de 4
```

## Recursos

- [Documentación de Remotion](https://www.remotion.dev/docs/)
- [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer)
- [Plan completo del proyecto](../../../.claude/plans/keen-plotting-patterson.md)

## Licencia

Este proyecto es parte del curso de FullStack y está disponible para uso educativo.

## Créditos

Basado en el contenido de:
- `summaries/POO/poo.md` - Teoría de POO
- `src/entities/usuarios.py` - Clase de ejemplo
- `src/app.py` - Implementación Flask

---

Creado con [Remotion](https://www.remotion.dev/) 🎥
