import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email Configuration
smtp_server = "smtp.office365.com"  # SMTP server (use Gmail's SMTP server)
smtp_port = 587                # SMTP port for TLS
sender_email = "beatrizjimenez1993@hotmail.com"   # Replace with your email
sender_password = "1993BJJQSC"      # Replace with your password
receiver_email = "beajimjim93@gmail.com"  # Replace with recipient's email

# Email Content
subject = "Test Email from Python"
body = """
Hello,

This is a test email sent via Python's SMTP library.

Best regards,
Your Name
"""

try:
    # Create the Email
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    # Attach the email body
    message.attach(MIMEText(body, "plain"))

    # Connect to the SMTP server
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  # Start TLS encryption
    server.login(sender_email, sender_password)  # Login to the email account

    # Send the Email
    server.send_message(message)
    print("Email sent successfully!")

    # Quit the server
    server.quit()

except Exception as e:
    print(f"Error: {e}")
