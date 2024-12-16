############### SERVIDOR

import socket  # Importa el módulo 'socket' para trabajar con sockets de red.

# Crea un socket para el servidor.
# AF_INET indica que usará direcciones IPv4.
# SOCK_STREAM especifica que usará un socket orientado a conexión (TCP).
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Asocia el socket del servidor a una dirección ('localhost') y un puerto (9999).
server.bind(('localhost', 9993))

# Configura el servidor para escuchar conexiones entrantes.
# El argumento '5' indica el número máximo de conexiones en cola que el servidor puede manejar.
server.listen(5)

# Informa al usuario que el servidor está en modo de escucha en el puerto 9999.
print(f"El servidor esta escuchando en:9999...")

# Acepta una conexión entrante.
# `accept()` es una operación bloqueante que espera hasta que un cliente se conecte.
# Devuelve un socket (`client_socket`) para comunicarse con el cliente y su dirección (`addr`).
client_socket, addr = server.accept()

# Imprime un mensaje indicando que se ha establecido una conexión con un cliente.
print(f"Conexion establecida con: {addr}")

# Inicia un bucle para manejar la comunicación con el cliente.
while True:
    # Recibe un mensaje del cliente.
    # `recv(1024)` especifica que puede recibir hasta 1024 bytes en una sola operación.
    # Los datos recibidos están en formato bytes y se decodifican a una cadena UTF-8.
    message = client_socket.recv(1024).decode('utf-8')
    
    # Si no se recibe ningún mensaje (el cliente cierra la conexión), se sale del bucle.
    if not message:
        print("El cliente ha cerrado la conexión.")
        break

    # Imprime el mensaje recibido del cliente.
    print(f"Mensaje recibido del cliente: {message}")
    
    # Prepara una respuesta para enviar de vuelta al cliente.
    respuesta = "Hola desde el servidor"
    
    # Envía la respuesta al cliente en formato bytes codificado como UTF-8.
    client_socket.send(respuesta.encode('utf-8'))
    
# Cierra el socket del cliente después de salir del bucle.
client_socket.close()
