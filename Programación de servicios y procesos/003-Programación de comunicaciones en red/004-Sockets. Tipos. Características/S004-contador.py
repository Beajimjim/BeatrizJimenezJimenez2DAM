import socket  # Importo la librería para trabajar con conexiones de red.
import threading  # Importo la librería para manejar múltiples hilos (threads) y soportar múltiples clientes simultáneamente.

contador = 1  # Variable global que actúa como un contador para demostrar el estado del servidor.

# Función que maneja la comunicación con un cliente.
# Se ejecuta en un hilo separado por cada cliente que se conecta.
def handle_client(client_socket, addr):
    global contador  # Uso la variable global 'contador' dentro de la función.
    print(f"Conexion establecida con: {addr}")  # Mensaje que confirma que el cliente se ha conectado.

    # Bucle infinito para recibir y enviar mensajes del cliente.
    while True:
        try:
            # Recibo un mensaje del cliente. 
            # El tamaño máximo del mensaje es de 1024 bytes, y lo decodifico en UTF-8.
            message = client_socket.recv(1024).decode('utf-8')
            
            # Si no se recibe ningún mensaje, el cliente ha cerrado la conexión.
            if not message:
                print(f"El cliente {addr} ha cerrado la conexión.")  # Notifico el cierre de conexión.
                break  # Salgo del bucle.
            
            # Imprimo el mensaje recibido del cliente.
            print(f"Mensaje recibido del cliente {addr}: {message}")
            
            # Incremento el contador para demostrar que el servidor está funcionando.
            contador += 1
            
            # Preparo un mensaje de respuesta que incluye el valor del contador.
            respuesta = f"Hola desde el servidor y el contador es {contador}"
            
            # Envío el mensaje de respuesta al cliente.
            client_socket.send(respuesta.encode('utf-8'))
        
        # Capturo un error en caso de que el cliente cierre la conexión inesperadamente.
        except ConnectionResetError:
            print(f"El cliente {addr} ha cerrado la conexión inesperadamente.")  # Notifico el error.
            break  # Salgo del bucle.
    
    # Cierro el socket del cliente al finalizar la comunicación.
    client_socket.close()

# Configuración del servidor.
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # Creo un socket TCP para el servidor.
server.bind(('localhost', 9997))  # Asocio el socket a la dirección 'localhost' y al puerto 9997.
server.listen(5)  # Configuro el servidor para aceptar un máximo de 5 conexiones en cola.

print("El servidor esta escuchando en: 9997...")  # Notifico que el servidor está listo para aceptar conexiones.

# Bucle principal del servidor.
while True:
    # Acepto una nueva conexión entrante.
    # Devuelve un socket (`client_socket`) para la comunicación y la dirección (`addr`) del cliente.
    client_socket, addr = server.accept()
    
    # Creo un nuevo hilo para manejar la comunicación con el cliente conectado.
    client_thread = threading.Thread(target=handle_client, args=(client_socket, addr))
    
    # Inicio el hilo para gestionar al cliente de forma independiente.
    client_thread.start()
