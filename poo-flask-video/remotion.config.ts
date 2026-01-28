import { Config } from '@remotion/cli/config';

// Configuración de video
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(4);

// Configuración de codec
Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
Config.setCrf(18); // Calidad alta (0-51, menor = mejor calidad)

// Configuración de output
Config.setOutputLocation('out/video.mp4');
