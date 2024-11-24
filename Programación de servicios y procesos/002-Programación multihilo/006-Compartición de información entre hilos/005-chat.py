from flask import Flask
# Importa la clase Flask para crear una aplicación web.

mensajes = []
# Declara una lista global llamada `mensajes` que inicialmente está vacía.
# Esta lista será utilizada para almacenar mensajes.

app = Flask(__name__)
# Crea una instancia de Flask para inicializar la aplicación.

@app.route('/')
# Define una ruta para el endpoint raíz (`/`).
# Cuando se acceda a esta ruta, se ejecutará la función `inicio`.

def inicio():
    # Devuelve el mensaje "Hola mundo" cuando un cliente accede a la ruta raíz.
    return "Hola mundo"
    
@app.route('/dame')
# Define una ruta adicional (`/dame`) que devuelve el contenido de la lista `mensajes`.

def dame():
    global mensajes
    # Declara la variable `mensajes` como global para asegurarse de que accede a la lista global.
    return str(mensajes)
    # Convierte la lista `mensajes` a una cadena de texto y la devuelve como respuesta.

if __name__ == '__main__':
    # Comprueba si este archivo está siendo ejecutado directamente.
    app.run(debug=True, host='192.168.1.225')
    # Inicia el servidor Flask en modo de depuración y lo hace accesible en la dirección `192.168.1.225`.
    # - `debug=True`: Permite reinicios automáticos y muestra mensajes detallados de error.
    # - `host='192.168.1.225'`: Hace el servidor accesible en esta dirección dentro de la red local.


# Ruta /:

# Cuando accedes a http://192.168.1.225:5000/, se ejecuta la función inicio que devuelve el mensaje "Hola mundo".
# Ruta /dame:

# Cuando accedes a http://192.168.1.225:5000/dame, se ejecuta la función dame que devuelve el contenido actual de la lista mensajes como una cadena.