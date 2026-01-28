# SQLAlchemy Models - Video Educativo

Video de 8 minutos explicando SQLAlchemy Models en Flask, creado con [Remotion](https://www.remotion.dev/).

## Contenido del Video

1. **Acto 1: Fundamentos (0-2 min)**
   - Que es un ORM
   - Que es SQLAlchemy
   - Como inicializar SQLAlchemy en Flask

2. **Acto 2: Modelos y Columnas (2-3:20 min)**
   - Sintaxis moderna (SQLAlchemy 2.0+)
   - Tipos de columnas
   - Opciones de columnas

3. **Acto 3: Relaciones (3:20-6 min)**
   - Relacion 1:1 (User - ProfileInfo)
   - Relacion 1:N (User - Orders)
   - Relacion N:N con db.Table (Articles - Tags)
   - Relacion N:N con clase modelo (Order - OrderItem - Article)
   - Opciones ON DELETE

4. **Acto 4: Serializacion (6-8 min)**
   - Metodo __repr__
   - Metodo serialize
   - Serializacion con relaciones
   - Conclusion y resumen

## Instalacion

```bash
npm install
```

## Comandos

```bash
# Previsualizar el video
npm start

# Renderizar el video
npm run build

# Actualizar Remotion
npm run upgrade
```

## Estructura del Proyecto

```
sqlalchemy-video/
├── public/
│   └── audio/           # Archivos de audio de narracion
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── data/            # Datos (timings, narration, snippets)
│   ├── scenes/          # Escenas del video (Acts)
│   ├── styles/          # Tema y colores
│   ├── Video.tsx        # Composicion principal
│   ├── Root.tsx         # Registro de composiciones
│   └── index.ts         # Entry point
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

## Generar Audio

Los textos de narracion estan en `src/data/narrationScript.ts`. Usa un servicio de TTS para generar los archivos MP3 y colocalos en `public/audio/`.

Servicios recomendados:
- [ElevenLabs](https://elevenlabs.io/)
- [Amazon Polly](https://aws.amazon.com/polly/)
- [Google Cloud TTS](https://cloud.google.com/text-to-speech)

## Basado en

- Documento: `summaries/SQL-Alchemy-models.md`
- Modelos de ejemplo: `src/models.py`
