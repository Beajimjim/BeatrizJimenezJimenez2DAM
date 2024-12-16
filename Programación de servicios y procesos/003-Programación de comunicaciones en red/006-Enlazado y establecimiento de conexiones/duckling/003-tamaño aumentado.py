import asyncio
import websockets
import json

connected_clients = set()  # Conjunto para almacenar clientes conectados

async def handle_client(websocket, path):  # Incluimos 'path' como argumento
    connected_clients.add(websocket)  # Añade el cliente conectado

    try:
        async for message in websocket:  # Maneja mensajes recibidos
            for client in list(connected_clients):  # Envía a todos los clientes
                if client != websocket:  # Evita enviar al cliente emisor
                    await client.send(message)
    except Exception as e:
        print(f"Error: {e}")  # Maneja excepciones
    finally:
        connected_clients.remove(websocket)  # Quita el cliente al desconectarse

async def main():
    # Inicia el servidor WebSocket en localhost:3000
    async with websockets.serve(
        handle_client,  # Función manejadora
        "localhost",    # Host
        3000,           # Puerto
        max_size=10 * 1024 * 1024  # Tamaño máximo del mensaje (10 MB)
    ):
        print("Servidor WebSocket corriendo en http://localhost:5000")
        await asyncio.Future()  # Mantiene el servidor ejecutándose indefinidamente

# Ejecutar el servidor
if __name__ == "__main__":
    asyncio.run(main())



# Descripción de cada sección
# Importaciones:

# asyncio: Para manejar programación asincrónica y eventos.
# websockets: Librería para trabajar con WebSocket en Python.
# json: Para manipular datos en formato JSON (aunque no se usa explícitamente en este ejemplo).
# connected_clients:

# Es un conjunto (set) que almacena los clientes actualmente conectados.
# Se usa un conjunto porque evita duplicados automáticamente.
# handle_client:

# Esta función se llama cada vez que un cliente se conecta al servidor.
# websocket: Representa la conexión WebSocket del cliente.
# path: La ruta de la conexión (puede ser útil para manejar diferentes tipos de mensajes o rutas).
# Almacena al cliente en el conjunto global connected_clients.
# Reenvía los mensajes recibidos a todos los demás clientes conectados (excepto al emisor).
# Maneja la desconexión del cliente eliminándolo del conjunto.
# main:

# Configura y ejecuta el servidor WebSocket.
# Usa websockets.serve para escuchar conexiones en localhost y el puerto 3000.
# Configura un tamaño máximo de mensajes (max_size) de 10 MB.
# Usa asyncio.Future para evitar que el servidor termine.
# Bloque if __name__ == "__main__"::

# Permite ejecutar la función principal solo cuando el script se ejecuta directamente (no si se importa como módulo).
# Ejecuta el servidor de forma asincrónica con asyncio.run.
