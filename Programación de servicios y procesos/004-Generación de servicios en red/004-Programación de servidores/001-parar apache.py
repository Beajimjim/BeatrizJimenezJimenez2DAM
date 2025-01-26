import os
import subprocess

def stop_apache():
    try:
        # Encuentra el proceso httpd.exe
        result = subprocess.check_output(["tasklist"], universal_newlines=True)
        if "httpd.exe" in result:
            for line in result.splitlines():
                if "httpd.exe" in line:
                    pid = line.split()[1]  # Obtiene el PID del proceso
                    subprocess.run(["taskkill", "/PID", pid, "/F"], check=True)
                    print(f"Apache detenido con éxito. PID: {pid}")
                    return
        print("No se encontró ningún proceso de Apache ejecutándose.")
    except Exception as e:
        print(f"Error al detener Apache: {e}")

stop_apache()
5
