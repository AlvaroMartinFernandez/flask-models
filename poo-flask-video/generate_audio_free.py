#!/usr/bin/env python3
"""
Script para generar audio GRATIS usando Google Translate TTS (gTTS)
NO requiere API key, NO requiere cuenta, 100% gratuito
"""

from gtts import gTTS
from pathlib import Path
import sys

# Configuración
OUTPUT_DIR = Path("public/audio")
LANGUAGE = "es"  # Español
SLOW = False  # False = velocidad normal, True = más lento

# Crear directorio si no existe
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Textos de narración para cada segmento
NARRATION_TEXTS = {
    # ACTO 1: INTRODUCCIÓN
    "act1_hook": """
¿Quieres crear APIs profesionales con Flask?
Hoy aprenderás Programación Orientada a Objetos en Python,
paso a paso, y cómo aplicarla a tus proyectos reales.
""",

    "act1_clase_concepto": """
Una clase es como un plano arquitectónico.
Define los atributos y métodos que tendrán todos los objetos de ese tipo.

Aquí tenemos la clase Perro.
El método init inicializa el nombre.
El método ladrar muestra un mensaje.

Cuando creamos mi_perro igual a Perro de Fido,
estamos construyendo un objeto concreto a partir del plano.
La clase es el molde, el objeto es la casa construida.
""",

    "act1_encapsulacion": """
El primer pilar es la encapsulación.
Consiste en ocultar los detalles internos y mostrar solo lo necesario.

Observa esta clase CuentaBancaria.
El atributo guión bajo saldo es privado por convención.
Solo podemos acceder a él mediante métodos públicos como depositar u obtener saldo.
Esto protege tus datos de modificaciones no autorizadas.
""",

    "act1_herencia": """
El segundo pilar es la herencia.
Permite crear nuevas clases basadas en otras existentes, reutilizando código.

La clase Perro hereda de Animal.
Automáticamente tiene acceso al método comer.

En el ejemplo de la derecha, vemos super punto init.
Super llama al constructor de la clase padre Vehículo,
heredando marca y modelo, y luego añadimos el atributo puertas.
""",

    "act1_polimorfismo": """
El tercer pilar es el polimorfismo.
Significa muchas formas.
Diferentes clases pueden tener métodos con el mismo nombre pero comportamientos distintos.

Gato punto hablar devuelve Miau.
Perro punto hablar devuelve Guau.
Mismo método, diferente resultado.

Esto permite tratar objetos diferentes de manera uniforme.
""",

    "act1_abstraccion": """
Y el cuarto pilar es la abstracción.
Simplificar lo complejo, mostrar solo lo esencial.

Ahora que conoces los fundamentos,
veamos cómo aplicar todo esto en una API real con Flask.
""",

    # ACTO 2: PRÁCTICA
    "act2_presentacion": """
Vamos a construir un CRUD completo.
A la izquierda, nuestra estructura de archivos.
App punto py contiene la API de Flask.
Usuarios punto py es nuestra clase con lógica de negocio.

El flujo es simple: recibimos una petición HTTP,
Flask la procesa, usa la clase Usuarios para manipular datos,
y devuelve una respuesta JSON.
""",

    "act2_clase_usuarios": """
Aquí está nuestra clase Usuarios.

El constructor inicializa una lista vacía llamada miembros.

Get all members devuelve la lista completa.

Get one member busca un usuario por ID usando una expresión generadora.

Add member agrega un nuevo usuario a la lista.

Edit member actualiza un usuario existente en un índice específico.

Y delete member elimina un usuario usando el método pop.

Cinco métodos. Un CRUD completo. Todo encapsulado en una clase.
""",

    "act2_flask_setup": """
Primero importamos la clase Usuarios.
Creamos una instancia llamada usuarios.
Y la inicializamos con cinco usuarios de ejemplo.

Así de simple. Ya tenemos nuestra fuente de datos lista.
""",

    "act2_get_endpoints": """
El decorator app punto route define nuestros endpoints.

Para obtener todos los usuarios,
llamamos a usuarios punto get all members,
y devolvemos el resultado en formato JSON.

Para obtener un usuario específico,
buscamos por ID y devolvemos el usuario encontrado,
o un error cuatrocientos cuatro si no existe.
""",

    "act2_post_endpoint": """
Para crear un usuario, usamos el método POST.

Primero validamos que los datos sean correctos.
Generamos un nuevo ID incrementando el máximo actual.
Creamos el objeto usuario con id, name y email.
Llamamos a usuarios punto add member.
Y devolvemos status doscientos uno: Created.
""",

    "act2_put_delete": """
A la izquierda, el endpoint PUT para actualizar.
Buscamos el índice del usuario,
actualizamos sus datos,
y llamamos a edit member.

A la derecha, el endpoint DELETE para eliminar.
Encontramos el usuario por ID,
llamamos a delete member,
y devolvemos un mensaje de confirmación.
""",

    "act2_demo": """
Y ahora veamos todo en acción.

GET barra users: obtenemos los cinco usuarios iniciales.

POST: creamos a Carlos. Status doscientos uno.

GET otra vez: ahora aparecen seis usuarios.

PUT: actualizamos el nombre a Carlos García.

DELETE: eliminamos el usuario.

Y finalmente GET: volvemos a tener cinco usuarios.

CRUD completo funcionando. Clase más Flask. Simple y poderoso.
""",

    # ACTO 3: CONCLUSIÓN
    "act3_recap": """
Recapitulemos.

Clase igual a organización del código.
Encapsulación igual a datos seguros.
Métodos igual a lógica reutilizable.
Flask más POO igual a APIs escalables.
""",

    "act3_cta": """
Ahora es tu turno.
Practica creando tu propia clase.
El código completo está disponible.
¡Nos vemos!
""",
}


def generate_audio(text: str, output_file: str, language: str = LANGUAGE, slow: bool = SLOW):
    """
    Genera un archivo de audio usando Google Translate TTS (GRATIS)

    Args:
        text: Texto a convertir en audio
        output_file: Nombre del archivo de salida (sin ruta)
        language: Idioma (es = español)
        slow: Si True, habla más lento
    """
    print(f"Generando: {output_file}")

    try:
        # Crear objeto gTTS
        tts = gTTS(text=text.strip(), lang=language, slow=slow)

        # Guardar audio
        output_path = OUTPUT_DIR / output_file
        tts.save(str(output_path))

        print(f"[OK] Generado: {output_file}")

    except Exception as e:
        print(f"[ERROR] Error generando {output_file}: {e}")
        raise


def main():
    """Genera todos los archivos de audio"""

    print("=" * 60)
    print("Generador de Audio GRATUITO con Google TTS")
    print("=" * 60)
    print(f"Idioma: Español")
    print(f"Directorio de salida: {OUTPUT_DIR}")
    print(f"Total de clips: {len(NARRATION_TEXTS)}")
    print("=" * 60)
    print()

    # Generar cada archivo
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
    print("Próximos pasos:")
    print("1. Verifica los audios: cd public/audio && ls")
    print("2. Preview del video: npm run dev")
    print("3. Render final: npm run build")
    print()
    print("NOTA: gTTS usa voz robótica de Google Translate.")
    print("Para mejor calidad, considera OpenAI TTS (~$0.10)")


if __name__ == "__main__":
    # Verificar que gTTS esté instalado
    try:
        from gtts import gTTS
    except ImportError:
        print("ERROR: gTTS no está instalado")
        print("\nInstala con: pip install gtts")
        sys.exit(1)

    main()
