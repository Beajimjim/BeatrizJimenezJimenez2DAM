import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import imaplib
import email
from email.header import decode_header

# Configuración del servidor de correo
USERNAME = "beajimjim93@gmail.com"  # Dirección de correo electrónico
PASSWORD = "vplt bnpz kidc oqed"  # Contraseña de aplicación de Gmail
IMAP_SERVER = "imap.gmail.com"  # Servidor IMAP para recibir correos
SMTP_SERVER = "smtp.gmail.com"  # Servidor SMTP para enviar correos
SMTP_PORT = 587  # Puerto SMTP estándar para conexión TLS

# Función para enviar correos electrónicos
def enviar_correo(asunto, para, mensaje):
    """
    Envía un correo electrónico a través del servidor SMTP configurado.

    :param asunto: Título del correo
    :param para: Dirección del destinatario
    :param mensaje: Contenido del correo
    :return: Diccionario con el estado del envío
    """
    try:
        # Crear el mensaje de correo
        msg = MIMEMultipart()  # Crea un contenedor para el correo
        msg['From'] = USERNAME  # Dirección de remitente
        msg['To'] = para  # Dirección del destinatario
        msg['Subject'] = asunto  # Asunto del correo
        msg.attach(MIMEText(mensaje, "plain"))  # Adjunta el mensaje en texto plano

        # Conectar al servidor SMTP
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)  # Conecta al servidor SMTP
        server.starttls()  # Inicia una conexión segura usando TLS
        server.login(USERNAME, PASSWORD)  # Inicia sesión en el servidor
        server.sendmail(USERNAME, para, msg.as_string())  # Envía el correo
        server.quit()  # Cierra la conexión con el servidor

        return {"status": "ok", "message": "Correo enviado con éxito"}  # Éxito
    except Exception as e:
        return {"status": "error", "message": str(e)}  # Manejo de errores

# Función para recibir correos electrónicos
def recibir_correos():
    """
    Recupera los últimos 5 correos electrónicos de la bandeja de entrada.

    :return: Lista de correos con asunto, remitente y contenido.
    """
    try:
        # Conectar al servidor IMAP
        mail = imaplib.IMAP4_SSL(IMAP_SERVER)  # Conexión segura con el servidor IMAP
        mail.login(USERNAME, PASSWORD)  # Inicia sesión
        mail.select("inbox")  # Selecciona la bandeja de entrada

        # Buscar todos los correos
        _, messages = mail.search(None, "ALL")  # Recupera todos los correos
        mail_ids = messages[0].split()  # Divide los identificadores de correo

        correos = []
        for mail_id in mail_ids[-5:]:  # Recupera los últimos 5 correos
            _, msg_data = mail.fetch(mail_id, "(RFC822)")  # Recupera el contenido completo
            for response_part in msg_data:
                if isinstance(response_part, tuple):  # Verifica que sea parte válida del correo
                    msg = email.message_from_bytes(response_part[1])  # Decodifica el correo
                    # Decodificar el asunto
                    subject, encoding = decode_header(msg["Subject"])[0]  # Obtiene y decodifica el asunto
                    if isinstance(subject, bytes):  # Decodifica si el asunto está en bytes
                        subject = subject.decode(encoding if encoding else "utf-8")
                    # Obtener el remitente
                    from_ = msg.get("From")  # Extrae el remitente
                    # Obtener el cuerpo
                    if msg.is_multipart():  # Si el correo tiene múltiples partes (ej. texto y HTML)
                        for part in msg.walk():
                            if part.get_content_type() == "text/plain":  # Busca la parte de texto plano
                                body = part.get_payload(decode=True).decode("utf-8")
                                break
                    else:
                        body = msg.get_payload(decode=True).decode("utf-8")  # Si es una sola parte, decodifica directamente
                    # Agrega el correo a la lista
                    correos.append({"asunto": subject, "de": from_, "mensaje": body})

        mail.logout()  # Cierra la sesión en el servidor
        return correos  # Devuelve la lista de correos
    except Exception as e:
        return {"status": "error", "message": str(e)}  # Manejo de errores


# Desglose de las funciones principales
# enviar_correo(asunto, para, mensaje)
# Preparación del mensaje:
# Usa MIMEMultipart para construir el mensaje con asunto, para y mensaje.
# Conexión al servidor SMTP:
# Conecta a smtp.gmail.com en el puerto 587.
# Inicia sesión usando las credenciales configuradas.
# Envia el mensaje con sendmail.
# Manejo de errores:
# Devuelve un mensaje de error si algo falla durante el envío.
# recibir_correos()
# Conexión al servidor IMAP:
# Conecta a imap.gmail.com usando una conexión SSL.
# Selecciona la bandeja de entrada.
# Recuperación de correos:
# Busca todos los correos y procesa los 5 últimos.
# Decodifica el asunto y el cuerpo del mensaje (en texto plano).
# Salida:
# Devuelve una lista de correos, cada uno con el asunto, remitente y mensaje.