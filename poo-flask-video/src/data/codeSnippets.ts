// Snippets de codigo para el video educativo de POO
// Basado en los ejemplos de summaries/POO/poo.md

export const codeSnippets = {
  // ============================================
  // ACTO 1: Fundamentos de POO (de tu poo.md)
  // ============================================

  // Constructor __init__ explicado en detalle
  initExplicado: `class Perro:
    def __init__(self, nombre, edad):
        # __init__ se ejecuta automaticamente al crear el objeto
        # self = referencia a la instancia actual
        self.nombre = nombre  # Atributo de instancia
        self.edad = edad      # Atributo de instancia

# Al crear el objeto, __init__ se llama automaticamente
mi_perro = Perro("Fido", 3)
# Equivale a: Perro.__init__(mi_perro, "Fido", 3)

print(mi_perro.nombre)  # Fido
print(mi_perro.edad)    # 3`,

  // Metodo __dict__ - Diccionario de atributos
  dictMethod: `class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

persona = Persona("Ana", 25)

# __dict__ devuelve los atributos como diccionario
print(persona.__dict__)
# {'nombre': 'Ana', 'edad': 25}

# Util para serializar a JSON o debuggear
import json
print(json.dumps(persona.__dict__))
# {"nombre": "Ana", "edad": 25}`,

  // Metodos __str__ y __repr__
  strReprMethods: `class Producto:
    def __init__(self, nombre, precio):
        self.nombre = nombre
        self.precio = precio

    def __str__(self):
        # Para usuarios: print(objeto)
        return f"{self.nombre} - ${self.precio}"

    def __repr__(self):
        # Para desarrolladores: debugging
        return f"Producto('{self.nombre}', {self.precio})"

p = Producto("Laptop", 999)
print(p)       # Laptop - $999 (usa __str__)
print(repr(p)) # Producto('Laptop', 999) (usa __repr__)`,

  // Otros metodos magicos comunes
  otrosMagicos: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __len__(self):
        # len(objeto)
        return int((self.x**2 + self.y**2)**0.5)

    def __eq__(self, otro):
        # objeto1 == objeto2
        return self.x == otro.x and self.y == otro.y

    def __add__(self, otro):
        # objeto1 + objeto2
        return Vector(self.x + otro.x, self.y + otro.y)

v1 = Vector(3, 4)
v2 = Vector(3, 4)
print(len(v1))      # 5
print(v1 == v2)     # True
print((v1 + v2).x)  # 6`,

  // Clase Perro - Ejemplo principal de clase y objeto
  perroClass: `class Perro:
    def __init__(self, nombre):
        self.nombre = nombre

    def ladrar(self):
        print(f"{self.nombre} dice: Guau!")

mi_perro = Perro("Fido")
mi_perro.ladrar()  # Fido dice: Guau!`,

  // Herencia - Animal y Perro
  herenciaBasica: `class Animal:
    def comer(self):
        print("El animal come")

class Perro(Animal):
    def ladrar(self):
        print("Guau!")

mi_perro = Perro()
mi_perro.comer()  # El animal come
mi_perro.ladrar() # Guau!`,

  // Herencia con atributos - Vehiculo y Coche
  herenciaAtributos: `class Vehiculo:
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo

class Coche(Vehiculo):
    def __init__(self, marca, modelo, puertas):
        super().__init__(marca, modelo)
        self.puertas = puertas

mi_coche = Coche("Toyota", "Corolla", 4)
print(mi_coche.marca)   # Toyota
print(mi_coche.modelo)  # Corolla
print(mi_coche.puertas) # 4`,

  // Encapsulacion - CuentaBancaria
  encapsulacion: `class CuentaBancaria:
    def __init__(self, saldo):
        self._saldo = saldo  # Atributo "protegido"

    def depositar(self, cantidad):
        self._saldo += cantidad

    def obtener_saldo(self):
        return self._saldo`,

  // Polimorfismo simple - Gato y Perro
  polimorfismoSimple: `class Gato:
    def hablar(self):
        print("Miau")

class Perro:
    def hablar(self):
        print("Guau")

animales = [Gato(), Perro()]
for animal in animales:
    animal.hablar()  # Miau, Guau`,

  // Polimorfismo con herencia
  polimorfismoHerencia: `class Animal:
    def __init__(self, nombre):
        self.nombre = nombre

    def hablar(self):
        print(f"{self.nombre} hace un sonido")

class Gato(Animal):
    def hablar(self):
        print(f"{self.nombre} dice: Miau")

class Perro(Animal):
    def hablar(self):
        print(f"{self.nombre} dice: Guau")

animales = [Gato("Michi"), Perro("Fido")]
for animal in animales:
    animal.hablar()
# Michi dice: Miau
# Fido dice: Guau`,

  // ============================================
  // ACTO 2: Clase Usuarios - Tu codigo real
  // ============================================

  // Clase Usuarios completa
  usuariosClassFull: `class Usuarios:
    def __init__(self):
        self.miembros = []

    def get_all_members(self):
        return self.miembros

    def get_one_member(self, indice):
        user = next((u for u in self.miembros if u['id'] == indice), None)
        return user

    def add_member(self, nombre):
        self.miembros.append(nombre)
        return f"Miembro '{nombre}' agregado."

    def edit_member(self, indice, nuevo_nombre):
        if 0 <= indice < len(self.miembros):
            anterior = self.miembros[indice]
            self.miembros[indice] = nuevo_nombre
            return f"Miembro '{anterior}' editado a '{nuevo_nombre}'."
        return "Indice fuera de rango."

    def delete_member(self, indice):
        if 0 <= indice < len(self.miembros):
            eliminado = self.miembros.pop(indice)
            return f"Miembro '{eliminado}' eliminado."
        return "Indice fuera de rango."`,

  // Constructor de Usuarios
  usuariosInit: `class Usuarios:
    def __init__(self):
        self.miembros = []  # Lista vacia para guardar usuarios`,

  // Metodo get_all_members
  usuariosGetAll: `def get_all_members(self):
    return self.miembros`,

  // Metodo get_one_member
  usuariosGetOne: `def get_one_member(self, indice):
    user = next((u for u in self.miembros if u['id'] == indice), None)
    return user`,

  // Metodo add_member
  usuariosAdd: `def add_member(self, nombre):
    self.miembros.append(nombre)
    return f"Miembro '{nombre}' agregado."`,

  // Metodo edit_member
  usuariosEdit: `def edit_member(self, indice, nuevo_nombre):
    if 0 <= indice < len(self.miembros):
        anterior = self.miembros[indice]
        self.miembros[indice] = nuevo_nombre
        return f"Miembro '{anterior}' editado a '{nuevo_nombre}'."
    return "Indice fuera de rango."`,

  // Metodo delete_member
  usuariosDelete: `def delete_member(self, indice):
    if 0 <= indice < len(self.miembros):
        eliminado = self.miembros.pop(indice)
        return f"Miembro '{eliminado}' eliminado."
    return "Indice fuera de rango."`,

  // ============================================
  // ACTO 3: Integracion Flask - Endpoints reales
  // ============================================

  // Setup de Flask
  flaskSetup: `from flask import Flask, jsonify, request, abort
from entities import Usuarios

app = Flask(__name__)

# Instancia de la clase Usuario
usuarios = Usuarios()

# Inicializar con datos de ejemplo
usuarios.add_member({"id": 1, "name": "Ana", "email": "ana@email.com"})
usuarios.add_member({"id": 2, "name": "Luis", "email": "luis@email.com"})
usuarios.add_member({"id": 3, "name": "Marta", "email": "marta@email.com"})`,

  // GET todos los usuarios
  flaskGetAll: `@app.route('/users', methods=['GET'])
def get_users():
    users = usuarios.get_all_members()
    return jsonify(users)`,

  // GET un usuario por ID
  flaskGetOne: `@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = usuarios.get_one_member(user_id)
    if user:
        return jsonify(user)
    abort(404, description='Usuario no encontrado')`,

  // POST crear usuario
  flaskPost: `@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data or 'name' not in data or 'email' not in data:
        abort(400, description='Datos invalidos')

    new_id = max((u['id'] for u in usuarios.miembros), default=0) + 1
    new_user = {
        'id': new_id,
        'name': data['name'],
        'email': data['email']
    }
    usuarios.add_member(new_user)
    return jsonify(new_user), 201`,

  // PUT actualizar usuario
  flaskPut: `@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    indice = next((i for i, u in enumerate(usuarios.miembros)
                   if u['id'] == user_id), None)
    if indice is None:
        abort(404, description='Usuario no encontrado')

    user = usuarios.miembros[indice]
    user['name'] = data.get('name', user['name'])
    user['email'] = data.get('email', user['email'])
    usuarios.edit_member(indice, user)
    return jsonify(user)`,

  // DELETE eliminar usuario
  flaskDelete: `@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    indice = next((i for i, u in enumerate(usuarios.miembros)
                   if u['id'] == user_id), None)
    if indice is None:
        abort(404, description='Usuario no encontrado')

    usuarios.delete_member(indice)
    return jsonify({'message': 'Usuario eliminado'})`,

  // Estructura del proyecto
  projectStructure: `src/
  |-- app.py          # Flask API (endpoints)
  |-- entities/
      |-- __init__.py
      |-- usuarios.py # Clase Usuarios (POO)`,
};
