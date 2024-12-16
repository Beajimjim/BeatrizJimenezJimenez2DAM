from funcionescorreo import *  # Importa funciones para enviar y recibir correos desde un módulo externo
from flask import Flask, render_template, request, jsonify, send_from_directory  # Importa componentes esenciales de Flask
import os  # Importa el módulo `os` para manejar rutas de archivos

app = Flask(__name__)  # Crea una aplicación Flask

# Define una nueva ruta estática para la carpeta `public`
@app.route('/public/<path:filename>')
def public_static(filename):
    # Sirve archivos estáticos desde la carpeta `public`
    return send_from_directory(os.path.join(app.root_path, 'public'), filename)

@app.route("/")
def index():
    # Renderiza el archivo `index.html` ubicado en la carpeta `templates`
    return render_template("index.html")

@app.route("/recibir")
def recibir_email():
    # Llama a la función `recibir()` desde el módulo `funcionescorreo`
    return recibir()

@app.route("/enviar", methods=["POST"])
def enviar_email():
    # Recibe datos en formato JSON desde el cuerpo de la solicitud
    data = request.get_json()
    asunto = data.get("asunto")  # Obtiene el asunto del correo
    para = data.get("para")  # Obtiene el destinatario del correo
    mensaje = data.get("mensaje")  # Obtiene el contenido del mensaje
    enviar("beajimjim@gmail.com", para, asunto, mensaje)  # Llama a la función `enviar()` para enviar el correo
    return jsonify({"status": "ok", "message": "ok"}), 200  # Devuelve una respuesta en formato JSON

@app.route("/recibir_por_fecha/<fecha>")
def recibir_email_por_fecha(fecha):
    # Llama a la función `recibir_por_fecha()` para buscar correos en una fecha específica
    mensaje = recibir_por_fecha(fecha)
    if mensaje:
        # Si encuentra un mensaje, lo devuelve en formato JSON
        return jsonify({"status": "ok", "email": mensaje}), 200
    else:
        # Si no encuentra un mensaje, devuelve un error
        return jsonify({"status": "error", "message": "Correo no encontrado para la fecha especificada"}), 404

if __name__ == "__main__":
    # Inicia el servidor Flask en modo de depuración
    app.run(debug=True)



# Explicación de las rutas
# /public/<path:filename>:

# Sirve archivos estáticos almacenados en la carpeta public.
# Ejemplo: Si se solicita /public/style.css, el servidor buscará el archivo style.css en la carpeta public.
# /:

# Renderiza la página principal (index.html) ubicada en la carpeta templates.
# /recibir:

# Llama a la función recibir() del módulo funcionescorreo, que probablemente recupera correos electrónicos.
# /enviar:

# Espera una solicitud POST con un JSON que contenga asunto, para, y mensaje.
# Usa la función enviar() para enviar el correo.
# Devuelve un JSON confirmando si el correo fue enviado.
# /recibir_por_fecha/<fecha>:

# Busca correos recibidos en una fecha específica usando recibir_por_fecha(fecha).
# Si encuentra un correo, devuelve sus detalles en formato JSON.
# Si no lo encuentra, devuelve un mensaje de error con código HTTP 404.
# Uso esperado
# Enviar correos:

# Hacer una solicitud POST a /enviar con un JSON como este:
# json
# Copiar código
# {
#   "asunto": "Prueba",
#   "para": "correo@ejemplo.com",
#   "mensaje": "Este es un mensaje de prueba."
# }
# El servidor intentará enviar el correo usando las funciones definidas en funcionescorreo.
# Recibir correos:

# Hacer una solicitud GET a /recibir para obtener todos los correos.
# Hacer una solicitud GET a /recibir_por_fecha/<fecha> para obtener correos de una fecha específica.