import socket  # Importa la biblioteca para la comunicación en red
import json  # Manejo de archivos JSON para configuración
import os  # Manejo de operaciones con archivos y rutas del sistema
import sys  # Manejo de la salida del programa y excepciones

def load_client_config(config_path='client_config.json'):
    """
    Carga la configuración del cliente desde un archivo JSON.

    Parámetros:
    - config_path: Ruta al archivo de configuración JSON.

    Retorna:
    - Un diccionario con los valores de configuración cargados.
    """
    if not os.path.exists(config_path):
        # Si el archivo no existe, se muestra un error y se finaliza el programa
        print(f"[ERROR] Client configuration file '{config_path}' not found.")
        sys.exit(1)

    try:
        # Abre el archivo JSON en modo lectura
        with open(config_path, 'r') as config_file:
            config = json.load(config_file)  # Carga el contenido del archivo como un diccionario

            # Lista de campos obligatorios en la configuración
            required_fields = ['server_host', 'server_port']
            for field in required_fields:
                if field not in config:
                    # Si falta algún campo requerido, genera un error
                    raise ValueError(f"Missing '{field}' in client configuration.")

            return config  # Devuelve el diccionario con la configuración

    except json.JSONDecodeError as e:
        # Captura errores de sintaxis en el archivo JSON
        print(f"[ERROR] Failed to parse '{config_path}': {e}")
        sys.exit(1)

    except ValueError as ve:
        # Captura errores de valores faltantes en la configuración
        print(f"[ERROR] {ve}")
        sys.exit(1)

def start_client():
    """
    Inicia el cliente TCP y permite enviar mensajes al servidor.

    - Carga la configuración del cliente.
    - Conecta con el servidor.
    - Permite al usuario enviar mensajes.
    - Recibe y muestra la respuesta del servidor.
    """
    # Cargar la configuración del cliente desde el archivo JSON
    config = load_client_config()

    # Obtener la dirección del servidor y el puerto desde la configuración
    SERVER_HOST = config['server_host']
    SERVER_PORT = config['server_port']

    # Crear un socket para la conexión TCP
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
        try:
            # Intentar conectar con el servidor en la dirección y puerto especificados
            client.connect((SERVER_HOST, SERVER_PORT))
            print(f"[CONNECTED] Connected to server at {SERVER_HOST}:{SERVER_PORT}")

            while True:
                # Solicitar al usuario que ingrese un mensaje
                message = input("Enter message to send (type 'exit' to quit): ")
                
                # Si el usuario escribe 'exit', se cierra la conexión
                if message.lower() == 'exit':
                    print("[DISCONNECTING] Disconnecting from the server.")
                    break

                # Enviar el mensaje al servidor en formato de bytes
                client.sendall(message.encode('utf-8'))

                # Esperar la respuesta del servidor
                response = client.recv(1024)  # Recibe hasta 1024 bytes
                if not response:
                    # Si la respuesta está vacía, el servidor cerró la conexión
                    print("[DISCONNECTED] Server closed the connection.")
                    break

                # Decodificar la respuesta del servidor y mostrarla en pantalla
                print(f"Server response: {response.decode('utf-8')}")

        # Manejo de errores comunes en la conexión
        except ConnectionRefusedError:
            print(f"[ERROR] Could not connect to server at {SERVER_HOST}:{SERVER_PORT}. Is the server running?")
        except socket.gaierror:
            print(f"[ERROR] Invalid server address: {SERVER_HOST}")
        except KeyboardInterrupt:
            print("\n[EXIT] Client terminated by user.")
        except Exception as e:
            print(f"[ERROR] An unexpected error occurred: {e}")

# Ejecuta la función principal si el script es ejecutado directamente
if __name__ == "__main__":
    start_client()
