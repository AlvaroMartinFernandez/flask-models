# Script de Narración - Video POO en Python + Flask

**Duración total:** 5:00 minutos (300 segundos)
**Idioma:** Español
**Tono:** Educativo, claro, entusiasta pero profesional
**Velocidad:** 140-160 palabras por minuto (ritmo cómodo)

---

## ACTO 1: INTRODUCCIÓN POO (0:00 - 2:00)

### Segmento 1.1: Hook (0:00 - 0:15) - 15 segundos
```
¿Quieres crear APIs profesionales con Flask?
Hoy aprenderás Programación Orientada a Objetos en Python,
paso a paso, y cómo aplicarla a tus proyectos reales.
```
**Palabras:** ~35
**Consejos:** Tono entusiasta, enfatizar "profesionales" y "paso a paso"

---

### Segmento 1.2: ¿Qué es una Clase? (0:15 - 0:45) - 30 segundos
```
Una clase es como un plano arquitectónico.
Define los atributos y métodos que tendrán todos los objetos de ese tipo.

Aquí tenemos la clase Perro.
El método init inicializa el nombre.
El método ladrar muestra un mensaje.

Cuando creamos mi_perro igual a Perro de Fido,
estamos construyendo un objeto concreto a partir del plano.
La clase es el molde, el objeto es la casa construida.
```
**Palabras:** ~75
**Consejos:** Pausar después de "plano arquitectónico". Enfatizar "clase es el molde, objeto es la casa"

---

### Segmento 1.3: Los 4 Pilares POO (0:45 - 2:00)

#### Encapsulación (0:45 - 1:05) - 20 segundos
```
El primer pilar es la encapsulación.
Consiste en ocultar los detalles internos y mostrar solo lo necesario.

Observa esta clase CuentaBancaria.
El atributo guión bajo saldo es privado por convención.
Solo podemos acceder a él mediante métodos públicos como depositar u obtener saldo.
Esto protege tus datos de modificaciones no autorizadas.
```
**Palabras:** ~60
**Consejos:** Enfatizar "guión bajo" cuando menciones `_saldo`. Pausa antes de "Esto protege..."

---

#### Herencia (1:05 - 1:25) - 20 segundos
```
El segundo pilar es la herencia.
Permite crear nuevas clases basadas en otras existentes, reutilizando código.

La clase Perro hereda de Animal.
Automáticamente tiene acceso al método comer.

En el ejemplo de la derecha, vemos super punto init.
Super llama al constructor de la clase padre Vehículo,
heredando marca y modelo, y luego añadimos el atributo puertas.
```
**Palabras:** ~65
**Consejos:** Pausa entre los dos ejemplos. Enfatizar "super punto init"

---

#### Polimorfismo (1:25 - 1:45) - 20 segundos
```
El tercer pilar es el polimorfismo.
Significa "muchas formas".
Diferentes clases pueden tener métodos con el mismo nombre pero comportamientos distintos.

Gato punto hablar devuelve Miau.
Perro punto hablar devuelve Guau.
Mismo método, diferente resultado.

Esto permite tratar objetos diferentes de manera uniforme.
```
**Palabras:** ~55
**Consejos:** Hacer voces divertidas para "Miau" y "Guau" (opcional pero efectivo)

---

#### Abstracción (1:45 - 2:00) - 15 segundos
```
Y el cuarto pilar es la abstracción.
Simplificar lo complejo, mostrar solo lo esencial.

Ahora que conoces los fundamentos,
veamos cómo aplicar todo esto en una API real con Flask.
```
**Palabras:** ~30
**Consejos:** Transición entusiasta hacia el Acto 2. Pausa dramática antes de "veamos"

---

## ACTO 2: PRÁCTICA FLASK (2:00 - 4:45)

### Segmento 2.1: Presentación del Proyecto (2:00 - 2:20) - 20 segundos
```
Vamos a construir un CRUD completo.
A la izquierda, nuestra estructura de archivos.
App punto py contiene la API de Flask.
Usuarios punto py es nuestra clase con lógica de negocio.

El flujo es simple: recibimos una petición HTTP,
Flask la procesa, usa la clase Usuarios para manipular datos,
y devuelve una respuesta JSON.
```
**Palabras:** ~60
**Consejos:** Ritmo más rápido y técnico. Pausa al mencionar cada archivo.

---

### Segmento 2.2: La Clase Usuarios (2:20 - 3:00) - 40 segundos
```
Aquí está nuestra clase Usuarios.

El constructor inicializa una lista vacía llamada miembros.

Get all members devuelve la lista completa.

Get one member busca un usuario por ID usando una expresión generadora.

Add member agrega un nuevo usuario a la lista.

Edit member actualiza un usuario existente en un índice específico.

Y delete member elimina un usuario usando el método pop.

Cinco métodos. Un CRUD completo. Todo encapsulado en una clase.
```
**Palabras:** ~85
**Consejos:** Pausa después de mencionar cada método. Ritmo pausado para que se pueda leer el código. Enfatizar "CRUD completo".

---

### Segmento 2.3: Integración Flask (3:00 - 4:15)

#### Setup (3:00 - 3:15) - 15 segundos
```
Primero importamos la clase Usuarios.
Creamos una instancia llamada usuarios.
Y la inicializamos con cinco usuarios de ejemplo.

Así de simple. Ya tenemos nuestra fuente de datos lista.
```
**Palabras:** ~30
**Consejos:** Ritmo claro, marcar cada paso.

---

#### GET Endpoints (3:15 - 3:35) - 20 segundos
```
El decorator app punto route define nuestros endpoints.

Para obtener todos los usuarios,
llamamos a usuarios punto get all members,
y devolvemos el resultado en formato JSON.

Para obtener un usuario específico,
buscamos por ID y devolvemos el usuario encontrado,
o un error cuatrocientos cuatro si no existe.
```
**Palabras:** ~55
**Consejos:** Enfatizar "decorator". Pronunciar "404" como "cuatrocientos cuatro".

---

#### POST Endpoint (3:35 - 3:55) - 20 segundos
```
Para crear un usuario, usamos el método POST.

Primero validamos que los datos sean correctos.
Generamos un nuevo ID incrementando el máximo actual.
Creamos el objeto usuario con id, name y email.
Llamamos a usuarios punto add member.
Y devolvemos status doscientos uno: Created.
```
**Palabras:** ~50
**Consejos:** Enfatizar "validamos" y "status 201". Ritmo paso a paso.

---

#### PUT y DELETE (3:55 - 4:15) - 20 segundos
```
A la izquierda, el endpoint PUT para actualizar.
Buscamos el índice del usuario,
actualizamos sus datos,
y llamamos a edit member.

A la derecha, el endpoint DELETE para eliminar.
Encontramos el usuario por ID,
llamamos a delete member,
y devolvemos un mensaje de confirmación.
```
**Palabras:** ~50
**Consejos:** Enfatizar "izquierda" y "derecha". Ritmo equilibrado entre ambos lados.

---

### Segmento 2.4: Demo en Vivo (4:15 - 4:45) - 30 segundos
```
Y ahora veamos todo en acción.

GET barra users: obtenemos los cinco usuarios iniciales.

POST: creamos a Carlos. Status doscientos uno.

GET otra vez: ahora aparecen seis usuarios.

PUT: actualizamos el nombre a Carlos García.

DELETE: eliminamos el usuario.

Y finalmente GET: volvemos a tener cinco usuarios.

CRUD completo funcionando. Clase más Flask. Simple y poderoso.
```
**Palabras:** ~70
**Consejos:** Ritmo dinámico, como si estuvieras mostrando algo emocionante. Pausas cortas entre cada operación.

---

## ACTO 3: CONCLUSIÓN (4:45 - 5:00)

### Segmento 3.1: Recap (4:45 - 4:55) - 10 segundos
```
Recapitulemos.

Clase igual a organización del código.
Encapsulación igual a datos seguros.
Métodos igual a lógica reutilizable.
Flask más POO igual a APIs escalables.
```
**Palabras:** ~25
**Consejos:** Ritmo punchy, como lista de puntos clave. Pausa entre cada punto.

---

### Segmento 3.2: Call to Action (4:55 - 5:00) - 5 segundos
```
Ahora es tu turno.
Practica creando tu propia clase.
El código completo está disponible.
¡Nos vemos!
```
**Palabras:** ~20
**Consejos:** Tono motivador y amigable. Terminar con energía positiva.

---

## RESUMEN DE GRABACIÓN

**Total de palabras:** ~840
**Velocidad promedio:** 168 palabras/minuto (perfecto para contenido educativo)
**Segmentos:** 14 clips de audio separados

### Consejos generales de grabación:

1. **Ambiente:** Graba en un lugar silencioso
2. **Micrófono:** Lo mejor que tengas disponible (hasta un smartphone moderno sirve)
3. **Distancia:** 15-20cm del micrófono
4. **Tono:** Natural, como si le explicaras a un amigo
5. **Pausas:** Respeta las pausas indicadas para sincronización visual
6. **Errores:** No te preocupes, puedes grabar en múltiples tomas
7. **Énfasis:** Las palabras en **negrita** en el script merecen énfasis especial

### Pronunciación clave:

- `__init__` → "init" o "dunder init"
- `_saldo` → "guión bajo saldo"
- `super()` → "super"
- `.` → "punto" cuando sea importante aclarar (ej: "app punto route")
- `404` → "cuatrocientos cuatro" o "error cuatro cero cuatro"
- `201` → "doscientos uno" o "status dos cero uno"
- CRUD → "crud" (pronunciar como palabra)

---

## ARCHIVOS A CREAR

Deberás grabar y guardar estos archivos MP3:

```
public/audio/
├── act1_hook.mp3                    (0:00-0:15)
├── act1_clase_concepto.mp3          (0:15-0:45)
├── act1_encapsulacion.mp3           (0:45-1:05)
├── act1_herencia.mp3                (1:05-1:25)
├── act1_polimorfismo.mp3            (1:25-1:45)
├── act1_abstraccion.mp3             (1:45-2:00)
├── act2_presentacion.mp3            (2:00-2:20)
├── act2_clase_usuarios.mp3          (2:20-3:00)
├── act2_flask_setup.mp3             (3:00-3:15)
├── act2_get_endpoints.mp3           (3:15-3:35)
├── act2_post_endpoint.mp3           (3:35-3:55)
├── act2_put_delete.mp3              (3:55-4:15)
├── act2_demo.mp3                    (4:15-4:45)
├── act3_recap.mp3                   (4:45-4:55)
└── act3_cta.mp3                     (4:55-5:00)
```

**Formato recomendado:**
- MP3, 192 kbps
- Mono (suficiente para voz)
- 44.1 kHz sample rate
