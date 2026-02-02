#!/usr/bin/env python3
"""
Script para generar audio con ElevenLabs TTS
Genera todos los clips de narracion automaticamente

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
# Voces populares de ElevenLabs:
#   "Rachel" - voz femenina clara
#   "Adam"   - voz masculina profesional
#   "Antoni" - voz masculina natural
#   "Bella"  - voz femenina suave
#   "Josh"   - voz masculina profunda
VOICE = "pNInz6obpgDQGcFmaJgB"  # Adam - Dominant, Firm
MODEL = "eleven_multilingual_v2"  # Soporte para espanol

# Crear directorio si no existe
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Textos de narracion para cada segmento (16 segmentos)
# Escritos de forma didactica para principiantes aprendiendo SQLAlchemy
NARRATION_TEXTS = {
    # ============================================
    # ACTO 1: Fundamentos (4 segmentos)
    # ============================================
    "intro": """
Bienvenidos a este video sobre SQLAlchemy Models en Flask.
Si estas aprendiendo a crear aplicaciones web con Flask,
uno de los pasos mas importantes es aprender a trabajar con bases de datos.
En este video vamos a ver, paso a paso, como crear modelos de base de datos
usando SQLAlchemy, que es el ORM mas utilizado en el ecosistema de Python.
Vamos a cubrir varios temas.
Primero, que es un ORM y por que lo necesitas.
Luego, como configurar SQLAlchemy en tu proyecto Flask.
Despues, como definir modelos con columnas y tipos de datos.
Tambien veremos los tres tipos de relaciones entre tablas.
Y por ultimo, como convertir tus objetos a JSON para enviarlos desde una API.
""",

    "que-es-orm": """
Antes de tocar codigo, necesitas entender que es un ORM.
ORM significa Object Relational Mapping, o Mapeo Objeto Relacional.
Piensa en ello como un traductor.
Tu escribes codigo en Python, usando objetos y clases.
Pero la base de datos solo entiende SQL, con tablas y filas.
El ORM traduce automaticamente entre estos dos mundos.
Mira el ejemplo en pantalla.
A la izquierda, ves como seria SIN un ORM.
Tienes que escribir las consultas SQL a mano, concatenar strings,
y manejar la conexion directamente. Es propenso a errores.
Ahora mira a la derecha, CON un ORM.
Simplemente creas un objeto User, lo agregas a la sesion, y haces commit.
El ORM genera el SQL por ti.
Para leer datos, en vez de escribir SELECT, simplemente usas User punto query.
Las ventajas son claras.
Codigo mas limpio, menos errores, proteccion contra inyeccion SQL,
y puedes cambiar de base de datos sin reescribir tu codigo.
""",

    "que-es-sqlalchemy": """
Ahora que sabes que es un ORM, hablemos de SQLAlchemy.
SQLAlchemy es el ORM mas popular y maduro para Python.
Lleva mas de 15 anhos en desarrollo y tiene una comunidad enorme.
Lo mejor es que soporta multiples bases de datos.
PostgreSQL, MySQL, SQLite, Oracle, y muchas mas.
Esto significa que puedes desarrollar con SQLite en tu maquina local,
y luego en produccion usar PostgreSQL, sin cambiar tu codigo.
Para usarlo con Flask, necesitamos una extension llamada Flask guion SQLAlchemy,
que simplifica mucho la configuracion.
Como ves en pantalla, la instalacion es muy sencilla.
Solo ejecutas pip install flask guion sqlalchemy, y listo.
""",

    "inicializacion": """
Ahora vamos a configurar SQLAlchemy en nuestro proyecto Flask. Son dos archivos.
Mira a la izquierda, el archivo models punto py.
Aqui importamos SQLAlchemy desde flask_sqlalchemy,
y creamos una instancia escribiendo db igual SQLAlchemy parentesis.
Este objeto db es muy importante, porque es el que vamos a usar
para definir todos nuestros modelos y hacer consultas a la base de datos.
Ahora mira a la derecha, el archivo app punto py.
Aqui es donde conectamos SQLAlchemy con nuestra aplicacion Flask.
Primero configuramos la URL de la base de datos.
Fijate que usamos os punto environ punto get para leer una variable de entorno.
Si no existe, usamos SQLite como base de datos por defecto, lo cual es ideal para desarrollo.
Finalmente, la linea clave es db punto init_app, que conecta todo.
A partir de aqui, SQLAlchemy ya sabe como hablar con tu base de datos.
Tambien es recomendable configurar Flask Migrate para manejar las migraciones.
""",

    # ============================================
    # ACTO 2: Modelos y Columnas (3 segmentos)
    # ============================================
    "sintaxis-moderna": """
Ahora viene la parte mas importante. Vamos a crear nuestro primer modelo.
Un modelo es una clase de Python que representa una tabla en la base de datos.
Cada atributo de la clase se convierte en una columna de esa tabla.
Mira el codigo en pantalla.
Estamos usando la sintaxis moderna de SQLAlchemy 2.0, que utiliza type hints.
Primero, la clase User hereda de db punto Model. Esto es obligatorio.
Luego definimos tablename igual a users. Este sera el nombre de la tabla en la base de datos.
Ahora mira como se definen las columnas.
La sintaxis es, nombre, dos puntos, Mapped entre corchetes con el tipo,
igual a mapped_column con las opciones entre parentesis.
Por ejemplo, id es un entero y es la clave primaria.
email es un string de maximo 120 caracteres, que debe ser unico y no puede estar vacio.
name es un string de 80 caracteres.
Y is_active es un booleano que por defecto es True.
Esta sintaxis moderna te da autocompletado en tu editor y detecta errores de tipo.
""",

    "tipos-columnas": """
Veamos ahora los tipos de datos disponibles para tus columnas.
Esto es importante porque cada columna necesita un tipo que defina que datos puede guardar.
En pantalla puedes ver los mas comunes.
Integer es para numeros enteros, como IDs o cantidades.
String necesita un numero maximo de caracteres, por ejemplo String de 80.
Text es para textos largos sin limite, como descripciones o biografias.
Float es para numeros con decimales, como precios.
Boolean guarda verdadero o falso, ideal para campos como is_active.
DateTime guarda fecha y hora completa, por ejemplo para created_at.
Date guarda solo la fecha, sin la hora.
Y Time guarda solo la hora.
Cada tipo de SQLAlchemy se corresponde con un tipo de Python.
Integer con int, String con str, Boolean con bool, y asi sucesivamente.
Esto es lo que pones dentro de Mapped entre corchetes.
""",

    "opciones-columnas": """
Ademas del tipo, cada columna puede tener opciones que definen sus restricciones.
Estas opciones van dentro de mapped_column y son muy importantes.
Mira el codigo en pantalla.
primary_key igual True convierte esa columna en la clave primaria de la tabla.
Cada tabla necesita al menos una clave primaria, y normalmente es el campo id.
unique igual True significa que no puede haber dos filas con el mismo valor.
Esto es perfecto para campos como email, donde cada usuario debe tener uno diferente.
nullable igual False hace que el campo sea obligatorio.
Si intentas crear un registro sin ese campo, la base de datos lo rechazara.
default te permite establecer un valor automatico.
Por ejemplo, is_active con default True hace que los usuarios nuevos esten activos sin tener que especificarlo.
Y por ultimo, index igual True crea un indice en la base de datos,
lo que acelera mucho las busquedas por ese campo.
""",

    # ============================================
    # ACTO 3: Relaciones (5 segmentos)
    # ============================================
    "relacion-uno-a-uno": """
Ahora entramos en uno de los temas mas importantes. Las relaciones entre tablas.
En las bases de datos relacionales, las tablas se conectan entre si.
Empecemos con la relacion uno a uno.
Imagina que cada usuario tiene exactamente un perfil,
y cada perfil pertenece a exactamente un usuario.
Mira el codigo en pantalla.
En la clase User, definimos profile usando relationship.
El parametro clave aqui es uselist igual False.
Esto le dice a SQLAlchemy que profile es UN solo objeto, no una lista.
Sin este parametro, SQLAlchemy pensaria que es una relacion uno a muchos.
Ahora mira la clase ProfileInfo.
Tiene un campo user_id que es una clave foranea, o ForeignKey, que apunta a la tabla users.
Fijate que tiene unique igual True. Esto es lo que garantiza que solo haya un perfil por usuario.
Y la relacion user apunta de vuelta al usuario, con back_populates.
back_populates conecta ambos lados, asi puedes ir de user punto profile, o de profile punto user.
""",

    "relacion-uno-a-muchos": """
La relacion uno a muchos es la mas comun en aplicaciones reales.
Por ejemplo, un usuario puede hacer muchos pedidos,
pero cada pedido pertenece a un solo usuario.
Mira el codigo.
En la clase User, la relacion orders usa Mapped con list entre corchetes.
Esto indica que es una lista de objetos Order, no uno solo.
Fijate que aqui NO usamos uselist igual False, porque queremos una lista.
Tambien agregamos cascade igual all, delete-orphan.
Esto significa que si borras un usuario, automaticamente se borran todos sus pedidos.
Es muy util para mantener la base de datos limpia.
Ahora mira la clase Order.
Tiene user_id como clave foranea, pero a diferencia del uno a uno,
aqui NO es unique. Esto permite que muchos pedidos apunten al mismo usuario.
Con back_populates, puedes acceder a los pedidos de un usuario con user punto orders,
y al usuario de un pedido con order punto user.
""",

    "relacion-muchos-db-table": """
La relacion muchos a muchos es mas compleja, y tiene dos formas de implementarla.
La primera usa db punto Table, y es la mas sencilla.
Usala cuando solo necesitas conectar dos tablas sin guardar informacion extra.
El ejemplo clasico es articulos y etiquetas.
Un articulo puede tener muchas etiquetas,
y una etiqueta puede estar en muchos articulos.
Para esto necesitamos una tabla intermedia.
Mira el codigo en pantalla. Arriba ves article_tags, creada con db punto Table.
Esta tabla solo tiene dos columnas, article_id y tag_id,
que son claves foraneas apuntando a sus respectivas tablas.
Ambas juntas forman la clave primaria.
Luego, en los modelos Article y Tag, usamos relationship con el parametro secondary.
secondary igual article_tags le dice a SQLAlchemy que use esa tabla intermedia.
Asi de simple. SQLAlchemy maneja toda la logica de la tabla intermedia automaticamente.
""",

    "relacion-muchos-clase": """
La segunda forma de hacer muchos a muchos es crear una clase modelo completa.
Esto es necesario cuando la relacion tiene campos adicionales.
Piensa en un carrito de compras.
Cuando un usuario hace un pedido con varios articulos,
necesitas guardar no solo que articulos pidio,
sino tambien la cantidad, el precio unitario y el subtotal de cada uno.
Mira el codigo. Tenemos tres clases.
Order tiene una relacion items, que es una lista de OrderItem.
Article tiene order_items, que tambien apunta a OrderItem.
Y OrderItem es la clase intermedia, con sus propias columnas.
Fijate que OrderItem tiene order_id y article_id como claves foraneas,
pero ademas tiene quantity, unit_price y subtotal.
Estos campos extra son la razon por la que necesitamos una clase completa.
Con db punto Table no podriamos guardar esta informacion adicional.
Esta forma te da control total sobre la tabla intermedia.
""",

    "on-delete": """
Un tema importante es que pasa cuando eliminas un registro que tiene relaciones.
Por ejemplo, si borras un usuario que tiene pedidos, que pasa con esos pedidos?
Hay tres opciones principales que puedes ver en pantalla.
CASCADE elimina automaticamente todos los registros hijos.
Si borras el usuario, se borran todos sus pedidos. Es la opcion mas comun.
SET NULL pone NULL en la clave foranea.
El pedido seguiria existiendo, pero sin usuario asociado.
RESTRICT impide la eliminacion. Si el usuario tiene pedidos, no puedes borrarlo.
Es importante configurar esto en dos lugares.
Usa ondelete en ForeignKey para que la base de datos lo maneje.
Y cascade en relationship para que el ORM tambien lo sepa.
Se recomienda usar ambos para garantizar consistencia.
""",

    # ============================================
    # ACTO 4: Serializacion (4 segmentos)
    # ============================================
    "metodo-repr": """
Ahora vamos a hablar sobre serializacion, que es como convertimos nuestros objetos en datos que podemos enviar.
Pero primero, veamos el metodo repr, que se escribe con doble guion bajo.
Este metodo define como se muestra un objeto cuando lo imprimes en la consola.
Por defecto, si imprimes un usuario, Python te muestra algo como objeto User en una direccion de memoria,
lo cual no es nada util.
Mira el codigo en pantalla.
Definimos repr para que devuelva un string con el id y el email del usuario.
Ahora, en la parte de abajo, puedes ver el resultado.
Cuando escribes print de user, obtienes User 1 dos puntos ana arroba email punto com.
Esto es increiblemente util cuando estas debugeando tu aplicacion,
porque puedes ver rapidamente de que usuario se trata sin tener que inspeccionar cada campo.
""",

    "metodo-serialize": """
El metodo serialize es fundamental si estas creando una API.
El problema es que los objetos de SQLAlchemy no se pueden convertir directamente a JSON.
Necesitamos convertirlos primero a un diccionario de Python.
Mira el codigo. Dentro de la clase User, creamos el metodo serialize.
Este metodo simplemente retorna un diccionario con los campos que queremos exponer.
Aqui devolvemos id, email y name.
Pero atencion, hay algo MUY importante.
Nunca, nunca incluyas la contrasena en el serialize.
Esto seria un riesgo de seguridad enorme, porque cualquiera que llame a tu API podria ver las contrasenas.
Para las fechas, usa isoformat para convertirlas a un string legible.
Abajo puedes ver como se usa en un endpoint.
Cuando alguien hace una peticion GET a users barra id,
obtenemos el usuario, llamamos a serialize, y con jsonify lo devolvemos como JSON.
Asi de facil.
""",

    "serializacion-relaciones": """
Una ventaja de crear tus propios metodos de serializacion
es que puedes tener varios, segun cuanta informacion necesites enviar.
Mira el codigo en pantalla.
El metodo serialize basico solo devuelve id, email y name.
Pero serialize_with_profile ademas incluye el perfil del usuario,
llamando a self punto profile punto serialize.
Fijate que verificamos si self punto profile existe antes de serializarlo, para evitar errores.
Y serialize_with_orders incluye la lista de pedidos del usuario.
Aqui usamos una list comprehension.
Para cada order en self punto orders, llamamos a order punto serialize.
Esto convierte cada pedido a un diccionario, y los mete todos en una lista.
La idea es que elijas el metodo segun lo que necesite cada endpoint.
Si solo necesitas datos basicos, usa serialize.
Si necesitas todo, usa el metodo que incluya las relaciones.
Asi evitas enviar datos innecesarios y mantienes tu API eficiente.
""",

    "conclusion": """
Muy bien, hemos cubierto mucho terreno. Vamos a repasar los conceptos clave.
Un ORM como SQLAlchemy traduce entre tus objetos de Python y la base de datos SQL.
Los modelos son clases que heredan de db punto Model, y cada uno representa una tabla.
Las columnas se definen con Mapped y mapped_column, usando la sintaxis moderna de SQLAlchemy 2.0.
Para las relaciones, recuerda tres tipos.
Uno a uno, donde usas uselist igual False y la clave foranea es unique.
Uno a muchos, donde la relacion es una lista y la clave foranea NO es unique.
Y muchos a muchos, donde puedes usar db punto Table para casos simples, o una clase modelo cuando necesitas campos adicionales.
Finalmente, el metodo serialize convierte tus objetos a diccionarios para enviarlos como JSON desde tu API.
Te recomiendo que practiques creando tus propios modelos.
Empieza con algo simple, como un blog con usuarios y posts, y ve agregando relaciones.
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
    # Si no se encuentra, devolver el nombre tal cual (puede ser un voice_id directo)
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
    print("Generador de Audio - ElevenLabs TTS")
    print("=" * 60)
    print(f"Voz: {VOICE} ({voice_id})")
    print(f"Modelo: {MODEL}")
    print(f"Directorio de salida: {OUTPUT_DIR}")
    print(f"Total de clips: {len(NARRATION_TEXTS)}")
    print("=" * 60)
    print()

    total = len(NARRATION_TEXTS)
    # Recorrer en orden inverso (ultimo a primero) para evitar patrones anti-abuso
    items = list(NARRATION_TEXTS.items())
    for filename, text in reversed(items):
        output_file = f"{filename}.mp3"
        output_path = OUTPUT_DIR / output_file
        if output_path.exists():
            print(f"[SKIP] {output_file} ya existe")
            continue
        print(f"Generando: ", end="")
        generate_audio(client, text, output_file, voice_id)
        # Pausa entre peticiones para evitar deteccion anti-abuso
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
