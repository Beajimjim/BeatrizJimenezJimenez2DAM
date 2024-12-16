import socket  # Importo la librería de sockets para trabajar con conexiones de red.
import os  # Importo la librería 'os' para interactuar con el sistema operativo.

# Defino una función para limpiar la pantalla, según el sistema operativo.
def clear_screen():
    # Comprueba el sistema operativo y ejecuta el comando adecuado.
    if os.name == 'nt':  # Para Windows
        os.system('cls')  # Comando para limpiar pantalla en Windows.
    else:  # Para macOS o Linux
        os.system('clear')  # Comando para limpiar pantalla en sistemas Unix.

# Creo un cliente usando un socket.
# AF_INET indica que se usa IPv4.
# SOCK_STREAM indica que el cliente usará TCP (orientado a conexión).
cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Establezco una conexión al servidor en la dirección 'localhost' (127.0.0.1) y el puerto 9999.
cliente.connect(('localhost', 9997))

# Entro en un bucle infinito para enviar mensajes al servidor y recibir respuestas.
while True:
    # Capturo la entrada del usuario desde la consola.
    mimensaje = input("Dime tu mensaje: ")

    # Envío el mensaje al servidor, codificado en formato UTF-8.
    cliente.send(mimensaje.encode('utf-8'))

    # Recibo la respuesta del servidor, hasta un máximo de 1024 bytes, y la decodifico de UTF-8 a texto legible.
    respuesta = cliente.recv(1024).decode('utf-8')
    
    # Limpio la pantalla para mostrar la respuesta de manera más clara.
    clear_screen()
    
    # Imprimo la respuesta recibida desde el servidor.
    print(f"{respuesta}")

    # Si el usuario escribe "salir" (en cualquier combinación de mayúsculas y minúsculas):
    if mimensaje.lower() == 'salir':
        # Imprimo un mensaje indicando que se cerrará la conexión.
        print("Cerrando la conexión con el servidor.")
        # Salgo del bucle.
        break

# Cierro la conexión del cliente para liberar los recursos.
cliente.close()
