#!/usr/bin/env python3
"""
Script para generar audio con ElevenLabs TTS
Genera todos los clips de narracion para el video SQLAlchemy CRUD Actions

Uso:
    pip install elevenlabs
    $env:ELEVENLABS_API_KEY='tu-api-key'   (PowerShell)
    export ELEVENLABS_API_KEY='tu-api-key'  (Linux/Mac)
    python generate_audio_elevenlabs.py
"""

import os
import sys
import time
from pathlib import Path

# Cargar .env si existe
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Configuracion
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
OUTPUT_DIR = Path("public/audio")
VOICE = "pNInz6obpgDQGcFmaJgB"  # Adam - Dominant, Firm
MODEL = "eleven_multilingual_v2"  # Soporte para espanol

# Crear directorio si no existe
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Textos de narracion para cada segmento (13 segmentos)
# Escritos de forma didactica para principiantes aprendiendo CRUD con SQLAlchemy
NARRATION_TEXTS = {
    # ============================================
    # ACTO 1: Intro y Estructura (3 segmentos)
    # ============================================
    "intro": """
Bienvenidos a este video sobre endpoints CRUD con SQLAlchemy en Flask.
Si estas aprendiendo a crear APIs, este es uno de los temas mas importantes.
CRUD significa Create, Read, Update y Delete,
que son las cuatro operaciones basicas para manejar datos.
Create usa el metodo HTTP POST para crear nuevos registros.
Read usa GET para consultar datos.
Update usa PUT para modificar registros existentes.
Y Delete usa DELETE para eliminar.
En este video vamos a construir todos estos endpoints paso a paso,
usando un modelo de Usuario como ejemplo.
Al final tendras 7 rutas funcionando que puedes usar como base para cualquier proyecto.
""",

    "estructura": """
Nuestro proyecto es muy simple. Todo va en dos archivos.
El primero es models punto py.
Aqui importamos Mapped, mapped_column y relationship de sqlalchemy punto orm,
y tambien String de sqlalchemy.
Creamos db igual SQLAlchemy parentesis,
y definimos el modelo User usando la sintaxis moderna mapped.
Cada columna se declara con su tipo Mapped y mapped_column.
id es Mapped int con mapped_column primary_key igual True.
email es Mapped str con mapped_column, String 120 y unique igual True.
username es Mapped str con mapped_column, String 80 y unique igual True.
password es Mapped str con mapped_column, String 256.
Y is_active es Mapped bool con mapped_column y default True.
Con Mapped str la columna ya es obligatoria, no necesitamos nullable igual False.
Las relaciones tambien usan Mapped.
profile es Mapped ProfileInfo con relationship uselist False, que es uno a uno.
Y orders es Mapped lista de Order con relationship y cascade delete orphan, que es uno a muchos.
El segundo archivo es app punto py.
Aqui configuramos Flask, conectamos SQLAlchemy con db punto init_app,
y escribimos todos los endpoints directamente usando decoradores app punto route.
No usamos servicios ni controladores separados, todo va directo en app punto py.
""",

    "setup": """
Para empezar, necesitamos instalar dos paquetes.
flask guion sqlalchemy para conectar SQLAlchemy con Flask,
y flask guion migrate para manejar las migraciones de base de datos.
En models punto py creamos la instancia de db con SQLAlchemy parentesis.
En app punto py, lo primero es configurar la URL de la base de datos.
Usamos os punto environ punto get para leer una variable de entorno.
Si no existe, usamos SQLite como base de datos por defecto, ideal para desarrollo.
Luego llamamos a db punto init_app con la app, que conecta todo.
Y creamos el objeto migrate para las migraciones.
Los comandos de migracion son tres.
flask db init para inicializar.
flask db migrate para crear una migracion.
Y flask db upgrade para aplicar los cambios a la base de datos.
Con esto ya tenemos todo listo para crear endpoints.
""",

    # ============================================
    # ACTO 2: READ - Consultar Datos (3 segmentos)
    # ============================================
    "get-all": """
Empecemos con la operacion mas simple, obtener todos los usuarios.
Creamos una ruta GET en barra users.
Dentro del endpoint, llamamos a User punto query punto all parentesis,
que nos devuelve una lista con todos los registros de la tabla users.
Pero no podemos devolver esa lista directamente como JSON.
Los objetos de SQLAlchemy no son serializables.
Por eso usamos una list comprehension.
Para cada usuario u en la lista, llamamos a u punto serialize parentesis,
que convierte el objeto a un diccionario de Python.
Luego envolvemos todo con jsonify y devolvemos status 200.
SQLAlchemy tiene tres formas principales de consultar datos.
query punto all trae todos los registros.
query punto get busca por clave primaria, o sea por ID.
Y query punto filter_by busca por cualquier campo.
""",

    "get-by-id": """
Ahora veamos como obtener un solo usuario por su ID.
Creamos una ruta GET en barra users barra id,
donde id es un parametro dinamico de tipo entero.
Dentro del endpoint, usamos User punto query punto get pasando el user_id.
Este metodo busca directamente por la clave primaria.
Si el usuario existe, devuelve el objeto User.
Pero si no existe, devuelve None.
Y aqui viene algo importante.
Siempre debes verificar si el resultado es None.
Si lo es, llamamos a abort con codigo 404 y un mensaje descriptivo.
abort detiene la ejecucion y devuelve el error HTTP automaticamente.
Si el usuario si existe, llamamos a serialize y devolvemos con jsonify y status 200.
El metodo serialize convierte el objeto a un diccionario,
incluyendo id, email, username y is_active.
Nunca incluyas la contrasena en el serialize, eso seria un riesgo de seguridad.
""",

    "filter-by": """
query punto filter_by es uno de los metodos mas utiles de SQLAlchemy.
Te permite buscar por cualquier campo, no solo por ID.
Por ejemplo, buscar por email con
filter_by parentesis email igual algo punto first.
first devuelve el primer resultado, o None si no hay coincidencias.
Con punto all obtienes una lista completa.
Y punto count te da la cantidad de resultados.
Donde mas usamos filter_by es para verificar duplicados.
Antes de crear un usuario, verificamos si ya existe otro con el mismo email.
Si devuelve algo, respondemos con abort 409 Conflict.
Lo mismo con el username.
Esto evita errores por campos unicos duplicados.
""",

    # ============================================
    # ACTO 3: CREATE - Crear Datos (3 segmentos)
    # ============================================
    "post-basico": """
Ahora vamos con crear. Usamos POST en barra users.
Obtenemos los datos del body con request punto get_json.
Si el body esta vacio, abort 400.
Validamos campos obligatorios y verificamos duplicados con filter_by.
Si todo esta bien, creamos una nueva instancia de User
pasando email, username, password y is_active.
El flujo de la sesion de SQLAlchemy tiene tres pasos.
Primero, creamos el objeto con User parentesis.
Segundo, lo agregamos con db punto session punto add.
Esto solo lo marca para guardar, no escribe en la base de datos.
Tercero, confirmamos con db punto session punto commit.
Aqui es cuando realmente se guarda.
Si algo falla, db punto session punto rollback revierte todo.
Devolvemos el usuario serializado con status 201 Created.
""",

    "validaciones": """
Las validaciones son fundamentales antes de crear.
Hay dos tipos que siempre debes hacer.
Primero, validar campos obligatorios.
Si el body esta vacio, abort 400.
Definimos una lista de campos requeridos: email, username y password.
Para cada campo verificamos si existe y no esta vacio.
Si falta alguno, abort 400 diciendo cual campo es obligatorio.
Segundo, verificar duplicados.
Usamos filter_by para buscar si ya existe un usuario con ese email.
Si devuelve algo, abort 409 diciendo ya existe.
Hacemos lo mismo con username.
Los tres codigos de error mas comunes son:
400 Bad Request para datos invalidos.
409 Conflict para duplicados.
Y 201 Created cuando todo sale bien.
""",

    "post-relacion": """
Un caso avanzado es crear usuario con perfil en una sola peticion.
El JSON incluye datos del usuario y un objeto profile
con first_name, last_name y phone.
Primero creamos el objeto User con los datos basicos.
Luego extraemos el perfil con body punto get profile
y creamos una instancia de ProfileInfo.
Simplemente asignamos new_user punto profile igual a new_profile.
Esto conecta ambos objetos usando la relacion del modelo.
Con un solo db punto session punto add y un solo commit,
SQLAlchemy guarda ambos registros y establece la clave foranea.
No necesitas add del perfil por separado.
SQLAlchemy lo detecta y lo inserta, todo en una sola transaccion.
""",

    # ============================================
    # ACTO 4: UPDATE, DELETE y Cierre (4 segmentos)
    # ============================================
    "put-update": """
Para actualizar usamos PUT en barra users barra id.
Buscamos el usuario por ID con query punto get.
Si no existe, abort 404.
Obtenemos el body y solo actualizamos los campos que vienen.
Si el email cambia, verificamos con filter_by que no exista otro con ese email.
Si ya existe, abort 409 Conflict.
Si no, actualizamos user punto email con el nuevo valor.
Lo mismo con username, verificando duplicados antes de cambiar.
Para password, actualizamos sin verificar duplicados.
Al final, db punto session punto commit.
No necesitamos add porque el objeto ya esta en la sesion.
SQLAlchemy detecta los cambios automaticamente con el commit.
Devolvemos el usuario actualizado con status 200.
""",

    "delete": """
Eliminar un usuario es la operacion mas simple.
La ruta es DELETE en barra users barra id.
Buscamos el usuario por ID con query punto get.
Si no existe, abort 404.
Si existe, llamamos a db punto session punto delete pasando el usuario,
y luego db punto session punto commit.
Aqui es donde el cascade que definimos en el modelo hace su trabajo.
Cuando configuramos la relacion orders con cascade igual all, delete-orphan,
le dijimos a SQLAlchemy que al borrar un usuario,
borre automaticamente todos sus pedidos.
Lo mismo pasa con el perfil gracias a la relacion profile.
Entonces, con una sola llamada a delete, se eliminan tres cosas.
El usuario, su perfil, y todas sus ordenes.
Todo en una sola transaccion, de forma segura y consistente.
Devolvemos un mensaje de confirmacion con status 200.
""",

    "error-handling": """
Para manejar errores en Flask usamos la funcion abort.
abort detiene la ejecucion del endpoint inmediatamente
y devuelve una respuesta HTTP con el codigo de error que le pases.
Los codigos que mas usamos son cuatro.
400 Bad Request, para cuando los datos enviados son invalidos
o falta un campo obligatorio.
404 Not Found, cuando el recurso que se busca no existe,
por ejemplo un usuario con un ID que no esta en la base de datos.
409 Conflict, cuando hay un duplicado,
como intentar crear un usuario con un email que ya existe.
Y 500 Internal Server Error, para errores inesperados del servidor.
Cada abort puede incluir un mensaje descriptivo
que ayuda al cliente a entender que salio mal.
""",

    "conclusion": """
Ya conoces el CRUD completo con SQLAlchemy en Flask.
GET para leer datos, con query punto all y query punto get.
POST para crear, con session punto add y commit.
PUT para actualizar, modificando los campos y haciendo commit.
DELETE para eliminar, con session punto delete y commit.
Ademas, aprendiste a usar filter_by para buscar por cualquier campo
y verificar duplicados antes de crear o actualizar.
Y abort para manejar errores HTTP de forma limpia.
En total construimos 7 endpoints funcionales
que puedes usar como base para cualquier API REST.
Te recomiendo que practiques creandolos tu mismo desde cero.
Gracias por ver el video.
""",
}


def generate_audio(client, text: str, output_file: str, voice: str = VOICE):
    """Genera un archivo de audio usando ElevenLabs TTS"""
    print(f"Generando: {output_file}")

    try:
        audio = client.text_to_speech.convert(
            text=text.strip(),
            voice_id=voice,
            model_id=MODEL,
            output_format="mp3_44100_128",
        )

        output_path = OUTPUT_DIR / output_file
        with open(output_path, "wb") as f:
            for chunk in audio:
                f.write(chunk)

        print(f"[OK] Generado: {output_file}")

    except Exception as e:
        print(f"[ERROR] Error generando {output_file}: {e}")
        raise


def get_voice_id(client, voice_name: str) -> str:
    """Busca el voice_id por nombre de voz"""
    voices = client.voices.get_all()
    for voice in voices.voices:
        if voice.name.lower() == voice_name.lower():
            return voice.voice_id
    print(f"[WARN] Voz '{voice_name}' no encontrada. Usando como voice_id directo.")
    return voice_name


def main():
    """Genera todos los archivos de audio"""

    # Verificar API key
    if not ELEVENLABS_API_KEY:
        print("ERROR: No se encontro ELEVENLABS_API_KEY")
        print("\nConfigura tu API key:")
        print("  Windows (PowerShell): $env:ELEVENLABS_API_KEY='tu-api-key'")
        print("  macOS/Linux: export ELEVENLABS_API_KEY='tu-api-key'")
        print("\nObtener API key: https://elevenlabs.io/")
        sys.exit(1)

    try:
        from elevenlabs import ElevenLabs
    except ImportError:
        print("ERROR: elevenlabs no esta instalado")
        print("\nInstala con: pip install elevenlabs")
        sys.exit(1)

    client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

    # Resolver voice_id
    voice_id = get_voice_id(client, VOICE)

    print("=" * 60)
    print("Generador de Audio - SQLAlchemy CRUD Actions")
    print("=" * 60)
    print(f"Voz: {VOICE} ({voice_id})")
    print(f"Modelo: {MODEL}")
    print(f"Directorio de salida: {OUTPUT_DIR}")
    print(f"Total de clips: {len(NARRATION_TEXTS)}")
    print("=" * 60)
    print()

    items = list(NARRATION_TEXTS.items())
    for filename, text in reversed(items):
        output_file = f"{filename}.mp3"
        output_path = OUTPUT_DIR / output_file
        if output_path.exists():
            print(f"[SKIP] {output_file} ya existe")
            continue
        print(f"Generando: ", end="")
        generate_audio(client, text, output_file, voice_id)
        print(f"         Esperando 15s antes del siguiente...")
        time.sleep(15)

    print()
    print("=" * 60)
    print("[OK] Todos los archivos generados exitosamente!")
    print("=" * 60)
    print()
    print("Archivos creados en:", OUTPUT_DIR.absolute())
    print()
    print("Proximos pasos:")
    print("1. Obtener duraciones: npx ts-node scripts/get-audio-durations.ts")
    print("2. Actualizar timings con las duraciones reales")
    print("3. Preview del video: npm start")
    print("4. Render final: npm run build")


if __name__ == "__main__":
    main()
