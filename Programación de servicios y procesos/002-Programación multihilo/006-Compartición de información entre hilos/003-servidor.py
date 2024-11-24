from flask import Flask
# Importa la clase Flask desde el módulo Flask, que se utiliza para crear aplicaciones web.

app = Flask(__name__)
# Crea una instancia de la clase Flask.
# El argumento `__name__` ayuda a Flask a identificar la ubicación del módulo para recursos como plantillas o archivos estáticos.

@app.route('/')
# Define una ruta para el endpoint principal (la raíz `/` del servidor web).
# Cuando alguien acceda a esta URL, Flask ejecutará la función `inicio`.

def inicio():
    # Define la función que se ejecutará cuando el cliente acceda a la raíz del servidor.
    return "Hola mundo!"
    # Devuelve la cadena "Hola mundo!" como respuesta al cliente.

if __name__ == '__main__':
    # Comprueba si este archivo está siendo ejecutado directamente (no importado como módulo).
    app.run(debug=True, host='192.168.1.225')
    # Inicia el servidor en modo de depuración y configura la dirección IP y el puerto.
    # - `debug=True` activa el modo depuración (reinicio automático y mensajes detallados de error).
    # - `host='192.168.1.225'` configura la dirección IP en la red local donde se ejecutará el servidor.
