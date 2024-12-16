############### SERVIDOR

import socket  # Importa el módulo 'socket' para trabajar con sockets de red.

# Crea un objeto de socket para el servidor.
# AF_INET indica que usaremos direcciones IPv4.
# SOCK_STREAM indica que usaremos un socket orientado a conexión (TCP).
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Asocia el socket del servidor a una dirección y puerto específicos.
# En este caso, se está vinculando a 'localhost' (127.0.0.1) y al puerto 9999.
server.bind(('localhost', 9999))

# Configura el servidor para escuchar conexiones entrantes.
# El argumento '1' indica que puede manejar hasta 1 conexión en cola.
server.listen(1)

# Informa al usuario que el servidor está en modo de escucha.
print(f"El servidor esta escuchando en:9999...")

# Acepta una conexión entrante.
# `accept()` bloquea la ejecución hasta que un cliente se conecte.
# Devuelve un nuevo socket (`client_socket`) para comunicarse con el cliente,
# y la dirección del cliente (`addr`).
client_socket, addr = server.accept()

# Imprime un mensaje indicando que la conexión con un cliente se ha establecido.
print(f"Conexion establecida con: {addr}")

# Prepara un mensaje para enviar al cliente.
mensaje = "Hola desde el servidor"

# Envía el mensaje codificado en formato UTF-8 a través del socket del cliente.
client_socket.send(mensaje.encode('utf-8'))

# Cierra el socket del cliente para finalizar la conexión.
client_socket.close()
