#!/usr/bin/env python3
"""
Script para generar audio GRATIS usando Google Translate TTS (gTTS)
NO requiere API key, NO requiere cuenta, 100% gratuito

Uso:
    pip install gtts
    python generate_audio_free.py
"""

from gtts import gTTS
from pathlib import Path
import sys

# Configuracion
OUTPUT_DIR = Path("public/audio")
LANGUAGE = "es"
SLOW = False

# Crear directorio si no existe
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Textos de narracion para cada segmento (16 segmentos = ~8 minutos)
NARRATION_TEXTS = {
    # ============================================
    # ACTO 1: Fundamentos (4 segmentos)
    # ============================================
    "intro": """
Bienvenidos a SQLAlchemy Models en Flask.
En este video aprenderemos a crear modelos de base de datos
usando SQLAlchemy, el ORM mas popular de Python.
Veremos que es un ORM, como inicializar SQLAlchemy,
como crear modelos y columnas, los diferentes tipos de relaciones,
y como serializar nuestros objetos para APIs.
""",

    "que-es-orm": """
Comencemos con lo basico.
ORM significa Object Relational Mapping, o Mapeo Objeto Relacional.
Es una tecnica que permite convertir datos entre sistemas incompatibles.
Tu hablas Python, con objetos y clases.
La base de datos habla SQL, con tablas y filas.
El ORM actua como traductor entre ambos idiomas.
Sin ORM, tendrias que escribir SQL directamente.
Con ORM, trabajas con objetos de Python,
y el ORM traduce automaticamente a SQL.
Las ventajas son muchas.
Abstraccion, portabilidad, seguridad contra inyeccion SQL,
y codigo mas limpio y mantenible.
""",

    "que-es-sqlalchemy": """
SQLAlchemy es el ORM mas popular y poderoso para Python.
Facilita la comunicacion entre Python y bases de datos relacionales.
Soporta multiples bases de datos.
PostgreSQL, MySQL, SQLite, Oracle y mas.
Para usar SQLAlchemy con Flask,
usamos Flask SQLAlchemy,
una extension que simplifica la integracion.
Solo necesitas instalar flask guion sqlalchemy con pip.
""",

    "inicializacion": """
Veamos como inicializar SQLAlchemy en Flask.
Primero, en models punto py,
importamos SQLAlchemy de flask_sqlalchemy,
y creamos la instancia con db igual SQLAlchemy parentesis.
Esta linea crea el objeto que manejara la comunicacion con la base de datos.
Luego, en app punto py,
configuramos la URL de conexion.
Puede venir de una variable de entorno,
o usar SQLite por defecto para desarrollo.
Finalmente, llamamos a db punto init_app,
para conectar SQLAlchemy con nuestra aplicacion Flask.
Tambien configuramos Flask Migrate para las migraciones.
""",

    # ============================================
    # ACTO 2: Modelos y Columnas (3 segmentos)
    # ============================================
    "sintaxis-moderna": """
Ahora veamos como crear modelos.
La forma moderna de SQLAlchemy 2.0
usa type hints con Mapped y mapped_column.
Cada modelo es una clase que hereda de db punto Model.
Definimos el nombre de la tabla con tablename.
Y cada columna usa la sintaxis
nombre dos puntos Mapped corchete tipo
igual mapped_column parentesis.
Por ejemplo, id es un entero con primary_key igual True.
email es un string de 120 caracteres, unico y no nulo.
Esta sintaxis es mas clara y tiene mejor autocompletado.
""",

    "tipos-columnas": """
SQLAlchemy ofrece varios tipos de columnas.
Integer para numeros enteros.
String con un limite de caracteres.
Text para texto largo sin limite.
Float para numeros decimales.
Boolean para verdadero o falso.
DateTime para fecha y hora.
Date para solo fecha.
y Time para solo hora.
Cada tipo en SQLAlchemy corresponde a un tipo de Python.
""",

    "opciones-columnas": """
Las columnas tienen varias opciones importantes.
primary_key igual True convierte la columna en clave primaria.
unique igual True significa que el valor no puede repetirse.
nullable igual False hace que el campo sea obligatorio.
default establece un valor por defecto.
e index igual True crea un indice para busquedas mas rapidas.
Estas opciones definen las restricciones de cada campo.
""",

    # ============================================
    # ACTO 3: Relaciones (5 segmentos)
    # ============================================
    "relacion-uno-a-uno": """
Ahora veamos las relaciones entre tablas.
Comenzamos con la relacion uno a uno.
Un usuario tiene UN solo perfil,
y un perfil pertenece a UN solo usuario.
En el modelo User, agregamos la relacion con relationship.
El parametro uselist igual False es clave,
indica que es UN objeto, no una lista.
En ProfileInfo, la clave foranea tiene unique igual True.
Esto asegura que solo haya UN perfil por usuario.
back_populates conecta ambos lados de la relacion.
""",

    "relacion-uno-a-muchos": """
La relacion uno a muchos es muy comun.
Un usuario puede tener MUCHAS ordenes,
pero cada orden pertenece a UN solo usuario.
En User, la relacion orders es una lista.
Por defecto, uselist es True.
En Order, definimos la clave foranea user_id.
Aqui NO es unique, porque un usuario puede tener multiples ordenes.
cascade igual all delete orphan significa
que si borramos el usuario, se borran sus ordenes.
Podemos acceder a las ordenes con user punto orders,
y al usuario desde una orden con order punto user.
""",

    "relacion-muchos-db-table": """
La relacion muchos a muchos tiene dos formas.
La primera usa db punto Table.
Es ideal cuando SOLO necesitas conectar dos tablas,
sin campos adicionales.
Por ejemplo, articulos y etiquetas.
Un articulo puede tener muchas etiquetas,
y una etiqueta puede estar en muchos articulos.
Creamos una tabla de asociacion con Table,
Solo tiene las dos claves foraneas,
article_id y tag_id.
En los modelos, usamos secondary igual article_tags.
SQLAlchemy maneja la tabla automaticamente.
""",

    "relacion-muchos-clase": """
La segunda forma usa una clase modelo.
Es necesaria cuando hay campos adicionales.
Por ejemplo, en un carrito de compras,
OrderItem conecta Order con Article.
Pero ademas guarda quantity, unit_price y subtotal.
Estos campos extras no cabian en una tabla simple.
Por eso creamos OrderItem como clase completa,
con sus propias columnas y relaciones.
Esta forma te da control total sobre la tabla intermedia.
""",

    "on-delete": """
Cuando eliminas un registro padre,
debes definir que pasa con los hijos.
CASCADE elimina los hijos automaticamente.
SET NULL pone NULL en la clave foranea.
RESTRICT impide eliminar si hay hijos.
Usa ondelete en ForeignKey para la base de datos,
y cascade en relationship para el ORM.
Se recomienda usar ambos para consistencia.
""",

    # ============================================
    # ACTO 4: Serializacion (4 segmentos)
    # ============================================
    "metodo-repr": """
Ahora veamos la serializacion.
Empezamos con el metodo repr, con doble guion bajo.
Define como se muestra el objeto al imprimirlo.
Es muy util para debugging.
Por ejemplo, podemos hacer que User muestre
menor que User id dos puntos email mayor que.
Asi cuando imprimas un usuario,
veras informacion util en la consola.
""",

    "metodo-serialize": """
El metodo serialize es fundamental para APIs.
Convierte el objeto a un diccionario Python,
que luego se convierte a JSON facilmente.
Dentro del metodo, retornamos un diccionario
con los campos que queremos exponer.
MUY IMPORTANTE,
nunca incluyas la contrasena en el serialize,
es un riesgo de seguridad.
Para fechas, usa isoformat para convertirlas a string.
En los endpoints, llamamos a serialize,
y usamos jsonify para devolver JSON.
""",

    "serializacion-relaciones": """
Puedes crear multiples metodos de serializacion.
serialize basico, solo datos del objeto.
serialize_with_profile incluye el perfil.
serialize_with_orders incluye las ordenes.
serialize_full incluye todo.
Esto te permite elegir cuantos datos enviar,
segun lo que necesite cada endpoint.
Para relaciones uno a muchos,
usamos list comprehension.
order punto serialize para cada order en self punto orders.
""",

    "conclusion": """
Repasemos los conceptos clave.
Un ORM traduce entre Python y SQL.
SQLAlchemy es el ORM mas popular de Python.
Los modelos son clases que heredan de db punto Model.
Mapped y mapped_column definen las columnas.
Las relaciones usan ForeignKey y relationship.
uno a uno con uselist False.
uno a muchos sin restriccion de unique.
muchos a muchos con Table o clase modelo.
Finalmente, serialize convierte objetos a JSON.
Practica creando tus propios modelos.
Gracias por ver el video.
""",
}


def generate_audio(text: str, output_file: str, language: str = LANGUAGE, slow: bool = SLOW):
    """Genera un archivo de audio usando Google Translate TTS (GRATIS)"""
    print(f"Generando: {output_file}")

    try:
        tts = gTTS(text=text.strip(), lang=language, slow=slow)
        output_path = OUTPUT_DIR / output_file
        tts.save(str(output_path))
        print(f"[OK] Generado: {output_file}")
    except Exception as e:
        print(f"[ERROR] Error generando {output_file}: {e}")
        raise


def main():
    """Genera todos los archivos de audio"""

    print("=" * 60)
    print("Generador de Audio - SQLAlchemy Video")
    print("Google TTS (GRATUITO)")
    print("=" * 60)
    print(f"Idioma: Espanol")
    print(f"Directorio de salida: {OUTPUT_DIR}")
    print(f"Total de clips: {len(NARRATION_TEXTS)}")
    print("=" * 60)
    print()

    total = len(NARRATION_TEXTS)
    for i, (filename, text) in enumerate(NARRATION_TEXTS.items(), 1):
        print(f"[{i}/{total}] ", end="")
        generate_audio(text, f"{filename}.mp3")

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
    try:
        from gtts import gTTS
    except ImportError:
        print("ERROR: gTTS no esta instalado")
        print("\nInstala con: pip install gtts")
        sys.exit(1)

    main()
