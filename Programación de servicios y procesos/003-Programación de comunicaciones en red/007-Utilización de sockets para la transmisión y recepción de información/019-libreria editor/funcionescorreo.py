import imaplib  # Librería para manejar conexiones IMAP y recuperar correos electrónicos
import email  # Librería para manejar correos electrónicos en formato MIME
from email.header import decode_header  # Para decodificar encabezados como el asunto

import smtplib  # Librería para manejar el envío de correos electrónicos usando SMTP
from email.mime.multipart import MIMEMultipart  # Para construir correos con múltiples partes (por ejemplo, texto y adjuntos)
from email.mime.text import MIMEText  # Para incluir texto plano en el cuerpo del correo

# Configuración de la cuenta de correo electrónico
username = "dam@jocarsa.com"  # Nombre de usuario para iniciar sesión en el servidor de correo
password = "TAME123$"  # Contraseña para autenticar la cuenta
imap_server = "imap.ionos.es"  # Dirección del servidor IMAP para recibir correos
smtp_server = "smtp.ionos.es"  # Dirección del servidor SMTP para enviar correos
smtp_port = 587  # Puerto SMTP estándar para conexiones seguras (STARTTLS)

# Función para enviar correos electrónicos
def enviar(desde, para, asunto, mensaje):
    # Crear el mensaje de correo con múltiples partes
    msg = MIMEMultipart()
    msg['From'] = desde  # Dirección del remitente
    msg['To'] = para  # Dirección del destinatario
    msg['Subject'] = asunto  # Asunto del correo

    # Agregar el cuerpo del mensaje como texto plano
    msg.attach(MIMEText(mensaje, "plain"))

    # Intentar enviar el correo
    try:
        # Conectar al servidor SMTP
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Iniciar la conexión segura usando STARTTLS
        server.login(username, password)  # Autenticarse con las credenciales

        # Enviar el correo al destinatario
        server.sendmail(msg['From'], msg['To'], msg.as_string())
        return {"mensaje": "Correo enviado correctamente"}  # Indicar éxito
    except Exception as e:
        # Manejar cualquier error que ocurra durante el proceso
        return {"mensaje": f"Error: {e}"}
    finally:
        server.quit()  # Cerrar la conexión con el servidor SMTP

# Función para recibir todos los correos de la bandeja de entrada
def recibir():
    # Conectar al servidor IMAP para acceder al buzón
    mail = imaplib.IMAP4_SSL(imap_server)
    mail.login(username, password)  # Iniciar sesión con las credenciales

    # Seleccionar el buzón de entrada (por defecto es 'INBOX')
    mail.select("inbox")

    # Buscar todos los correos en el buzón
    status, messages = mail.search(None, "ALL")
    mail_ids = messages[0].split()  # Obtener una lista de los IDs de los correos

    mensajes = []  # Lista para almacenar los correos recuperados

    # Iterar sobre los correos encontrados
    for mail_id in mail_ids:
        # Recuperar el contenido del correo usando su ID
        status, msg_data = mail.fetch(mail_id, "(RFC822)")
        
        for response_part in msg_data:  # Procesar cada parte de la respuesta
            if isinstance(response_part, tuple):  # Verificar si es un dato válido
                mensaje = {}  # Diccionario para almacenar información del correo

                # Decodificar el mensaje de correo
                msg = email.message_from_bytes(response_part[1])
                
                # Decodificar el asunto del correo
                subject, encoding = decode_header(msg["Subject"])[0]
                if isinstance(subject, bytes):
                    subject = subject.decode(encoding if encoding else "utf-8")
                mensaje["Asunto"] = subject  # Guardar el asunto en el diccionario
                
                # Obtener el remitente del correo
                from_ = msg.get("From")
                mensaje["De"] = from_

                # Obtener la fecha del correo
                date = msg.get("Date")
                mensaje["Fecha"] = date

                # Procesar el cuerpo del correo
                if msg.is_multipart():  # Si el correo tiene múltiples partes (texto y adjuntos)
                    for part in msg.walk():  # Iterar sobre cada parte del mensaje
                        content_type = part.get_content_type()  # Obtener el tipo de contenido
                        content_disposition = str(part.get("Content-Disposition"))  # Obtener la disposición
                        
                        # Buscar la parte del mensaje con texto plano
                        if content_type == "text/plain" and "attachment" not in content_disposition:
                            # Decodificar el contenido del cuerpo
                            body = part.get_payload(decode=True).decode("utf-8")
                            mensaje["Cuerpo"] = body  # Guardar el cuerpo en el diccionario
                else:
                    # Si no es multipart, obtener el cuerpo directamente
                    body = msg.get_payload(decode=True).decode("utf-8")
                    mensaje["Cuerpo"] = body

                # Agregar el mensaje a la lista
                mensajes.append(mensaje)

    # Cerrar la conexión con el buzón
    mail.close()
    mail.logout()
    return mensajes  # Retornar la lista de correos recuperados

# Función para recibir un correo electrónico específico por su fecha
def recibir_por_fecha(fecha_objetivo):
    # Conectar al servidor IMAP
    mail = imaplib.IMAP4_SSL(imap_server)
    mail.login(username, password)  # Autenticarse

    # Seleccionar la bandeja de entrada
    mail.select("inbox")

    # Buscar todos los correos
    status, messages = mail.search(None, "ALL")
    mail_ids = messages[0].split()  # Obtener IDs de los correos

    # Iterar sobre los correos encontrados
    for mail_id in mail_ids:
        # Recuperar el contenido del correo usando su ID
        status, msg_data = mail.fetch(mail_id, "(RFC822)")
        
        for response_part in msg_data:
            if isinstance(response_part, tuple):  # Verificar si es válido
                msg = email.message_from_bytes(response_part[1])  # Decodificar el mensaje

                # Obtener la fecha del correo
                date = msg.get("Date")
                
                # Comparar la fecha con la fecha objetivo
                if date == fecha_objetivo:
                    mensaje = {
                        "Asunto": msg["Subject"],  # Guardar el asunto
                        "De": msg["From"],  # Guardar el remitente
                        "Fecha": date  # Guardar la fecha
                    }

                    # Procesar el contenido del mensaje
                    if msg.is_multipart():  # Si tiene múltiples partes
                        for part in msg.walk():
                            if part.get_content_type() == "text/plain" and "attachment" not in str(part.get("Content-Disposition")):
                                body = part.get_payload(decode=True).decode("utf-8")
                                mensaje["Cuerpo"] = body  # Guardar el cuerpo
                    else:
                        # Si no es multipart, obtener el cuerpo directamente
                        body = msg.get_payload(decode=True).decode("utf-8")
                        mensaje["Cuerpo"] = body

                    mail.close()  # Cerrar el buzón
                    mail.logout()
                    return mensaje  # Retornar el correo encontrado

    # Cerrar conexión si no se encuentra el correo
    mail.close()
    mail.logout()
    return {"mensaje": "Correo no encontrado para la fecha especificada"}  # Retornar mensaje de error


# Resumen:
# Enviar correos:

# Usa la función enviar para enviar correos electrónicos con autenticación en SMTP.
# Es seguro y soporta conexiones seguras (STARTTLS).
# Recibir correos:

# La función recibir obtiene todos los correos de la bandeja de entrada.
# Decodifica y organiza la información en un formato legible (diccionario).
# Recibir por fecha:

# La función recibir_por_fecha busca correos específicos basados en la fecha.
# Seguridad:

# Es importante proteger las credenciales (username y password) para evitar accesos no autorizados.