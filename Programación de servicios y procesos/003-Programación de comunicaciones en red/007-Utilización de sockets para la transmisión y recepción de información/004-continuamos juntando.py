import imaplib  # Biblioteca para interactuar con servidores IMAP
import email  # Biblioteca para procesar mensajes de correo
from email.header import decode_header  # Decodificar encabezados de correos electrónicos
import base64  # Biblioteca para codificar/decodificar en base64

# Credenciales de usuario
username = "mi_usuario"  # Nombre de usuario del cliente
password = "mi_contraseña"  # Contraseña del cliente

# Codificar las credenciales en base64
username_encoded = base64.b64encode(username.encode()).decode()
password_encoded = base64.b64encode(password.encode()).decode()

# Configuración del servidor IMAP
imap_server = "127.0.0.1"  # Dirección IP del servidor IMAP
username = "test@localhost"  # Nombre de usuario del cliente (puede ser 'test' si hay problemas)
password = "12345"  # Contraseña para el usuario configurado en el servidor

def recibir():
    try:
        # Conectar al servidor IMAP
        print(f"Conectando al servidor IMAP {imap_server}...")
        mail = imaplib.IMAP4(imap_server)  # Inicia la conexión con el servidor IMAP
        print("Conexión IMAP exitosa.")

        # Autenticación del usuario
        print(f"Iniciando sesión como {username}...")
        mail.login(username, password)  # Intenta iniciar sesión con las credenciales
        print("Autenticación IMAP exitosa.")

        # Seleccionar la bandeja de entrada
        mail.select("inbox")  # Selecciona la carpeta 'inbox' en el servidor
        status, messages = mail.search(None, "ALL")  # Busca todos los correos en la bandeja
        if status != "OK":  # Verifica si la búsqueda fue exitosa
            print("Error al buscar mensajes.")
            return

        # Obtener los IDs de los correos electrónicos
        mail_ids = messages[0].split()  # Divide los IDs de los mensajes en una lista
        print(f"Mensajes encontrados: {len(mail_ids)}")  # Muestra la cantidad de mensajes encontrados

        # Procesar cada correo
        for mail_id in mail_ids:
            status, msg_data = mail.fetch(mail_id, "(RFC822)")  # Recupera el contenido del correo
            if status != "OK":  # Verifica si el correo se obtuvo correctamente
                print(f"Error al obtener el correo con ID {mail_id}")
                continue

            # Procesar el contenido del correo
            for response_part in msg_data:
                if isinstance(response_part, tuple):  # Asegura que la respuesta sea válida
                    msg = email.message_from_bytes(response_part[1])  # Decodifica el correo
                    subject, encoding = decode_header(msg["Subject"])[0]  # Decodifica el asunto del correo
                    if isinstance(subject, bytes):  # Si el asunto está codificado en bytes
                        subject = subject.decode(encoding if encoding else "utf-8")  # Decodifica con el encoding correspondiente
                    print("Asunto:", subject)  # Muestra el asunto del correo

                    # Obtener el remitente
                    from_ = msg.get("From")
                    print("De:", from_)  # Muestra el remitente

                    # Obtener el cuerpo del correo
                    if msg.is_multipart():  # Si el mensaje tiene varias partes
                        for part in msg.walk():  # Itera sobre cada parte del mensaje
                            content_type = part.get_content_type()  # Obtiene el tipo de contenido
                            content_disposition = str(part.get("Content-Disposition"))
                            # Procesar solo texto plano sin adjuntos
                            if content_type == "text/plain" and "attachment" not in content_disposition:
                                body = part.get_payload(decode=True).decode("utf-8")  # Decodifica el cuerpo del mensaje
                                print("Cuerpo:", body)  # Muestra el contenido del correo
                    else:
                        body = msg.get_payload(decode=True).decode("utf-8")  # Decodifica el cuerpo si no es multipart
                        print("Cuerpo:", body)  # Muestra el contenido del correo
                    print("=" * 50)  # Separador para cada correo

        # Cerrar la conexión con el servidor
        mail.close()  # Cierra la bandeja seleccionada
        mail.logout()  # Cierra la sesión del usuario
    except imaplib.IMAP4.error as e:
        print(f"Error de IMAP: {e}")  # Maneja errores de IMAP
    except Exception as e:
        print(f"Error al recibir correos: {e}")  # Maneja errores generales

# Llamada a la función para recibir correos
recibir()


# Explicación del flujo
# Conexión al servidor IMAP:

# Conecta al servidor usando imaplib.IMAP4.
# La dirección del servidor es 127.0.0.1, lo que sugiere un servidor de correo local.
# Autenticación:

# Usa el nombre de usuario y contraseña proporcionados para iniciar sesión.
# Selección de la bandeja:

# Selecciona la bandeja inbox para buscar correos electrónicos.
# Búsqueda de correos:

# Recupera todos los correos en la bandeja con search(None, "ALL").
# Procesamiento de correos:

# Itera sobre los mensajes encontrados.
# Decodifica el asunto, remitente y cuerpo del correo.
# Imprime los detalles.
# Cierre de la conexión:

# Finaliza la conexión IMAP con mail.logout().
# Salida esperada
# Si se ejecuta correctamente:

# Muestra la cantidad de correos encontrados.
# Imprime el asunto, remitente y cuerpo de cada correo.