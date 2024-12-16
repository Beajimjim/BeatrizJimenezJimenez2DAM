import socket  # Importa la librería 'socket' para trabajar con conexiones de red.
import threading  # Importa la librería 'threading' para manejar múltiples conexiones simultáneamente.

# Función para manejar la comunicación con un cliente.
# Recibe el socket del cliente y su dirección como argumentos.
def handle_client(client_socket, addr):
    print(f"Conexion establecida con: {addr}")  # Mensaje indicando que se ha conectado un cliente.
    
    while True:  # Bucle para manejar la comunicación con el cliente.
        try:
            # Recibe un mensaje del cliente. 
            # El tamaño máximo del mensaje es de 1024 bytes, y se decodifica en formato UTF-8.
            message = client_socket.recv(1024).decode('utf-8')
            
            # Si no hay mensaje (el cliente ha cerrado la conexión), rompe el bucle.
            if not message:
                print(f"El cliente {addr} ha cerrado la conexión.")
                break

            # Imprime el mensaje recibido del cliente.
            print(f"Mensaje recibido del cliente {addr}: {message}")
            
            # Prepara una respuesta para enviar de vuelta al cliente.
            respuesta = "Hola desde el servidor"
            
            # Envía la respuesta codificada como bytes al cliente.
            client_socket.send(respuesta.encode('utf-8'))
        
        # Maneja un error si la conexión con el cliente se cierra de forma abrupta.
        except ConnectionResetError:
            print(f"El cliente {addr} ha cerrado la conexión inesperadamente.")
            break
    
    # Cierra el socket del cliente al finalizar la comunicación.
    client_socket.close()

# Configuración del servidor
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # Crea un socket TCP para el servidor.
server.bind(('localhost', 9996))  # Asocia el socket del servidor a 'localhost' y al puerto 9997.
server.listen(5)  # Configura el servidor para escuchar un máximo de 5 conexiones en cola.

print("El servidor esta escuchando en: 9998...")  # Mensaje indicando que el servidor está en modo de escucha.

# Bucle principal del servidor para aceptar conexiones entrantes.
while True:
    # Espera y acepta una nueva conexión entrante.
    # Devuelve un socket (`client_socket`) para la comunicación y la dirección (`addr`) del cliente.
    client_socket, addr = server.accept()
    
    # Crea un nuevo hilo para manejar la comunicación con el cliente conectado.
    client_thread = threading.Thread(target=handle_client, args=(client_socket, addr))
    
    # Inicia el hilo, permitiendo que el servidor maneje múltiples clientes simultáneamente.
    client_thread.start()
