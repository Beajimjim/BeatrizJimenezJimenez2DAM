import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Configuración del servidor SMTP en localhost
smtp_server = "127.0.0.1"  # O usa "localhost"
smtp_port = 25  # Puerto estándar SMTP sin TLS

def enviar(desde, para, asunto, mensaje):
    # Crear el mensaje
    msg = MIMEMultipart()
    msg['From'] = desde
    msg['To'] = para
    msg['Subject'] = asunto
    # Cuerpo del mensaje
    msg.attach(MIMEText(mensaje, "plain"))

    try:
        # Conectar al servidor SMTP en localhost
        server = smtplib.SMTP(smtp_server, smtp_port)
        # No se requiere autenticación
        server.sendmail(desde, para, msg.as_string())
        print("Correo enviado correctamente desde localhost2.")
    except Exception as e:
        print(f"Error al enviar el correo: {e}")
    finally:
        server.quit()

# Prueba de envío
enviar(
    desde="test@localhost",
    para="destinatario@localhost",
    asunto="Prueba desde localhost",
    mensaje="Este es un correo enviado desde Mercury Mail en localhost."
)
