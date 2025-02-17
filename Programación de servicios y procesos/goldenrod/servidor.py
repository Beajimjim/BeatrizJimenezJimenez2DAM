import socket  # Biblioteca para la comunicación en red (TCP/IP)
import threading  # Manejo de múltiples clientes simultáneamente (multithreading)
import json  # Manejo de archivos de configuración en formato JSON
import os  # Operaciones con archivos y rutas en el sistema
import sys  # Manejo de excepciones y salida del programa

def load_server_config(config_path='server_config.json'):
    """
    Carga la configuración del servidor desde un archivo JSON.

    Parámetros:
    - config_path (str): Ruta del archivo de configuración.

    Retorna:
    - config (dict): Diccionario con la configuración cargada.
    """
    if not os.path.exists(config_path):
        # Si el archivo no existe, muestra un error y detiene el programa
        print(f"[ERROR] Server configuration file '{config_path}' not found.")
        sys.exit(1)

    try:
        # Abre el archivo de configuración en modo lectura
        with open(config_path, 'r') as config_file:
            config = json.load(config_file)  # Carga los datos JSON en un diccionario

            # Lista de campos obligatorios en la configuración
            required_fields = ['host', 'port', 'message_file']
            for field in required_fields:
                if field not in config:
                    raise ValueError(f"Missing '{field}' in server configuration.")

            return config  # Devuelve la configuración cargada

    except json.JSONDecodeError as e:
        # Captura errores de sintaxis en el archivo JSON
        print(f"[ERROR] Failed to parse '{config_path}': {e}")
        sys.exit(1)

    except ValueError as ve:
        # Captura errores si faltan valores requeridos en la configuración
        print(f"[ERROR] {ve}")
        sys.exit(1)

def handle_client(conn, addr, message_file):
    """
    Maneja la comunicación con un cliente conectado.

    Parámetros:
    - conn: Objeto de conexión con el cliente.
    - addr: Dirección IP y puerto del cliente.
    - message_file: Archivo donde se guardarán los mensajes recibidos.
    """
    print(f"[NEW CONNECTION] {addr} connected.")  # Mensaje al recibir una nueva conexión

    with conn:
        try:
            while True:
                # Recibir datos del cliente (hasta 1024 bytes)
                data = conn.recv(1024)
                
                # Si no hay datos, significa que el cliente cerró la conexión
                if not data:
                    break
                
                # Decodificar el mensaje recibido
                message = data.decode('utf-8')
                print(f"[RECEIVED] {addr}: {message}")

                # Guardar el mensaje en el archivo de texto
                with open(message_file, 'a') as file:
                    file.write(f"{addr}: {message}\n")

                # Preparar y enviar una respuesta al cliente
                response = f"Server received your message: {message}"
                conn.sendall(response.encode('utf-8'))

        except ConnectionResetError:
            # Manejar error si la conexión se interrumpe inesperadamente
            print(f"[DISCONNECTED] {addr} connection was reset.")

    print(f"[DISCONNECTED] {addr} disconnected.")  # Mensaje cuando el cliente se desconecta

def start_server():
    """
    Inicia el servidor, acepta conexiones y las maneja en hilos separados.
    """
    # Cargar la configuración del servidor desde el archivo JSON
    config = load_server_config()

    # Obtener los valores de configuración
    HOST = config['host']  # Dirección IP del servidor (ej. "0.0.0.0" para escuchar en todas las interfaces)
    PORT = config['port']  # Puerto en el que escuchará el servidor
    MESSAGE_FILE = config['message_file']  # Archivo donde se guardarán los mensajes recibidos

    # Crear el socket del servidor (IPv4, TCP)
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:
        # Permitir reutilización del puerto (evita errores si el servidor se reinicia rápido)
        server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

        # Intentar enlazar el socket a la dirección y puerto especificados
        try:
            server.bind((HOST, PORT))
        except socket.error as e:
            print(f"[ERROR] Failed to bind to {HOST}:{PORT}: {e}")
            sys.exit(1)

        # Escuchar conexiones entrantes
        server.listen()
        print(f"[LISTENING] Server is listening on {HOST}:{PORT}")

        while True:
            # Aceptar una nueva conexión de un cliente
            conn, addr = server.accept()

            # Crear un nuevo hilo para manejar la conexión del cliente
            client_thread = threading.Thread(target=handle_client, args=(conn, addr, MESSAGE_FILE))
            client_thread.start()

            # Mostrar la cantidad de conexiones activas (excluyendo el hilo principal)
            print(f"[ACTIVE CONNECTIONS] {threading.active_count() - 1}")

# Ejecuta el servidor si el script es ejecutado directamente
if __name__ == "__main__":
    print("[STARTING] Server is starting...")  # Mensaje de inicio
    start_server()
