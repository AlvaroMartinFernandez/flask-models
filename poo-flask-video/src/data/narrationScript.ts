// Script de narración para el video de POO
// Video de ~11 minutos (655 segundos)
// Duraciones basadas en los audios generados + 0.5s de pausa

export interface NarrationSegment {
  id: string;
  section: string;
  text: string;
  startFrame: number;
  durationFrames: number;
  audioFile?: string;
}

export const narrationScript: NarrationSegment[] = [
  // ============================================
  // ACTO 1: Fundamentos de POO (0-336s)
  // ============================================
  {
    id: 'intro',
    section: 'Introducción',
    text: 'Bienvenidos... a Programación Orientada a Objetos en Python... En este video, aprenderemos los conceptos fundamentales que todo programador debe conocer... Veremos clases y objetos... el constructor init... los métodos mágicos de Python... herencia... encapsulación... y polimorfismo... Al final, aplicaremos todo esto en un ejemplo práctico con Flask.',
    startFrame: 0,
    durationFrames: 766,
    audioFile: 'intro.mp3',
  },
  {
    id: 'clases-objetos',
    section: 'Clases y Objetos',
    text: 'Comencemos con lo más básico... Una clase, es como un plano o molde... que define cómo serán los objetos que creemos... Piensa en la clase como los planos de una casa... El objeto, es una instancia concreta de esa clase... Es decir, la casa ya construida siguiendo esos planos... Aquí tenemos la clase Perro... Dentro de ella, definimos el constructor init... que recibe el nombre del perro... Y también un método llamado ladrar... que imprime un mensaje en pantalla.',
    startFrame: 766,
    durationFrames: 1037,
    audioFile: 'clases-objetos.mp3',
  },
  {
    id: 'init-detallado',
    section: 'Constructor __init__',
    text: 'Ahora profundicemos en el constructor... El método init, escrito con doble guión bajo al inicio y al final... es el constructor de la clase... Este método especial, se ejecuta automáticamente cada vez que creamos un nuevo objeto... El primer parámetro siempre es self... que es una referencia a la instancia actual del objeto... Dentro del init, inicializamos los atributos... como self punto nombre, y self punto edad... Estos atributos quedan guardados en el objeto... Cuando escribimos Perro de Fido y tres... Python internamente llama al init... pasando el objeto recién creado como self... y Fido y tres como los argumentos nombre y edad.',
    startFrame: 1803,
    durationFrames: 1304,
    audioFile: 'init-detallado.mp3',
  },
  {
    id: 'metodos-magicos',
    section: 'Métodos Mágicos',
    text: 'Python tiene métodos especiales llamados métodos mágicos... También conocidos como dunder methods, por el doble guión bajo... Veamos los más importantes... El método dict, con doble guión bajo... devuelve todos los atributos del objeto como un diccionario... Esto es muy útil para convertir objetos a JSON... El método str... define cómo se muestra el objeto cuando usamos print... Por ejemplo, podemos hacer que imprima el nombre y precio de un producto... El método repr... es similar, pero está pensado para desarrolladores... Muestra una representación técnica útil para debugging... También existen otros como len para obtener la longitud... eq para comparar si dos objetos son iguales... y add para definir qué pasa cuando sumamos dos objetos.',
    startFrame: 3107,
    durationFrames: 1633,
    audioFile: 'metodos-magicos.mp3',
  },
  {
    id: 'herencia-basica',
    section: 'Herencia Básica',
    text: 'Ahora veamos la herencia... La herencia es un mecanismo que permite crear nuevas clases... basadas en clases que ya existen... La clase hija, hereda todos los atributos y métodos de la clase padre... En este ejemplo, tenemos la clase Animal... que tiene un método llamado comer... Luego creamos la clase Perro, que hereda de Animal... Esto se indica poniendo Animal entre paréntesis... Perro hereda el método comer automáticamente... Y además, puede tener sus propios métodos, como ladrar... Cuando creamos un objeto Perro... podemos llamar tanto a comer, como a ladrar.',
    startFrame: 4740,
    durationFrames: 1141,
    audioFile: 'herencia-basica.mp3',
  },
  {
    id: 'herencia-super',
    section: 'Herencia con super()',
    text: 'A veces, la clase hija necesita inicializar atributos del padre... Para esto usamos la función super... Veamos un ejemplo... La clase Vehículo tiene un constructor... que recibe marca y modelo... La clase Coche hereda de Vehículo... pero además tiene su propio atributo, puertas... En el constructor de Coche... primero llamamos a super punto init... Esto ejecuta el constructor del padre... inicializando marca y modelo... Y luego, agregamos el atributo puertas... Así, el Coche tiene los tres atributos... marca y modelo del padre... y puertas propio.',
    startFrame: 5881,
    durationFrames: 1195,
    audioFile: 'herencia-super.mp3',
  },
  {
    id: 'encapsulacion',
    section: 'Encapsulación',
    text: 'La encapsulación es otro pilar fundamental... Consiste en ocultar los detalles internos de un objeto... y exponer solo lo que es necesario... En Python, usamos el guión bajo para indicar que un atributo es protegido... En este ejemplo de Cuenta Bancaria... el saldo tiene un guión bajo al inicio... Esto indica que no deberíamos acceder a él directamente... En su lugar, usamos métodos públicos... como depositar, para agregar dinero... y obtener saldo, para consultar el balance... Así protegemos los datos sensibles... y controlamos cómo se accede a ellos.',
    startFrame: 7076,
    durationFrames: 1141,
    audioFile: 'encapsulacion.mp3',
  },
  {
    id: 'polimorfismo',
    section: 'Polimorfismo',
    text: 'El polimorfismo permite que diferentes clases... tengan métodos con el mismo nombre... pero con comportamientos distintos... Veamos este ejemplo... Tenemos las clases Gato y Perro... Ambas tienen un método llamado hablar... Pero cada una lo implementa de forma diferente... El Gato dice miau... y el Perro dice guau... Lo interesante es que podemos tener una lista con ambos animales... y llamar al método hablar en un bucle... Cada animal responderá según su propia implementación... Michi, el gato, dice miau... y Fido, el perro, dice guau... Este es el poder del polimorfismo.',
    startFrame: 8217,
    durationFrames: 1269,
    audioFile: 'polimorfismo.mp3',
  },
  {
    id: 'abstraccion',
    section: 'Abstracción y Transición',
    text: 'La abstracción nos permite simplificar lo complejo... enfocándonos solo en lo esencial... Las ventajas de usar POO son muchas... Reutilización de código... mejor organización... modularidad... y escalabilidad... Ahora, veamos todo esto aplicado en un ejemplo real.',
    startFrame: 9486,
    durationFrames: 591,
    audioFile: 'abstraccion.mp3',
  },

  // ============================================
  // ACTO 2: Clase Usuarios y CRUD (336-500s)
  // ============================================
  {
    id: 'clase-usuarios-intro',
    section: 'Clase Usuarios',
    text: 'Vamos a aplicar todos estos conceptos... en un ejemplo práctico y real... Crearemos una clase llamada Usuarios... que implementa las operaciones CRUD... CRUD significa Create, Read, Update y Delete... Es decir, crear, leer, actualizar y eliminar... Esta clase será el corazón de una API REST... Veamos cómo se estructura.',
    startFrame: 10077,
    durationFrames: 790,
    audioFile: 'clase-usuarios-intro.mp3',
  },
  {
    id: 'init-usuarios',
    section: 'Constructor Usuarios',
    text: 'El constructor de nuestra clase Usuarios es simple... pero muy importante... Usamos el método init... para inicializar una lista vacía llamada miembros... Esta lista es donde guardaremos todos los usuarios de nuestra aplicación... Cada vez que creamos una instancia de Usuarios... se crea una nueva lista vacía... Recuerda que self punto miembros... crea un atributo de instancia... que pertenece a ese objeto específico.',
    startFrame: 10867,
    durationFrames: 838,
    audioFile: 'init-usuarios.mp3',
  },
  {
    id: 'get-all',
    section: 'Get All Members',
    text: 'El método get all members es el más sencillo... Simplemente retorna la lista completa de miembros... con todos los usuarios que tenemos guardados... Este método corresponde a la operación Read del CRUD... y se usa con peticiones GET en la API... Cuando un cliente solicita todos los usuarios... este método devuelve la lista entera.',
    startFrame: 11705,
    durationFrames: 689,
    audioFile: 'get-all.mp3',
  },
  {
    id: 'get-one',
    section: 'Get One Member',
    text: 'El método get one member busca un usuario específico... Lo hace usando el ID que le pasamos como parámetro... Internamente usa la función next de Python... con una expresión generadora... Recorre la lista buscando un usuario cuyo ID coincida... Si lo encuentra, retorna ese usuario... Si no lo encuentra, retorna None... Este método también es parte de la operación Read.',
    startFrame: 12394,
    durationFrames: 809,
    audioFile: 'get-one.mp3',
  },
  {
    id: 'add-member',
    section: 'Add Member',
    text: 'El método add member agrega un nuevo usuario... Recibe los datos del usuario como parámetro... y usa el método append de las listas... para añadirlo al final de nuestra lista de miembros... Este método corresponde a la operación Create del CRUD... y se usa con peticiones POST en la API... Cada vez que queremos crear un nuevo usuario... llamamos a este método.',
    startFrame: 13203,
    durationFrames: 752,
    audioFile: 'add-member.mp3',
  },
  {
    id: 'edit-delete',
    section: 'Edit y Delete',
    text: 'Nos quedan dos métodos importantes... Edit member actualiza un usuario existente... Primero busca el usuario por su índice... y luego modifica sus datos con los nuevos valores... Corresponde a la operación Update, y usa peticiones PUT... Delete member elimina un usuario de la lista... Usa el método pop para quitarlo por su índice... Corresponde a la operación Delete... y usa peticiones DELETE en la API.',
    startFrame: 13955,
    durationFrames: 968,
    audioFile: 'edit-delete.mp3',
  },
  {
    id: 'flask-intro',
    section: 'Intro Flask',
    text: 'Ahora conectemos nuestra clase con Flask.',
    startFrame: 14923,
    durationFrames: 89,
    audioFile: 'flask-intro.mp3',
  },

  // ============================================
  // ACTO 3: Endpoints y Conclusión (500-655s)
  // ============================================
  {
    id: 'flask-demo',
    section: 'Demo Flask',
    text: 'Flask es un framework ligero para crear APIs en Python... Es muy popular por su simplicidad... Cada método de nuestra clase Usuarios... se conectará con un endpoint de la API... Primero, importamos Flask y nuestra clase Usuarios... Luego creamos una instancia de Flask... y una instancia de nuestra clase... Finalmente, añadimos algunos usuarios de ejemplo... para poder probar nuestra API.',
    startFrame: 15012,
    durationFrames: 747,
    audioFile: 'flask-demo.mp3',
  },
  {
    id: 'get-endpoints',
    section: 'GET Endpoints',
    text: 'Los endpoints GET sirven para obtener datos... Usamos el decorador app punto route... para definir la URL del endpoint... El primer endpoint es barra users... que llama a get all members... y retorna todos los usuarios como JSON... El segundo endpoint es barra users barra id... donde id es un parámetro variable... Este endpoint llama a get one member... y retorna un usuario específico... Si el usuario no existe, retorna un error 404.',
    startFrame: 15759,
    durationFrames: 1067,
    audioFile: 'get-endpoints.mp3',
  },
  {
    id: 'post-endpoint',
    section: 'POST Endpoint',
    text: 'El endpoint POST sirve para crear nuevos usuarios... Recibe los datos en formato JSON... usando request punto get json... Primero validamos que los datos sean correctos... que incluyan nombre e email... Luego generamos un nuevo ID automáticamente... Creamos un diccionario con los datos del usuario... y llamamos a add member para guardarlo... Finalmente retornamos el usuario creado... con el código de estado 201, que significa creado.',
    startFrame: 16826,
    durationFrames: 1026,
    audioFile: 'post-endpoint.mp3',
  },
  {
    id: 'put-delete-endpoints',
    section: 'PUT y DELETE',
    text: 'El endpoint PUT actualiza usuarios existentes... Recibe el ID en la URL... y los nuevos datos en el cuerpo de la petición... Busca el usuario, actualiza sus campos... y retorna el usuario modificado... El endpoint DELETE elimina usuarios... También recibe el ID en la URL... Busca el usuario y lo elimina de la lista... Retorna un mensaje confirmando la eliminación... Ambos endpoints manejan el caso de que el usuario no exista.',
    startFrame: 17852,
    durationFrames: 943,
    audioFile: 'put-delete-endpoints.mp3',
  },
  {
    id: 'conclusion',
    section: 'Conclusión',
    text: 'Repasemos los conceptos clave... Una clase es un molde para crear objetos... El constructor init inicializa los atributos... Self referencia la instancia actual... Los métodos mágicos personalizan el comportamiento... Y los métodos normales operan sobre los datos... Practica creando tus propias clases... y construye aplicaciones reales como esta API... Gracias por ver el video.',
    startFrame: 18795,
    durationFrames: 876,
    audioFile: 'conclusion.mp3',
  },
];

// Calcular estadísticas del script
export const scriptStats = {
  totalSegments: narrationScript.length,
  totalCharacters: narrationScript.reduce((acc, s) => acc + s.text.length, 0),
  totalDurationSeconds: narrationScript.reduce((acc, s) => acc + s.durationFrames, 0) / 30,
  totalDurationMinutes: narrationScript.reduce((acc, s) => acc + s.durationFrames, 0) / 30 / 60,
};

// Helper para obtener el texto completo
export const getFullScript = () => {
  return narrationScript.map(s => `[${s.section}]\n${s.text}`).join('\n\n');
};
