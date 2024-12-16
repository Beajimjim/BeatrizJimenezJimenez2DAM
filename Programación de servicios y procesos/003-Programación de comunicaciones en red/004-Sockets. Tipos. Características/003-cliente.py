############### CLIENTE

import socket  # Importa el módulo 'socket' para trabajar con sockets de red.

# Crea un objeto socket para el cliente.
# AF_INET indica que se utilizarán direcciones IPv4.
# SOCK_STREAM especifica un socket orientado a conexión (protocolo TCP).
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Define el host y el puerto al que el cliente se conectará.
host = 'localhost'  # Dirección IP o nombre del servidor. En este caso, el mismo equipo.
port = 9999  # Puerto en el que el servidor está escuchando conexiones.

# Establece la conexión con el servidor en la dirección y puerto especificados.
client_socket.connect((host, port))

# Recibe un mensaje del servidor.
# `recv(1024)` permite recibir hasta 1024 bytes de datos.
# Decodifica los datos recibidos de formato bytes a una cadena UTF-8.
mensaje = client_socket.recv(1024).decode('utf-8')

# Imprime el mensaje recibido del servidor en la consola.
print(f"He recibido el mensaje: {mensaje}")

# Cierra el socket del cliente para finalizar la conexión.
client_socket.close()
