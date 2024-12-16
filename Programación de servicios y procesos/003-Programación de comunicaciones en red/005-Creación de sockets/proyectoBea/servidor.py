from flask import Flask, request, render_template  # Importa Flask para manejar rutas y solicitudes
from flask_socketio import SocketIO, emit  # Importa SocketIO para comunicaciones en tiempo real
from flask_cors import CORS  # Importa CORS para habilitar solicitudes desde orígenes externos

# Configuración básica de la aplicación Flask
app = Flask(__name__)  # Inicializa la aplicación Flask
CORS(app)  # Habilita CORS para aceptar solicitudes de diferentes dominios
socketio = SocketIO(app, cors_allowed_origins="*")  # Configura Socket.IO con soporte para CORS

# Diccionario para rastrear usuarios conectados por sus identificadores de sesión (SID)
clients = {}

@app.route('/')
def index():
    """
    Ruta principal que devuelve la página HTML principal.
    Esta página será servida cuando los usuarios accedan al servidor.
    """
    return render_template('index.html')  # Sirve el archivo 'index.html' desde la carpeta 'templates'

@socketio.on('connect')
def handle_connect():
    """
    Evento que se ejecuta cuando un cliente se conecta al servidor.
    """
    sid = request.sid  # Obtiene el identificador único del cliente
    clients[sid] = True  # Agrega el cliente al diccionario de usuarios conectados
    print(f"Usuario conectado: {sid}")  # Imprime el SID del usuario conectado
    print(f"Usuarios conectados: {list(clients.keys())}")  # Lista todos los usuarios conectados
    emit('user_connected', {'id': sid}, broadcast=True, include_self=False)
    # Notifica a los demás usuarios que un nuevo usuario se ha conectado (excluye al emisor)

@socketio.on('disconnect')
def handle_disconnect():
    """
    Evento que se ejecuta cuando un cliente se desconecta del servidor.
    """
    sid = request.sid  # Obtiene el identificador único del cliente que se desconectó
    if sid in clients:
        del clients[sid]  # Elimina al cliente del diccionario
    print(f"Usuario desconectado: {sid}")  # Imprime el SID del usuario desconectado
    print(f"Usuarios restantes: {list(clients.keys())}")  # Lista los usuarios restantes
    emit('user_disconnected', {'id': sid}, broadcast=True)
    # Notifica a los demás usuarios que un usuario se ha desconectado

@socketio.on('send_video')
def handle_video(data):
    """
    Evento que se ejecuta cuando un cliente envía un frame de video.
    """
    sid = request.sid  # Obtiene el SID del cliente que envió el video
    # Reenviar el frame a todos los demás usuarios conectados
    for client_sid in clients:
        if client_sid != sid:  # No reenviar el frame al mismo cliente que lo envió
            emit('receive_video', {'id': sid, 'frame': data['frame']}, to=client_sid)
            # Envía el frame al cliente especificado

if __name__ == '__main__':
    """
    Punto de entrada principal del servidor.
    """
    socketio.run(app, host='0.0.0.0', port=5000)  # Ejecuta el servidor en el puerto 5000 y escucha en todas las IPs
