from flask import Flask
# Importa la clase Flask desde el módulo Flask, que se utiliza para crear la aplicación web.

app = Flask(__name__)
# Crea una instancia de la clase Flask. 
# El argumento `__name__` le indica a Flask el nombre del módulo actual, lo cual ayuda a localizar recursos como plantillas y archivos estáticos.

@app.route('/')
# Define una ruta para el endpoint principal (la raíz `/` del servidor web).
# Esto asocia la URL `/` con la función `inicio`.

def inicio():
    # Define la función que se ejecutará cuando un cliente acceda a la raíz del servidor.
    return "Hola mundo!"
    # Responde con el texto "Hola mundo!" al cliente.

if __name__ == '__main__':
    # Comprueba si este archivo se está ejecutando directamente (no importado como módulo).
    app.run(debug=True)
    # Inicia el servidor web en modo de depuración. Esto:
    # - Permite el reinicio automático cuando se realizan cambios en el código.
    # - Muestra información detallada de errores en el navegador.
