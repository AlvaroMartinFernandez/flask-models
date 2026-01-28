/**
 * Script para generar audios con ElevenLabs
 *
 * Uso:
 * 1. Instalar dependencias: npm install elevenlabs dotenv
 * 2. Crear archivo .env con ELEVENLABS_API_KEY=tu-api-key
 * 3. Ejecutar: npx ts-node scripts/generate-audio.ts
 */

import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuracion
const CONFIG = {
  apiKey: process.env.ELEVENLABS_API_KEY || '',
  // Voces recomendadas para español:
  // - "Antoni" - Voz masculina clara
  // - "Arnold" - Voz masculina profunda
  // - "Bella" - Voz femenina
  // - "Rachel" - Voz femenina clara
  voice: 'Antoni', // Puedes cambiar la voz aqui
  model: 'eleven_multilingual_v2', // Soporta español
  outputDir: path.join(__dirname, '../public/audio'),
};

// Script de narración con pausas naturales y acentos correctos para pronunciación
// Video de 6 minutos (360 segundos) - 17 segmentos de audio
// Pausas largas con "..." entre oraciones para que el narrador respire
const narrationScript = [
  // ============================================
  // ACTO 1: Fundamentos de POO (0-180s)
  // ============================================
  {
    id: 'intro',
    text: 'Bienvenidos... a Programación Orientada a Objetos en Python... En este video, aprenderemos los conceptos fundamentales que todo programador debe conocer... Veremos clases y objetos... el constructor init... los métodos mágicos de Python... herencia... encapsulación... y polimorfismo... Al final, aplicaremos todo esto en un ejemplo práctico con Flask.',
  },
  {
    id: 'clases-objetos',
    text: 'Comencemos con lo más básico... Una clase, es como un plano o molde... que define cómo serán los objetos que creemos... Piensa en la clase como los planos de una casa... El objeto, es una instancia concreta de esa clase... Es decir, la casa ya construida siguiendo esos planos... Aquí tenemos la clase Perro... Dentro de ella, definimos el constructor init... que recibe el nombre del perro... Y también un método llamado ladrar... que imprime un mensaje en pantalla.',
  },
  {
    id: 'init-detallado',
    text: 'Ahora profundicemos en el constructor... El método init, escrito con doble guión bajo al inicio y al final... es el constructor de la clase... Este método especial, se ejecuta automáticamente cada vez que creamos un nuevo objeto... El primer parámetro siempre es self... que es una referencia a la instancia actual del objeto... Dentro del init, inicializamos los atributos... como self punto nombre, y self punto edad... Estos atributos quedan guardados en el objeto... Cuando escribimos Perro de Fido y tres... Python internamente llama al init... pasando el objeto recién creado como self... y Fido y tres como los argumentos nombre y edad.',
  },
  {
    id: 'metodos-magicos',
    text: 'Python tiene métodos especiales llamados métodos mágicos... También conocidos como dunder methods, por el doble guión bajo... Veamos los más importantes... El método dict, con doble guión bajo... devuelve todos los atributos del objeto como un diccionario... Esto es muy útil para convertir objetos a JSON... El método str... define cómo se muestra el objeto cuando usamos print... Por ejemplo, podemos hacer que imprima el nombre y precio de un producto... El método repr... es similar, pero está pensado para desarrolladores... Muestra una representación técnica útil para debugging... También existen otros como len para obtener la longitud... eq para comparar si dos objetos son iguales... y add para definir qué pasa cuando sumamos dos objetos.',
  },
  {
    id: 'herencia-basica',
    text: 'Ahora veamos la herencia... La herencia es un mecanismo que permite crear nuevas clases... basadas en clases que ya existen... La clase hija, hereda todos los atributos y métodos de la clase padre... En este ejemplo, tenemos la clase Animal... que tiene un método llamado comer... Luego creamos la clase Perro, que hereda de Animal... Esto se indica poniendo Animal entre paréntesis... Perro hereda el método comer automáticamente... Y además, puede tener sus propios métodos, como ladrar... Cuando creamos un objeto Perro... podemos llamar tanto a comer, como a ladrar.',
  },
  {
    id: 'herencia-super',
    text: 'A veces, la clase hija necesita inicializar atributos del padre... Para esto usamos la función super... Veamos un ejemplo... La clase Vehículo tiene un constructor... que recibe marca y modelo... La clase Coche hereda de Vehículo... pero además tiene su propio atributo, puertas... En el constructor de Coche... primero llamamos a super punto init... Esto ejecuta el constructor del padre... inicializando marca y modelo... Y luego, agregamos el atributo puertas... Así, el Coche tiene los tres atributos... marca y modelo del padre... y puertas propio.',
  },
  {
    id: 'encapsulacion',
    text: 'La encapsulación es otro pilar fundamental... Consiste en ocultar los detalles internos de un objeto... y exponer solo lo que es necesario... En Python, usamos el guión bajo para indicar que un atributo es protegido... En este ejemplo de Cuenta Bancaria... el saldo tiene un guión bajo al inicio... Esto indica que no deberíamos acceder a él directamente... En su lugar, usamos métodos públicos... como depositar, para agregar dinero... y obtener saldo, para consultar el balance... Así protegemos los datos sensibles... y controlamos cómo se accede a ellos.',
  },
  {
    id: 'polimorfismo',
    text: 'El polimorfismo permite que diferentes clases... tengan métodos con el mismo nombre... pero con comportamientos distintos... Veamos este ejemplo... Tenemos las clases Gato y Perro... Ambas tienen un método llamado hablar... Pero cada una lo implementa de forma diferente... El Gato dice miau... y el Perro dice guau... Lo interesante es que podemos tener una lista con ambos animales... y llamar al método hablar en un bucle... Cada animal responderá según su propia implementación... Michi, el gato, dice miau... y Fido, el perro, dice guau... Este es el poder del polimorfismo.',
  },
  {
    id: 'abstraccion',
    text: 'La abstracción nos permite simplificar lo complejo... enfocándonos solo en lo esencial... Las ventajas de usar POO son muchas... Reutilización de código... mejor organización... modularidad... y escalabilidad... Ahora, veamos todo esto aplicado en un ejemplo real.',
  },

  // ============================================
  // ACTO 2: Clase Usuarios y CRUD (180-276s)
  // ============================================
  {
    id: 'clase-usuarios-intro',
    text: 'Vamos a aplicar todos estos conceptos... en un ejemplo práctico y real... Crearemos una clase llamada Usuarios... que implementa las operaciones CRUD... CRUD significa Create, Read, Update y Delete... Es decir, crear, leer, actualizar y eliminar... Esta clase será el corazón de una API REST... Veamos cómo se estructura.',
  },
  {
    id: 'init-usuarios',
    text: 'El constructor de nuestra clase Usuarios es simple... pero muy importante... Usamos el método init... para inicializar una lista vacía llamada miembros... Esta lista es donde guardaremos todos los usuarios de nuestra aplicación... Cada vez que creamos una instancia de Usuarios... se crea una nueva lista vacía... Recuerda que self punto miembros... crea un atributo de instancia... que pertenece a ese objeto específico.',
  },
  {
    id: 'get-all',
    text: 'El método get all members es el más sencillo... Simplemente retorna la lista completa de miembros... con todos los usuarios que tenemos guardados... Este método corresponde a la operación Read del CRUD... y se usa con peticiones GET en la API... Cuando un cliente solicita todos los usuarios... este método devuelve la lista entera.',
  },
  {
    id: 'get-one',
    text: 'El método get one member busca un usuario específico... Lo hace usando el ID que le pasamos como parámetro... Internamente usa la función next de Python... con una expresión generadora... Recorre la lista buscando un usuario cuyo ID coincida... Si lo encuentra, retorna ese usuario... Si no lo encuentra, retorna None... Este método también es parte de la operación Read.',
  },
  {
    id: 'add-member',
    text: 'El método add member agrega un nuevo usuario... Recibe los datos del usuario como parámetro... y usa el método append de las listas... para añadirlo al final de nuestra lista de miembros... Este método corresponde a la operación Create del CRUD... y se usa con peticiones POST en la API... Cada vez que queremos crear un nuevo usuario... llamamos a este método.',
  },
  {
    id: 'edit-delete',
    text: 'Nos quedan dos métodos importantes... Edit member actualiza un usuario existente... Primero busca el usuario por su índice... y luego modifica sus datos con los nuevos valores... Corresponde a la operación Update, y usa peticiones PUT... Delete member elimina un usuario de la lista... Usa el método pop para quitarlo por su índice... Corresponde a la operación Delete... y usa peticiones DELETE en la API.',
  },
  {
    id: 'flask-intro',
    text: 'Ahora conectemos nuestra clase con Flask.',
  },

  // ============================================
  // ACTO 3: Endpoints Flask y Conclusión (276-360s)
  // ============================================
  {
    id: 'flask-demo',
    text: 'Flask es un framework ligero para crear APIs en Python... Es muy popular por su simplicidad... Cada método de nuestra clase Usuarios... se conectará con un endpoint de la API... Primero, importamos Flask y nuestra clase Usuarios... Luego creamos una instancia de Flask... y una instancia de nuestra clase... Finalmente, añadimos algunos usuarios de ejemplo... para poder probar nuestra API.',
  },
  {
    id: 'get-endpoints',
    text: 'Los endpoints GET sirven para obtener datos... Usamos el decorador app punto route... para definir la URL del endpoint... El primer endpoint es barra users... que llama a get all members... y retorna todos los usuarios como JSON... El segundo endpoint es barra users barra id... donde id es un parámetro variable... Este endpoint llama a get one member... y retorna un usuario específico... Si el usuario no existe, retorna un error 404.',
  },
  {
    id: 'post-endpoint',
    text: 'El endpoint POST sirve para crear nuevos usuarios... Recibe los datos en formato JSON... usando request punto get json... Primero validamos que los datos sean correctos... que incluyan nombre e email... Luego generamos un nuevo ID automáticamente... Creamos un diccionario con los datos del usuario... y llamamos a add member para guardarlo... Finalmente retornamos el usuario creado... con el código de estado 201, que significa creado.',
  },
  {
    id: 'put-delete-endpoints',
    text: 'El endpoint PUT actualiza usuarios existentes... Recibe el ID en la URL... y los nuevos datos en el cuerpo de la petición... Busca el usuario, actualiza sus campos... y retorna el usuario modificado... El endpoint DELETE elimina usuarios... También recibe el ID en la URL... Busca el usuario y lo elimina de la lista... Retorna un mensaje confirmando la eliminación... Ambos endpoints manejan el caso de que el usuario no exista.',
  },
  {
    id: 'conclusion',
    text: 'Repasemos los conceptos clave... Una clase es un molde para crear objetos... El constructor init inicializa los atributos... Self referencia la instancia actual... Los métodos mágicos personalizan el comportamiento... Y los métodos normales operan sobre los datos... Practica creando tus propias clases... y construye aplicaciones reales como esta API... Gracias por ver el video.',
  },
];

// Mapa de nombres de voz a IDs (voces predeterminadas de ElevenLabs)
const VOICE_IDS: Record<string, string> = {
  'Antoni': 'ErXwobaYiN019PkySvjV',
  'Arnold': 'VR6AewLTigWG4xSOukaG',
  'Bella': 'EXAVITQu4vr4xnSDxMaL',
  'Rachel': '21m00Tcm4TlvDq8ikWAM',
  'Domi': 'AZnzlk1XvdvUeBnXmlld',
  'Elli': 'MF3mGyEYCl7XYWbV9V6O',
};

async function generateAudio(
  client: ElevenLabsClient,
  text: string,
  outputPath: string
): Promise<void> {
  console.log(`  Generando audio...`);

  const voiceId = VOICE_IDS[CONFIG.voice] || CONFIG.voice;

  const response = await client.textToSpeech.convert(voiceId, {
    text: text,
    modelId: CONFIG.model,
  });

  // Convertir ReadableStream a Buffer
  const reader = response.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const buffer = Buffer.concat(chunks);

  // Guardar archivo
  fs.writeFileSync(outputPath, buffer);
  console.log(`  Guardado: ${outputPath}`);
}

async function main() {
  // Verificar API key
  if (!CONFIG.apiKey) {
    console.error('Error: ELEVENLABS_API_KEY no configurada');
    console.log('\nPasos para configurar:');
    console.log('1. Crea una cuenta en https://elevenlabs.io');
    console.log('2. Ve a Profile Settings > API Keys');
    console.log('3. Copia tu API key');
    console.log('4. Crea un archivo .env en la raiz del proyecto:');
    console.log('   ELEVENLABS_API_KEY=tu-api-key-aqui');
    process.exit(1);
  }

  // Crear cliente
  const client = new ElevenLabsClient({
    apiKey: CONFIG.apiKey,
  });

  // Crear directorio de salida
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  // Calcular estadisticas
  const totalChars = narrationScript.reduce((acc, s) => acc + s.text.length, 0);
  console.log('\n=== Generador de Audio con ElevenLabs ===\n');
  console.log(`Total de segmentos: ${narrationScript.length}`);
  console.log(`Total de caracteres: ${totalChars}`);
  console.log(`Voz seleccionada: ${CONFIG.voice}`);
  console.log(`Modelo: ${CONFIG.model}`);
  console.log(`Directorio de salida: ${CONFIG.outputDir}\n`);

  // Verificar si estamos dentro del free tier
  if (totalChars > 10000) {
    console.warn(`ADVERTENCIA: ${totalChars} caracteres excede el free tier de 10,000 chars/mes`);
  } else {
    console.log(`Dentro del free tier (${totalChars}/10,000 chars)\n`);
  }

  // Generar audios
  console.log('Generando audios...\n');

  for (let i = 0; i < narrationScript.length; i++) {
    const segment = narrationScript[i];
    const outputPath = path.join(CONFIG.outputDir, `${segment.id}.mp3`);

    // Verificar si ya existe
    if (fs.existsSync(outputPath)) {
      console.log(`[${i + 1}/${narrationScript.length}] ${segment.id} - Ya existe, saltando...`);
      continue;
    }

    console.log(`[${i + 1}/${narrationScript.length}] ${segment.id}`);
    console.log(`  Texto: "${segment.text.substring(0, 50)}..."`);
    console.log(`  Caracteres: ${segment.text.length}`);

    try {
      await generateAudio(client, segment.text, outputPath);

      // Esperar un poco entre requests para no exceder rate limits
      if (i < narrationScript.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`  Error generando ${segment.id}:`, error);
    }
  }

  console.log('\n=== Generacion completada ===');
  console.log(`\nArchivos guardados en: ${CONFIG.outputDir}`);
  console.log('\nSiguientes pasos:');
  console.log('1. Verifica los audios generados');
  console.log('2. Ejecuta: npm run dev para previsualizar el video');
}

// Ejecutar
main().catch(console.error);
