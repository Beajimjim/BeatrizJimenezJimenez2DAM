from flask import Flask
# Importa la clase Flask desde el módulo Flask, que se utiliza para crear aplicaciones web.

inventario = 10
# Define una variable global llamada `inventario` que comienza con un valor de 10.

app = Flask(__name__)
# Crea una instancia de la clase Flask para inicializar la aplicación web.

@app.route('/')
# Define una ruta para el endpoint principal (la raíz `/` del servidor web).
# Cuando se acceda a esta ruta, se ejecutará la función `inicio`.

def inicio():
    global inventario
    # Declara la variable `inventario` como global para poder modificar su valor dentro de la función.
    inventario -= 1
    # Reduce en 1 el valor de `inventario` cada vez que se accede a esta ruta.
    return "Te quedan " + str(inventario) + " elementos en el inventario"
    # Devuelve un mensaje al cliente con la cantidad restante en el inventario.

if __name__ == '__main__':
    # Comprueba si este archivo está siendo ejecutado directamente (no importado como módulo).
    app.run(debug=True, host='192.168.1.151')
    # Inicia el servidor Flask en modo de depuración en la dirección IP `192.168.1.151`.
    # - `debug=True` habilita reinicio automático y mensajes de error detallados.
    # - `host='192.168.1.151'` hace que el servidor sea accesible desde otros dispositivos en la misma red local.
