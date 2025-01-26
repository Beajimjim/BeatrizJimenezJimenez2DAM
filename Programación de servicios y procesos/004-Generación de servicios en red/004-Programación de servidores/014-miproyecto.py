import psutil
import time
import subprocess

interval = 1

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

# Function to calculate network usage over a given interval
def get_network_usage(interval):
    initial_net_io = psutil.net_io_counters()
    time.sleep(interval)
    net_io = psutil.net_io_counters()
    subida = (net_io.bytes_sent - initial_net_io.bytes_sent) / interval
    descarga = (net_io.bytes_recv - initial_net_io.bytes_recv) / interval
    return subida, descarga

print("Empezamos el cálculo de valores normales")

# Calculate average values over 10 seconds
total_subida = 0
total_descarga = 0

for _ in range(10):
    s, d = get_network_usage(interval)
    total_subida += s
    total_descarga += d

subida = total_subida / 10
descarga = total_descarga / 10
print(f"Valores normales: Subida={subida:.2f} bytes/s, Descarga={descarga:.2f} bytes/s")

print("Ahora comenzamos la toma de datos en tiempo real")

# Monitor real-time network usage
previous_net_io = psutil.net_io_counters()

while True:
    current_net_io = psutil.net_io_counters()
    # Get network usage for the last second
    nuevasubida = (current_net_io.bytes_sent - previous_net_io.bytes_sent) / interval
    nuevadescarga = (current_net_io.bytes_recv - previous_net_io.bytes_recv) / interval
    
    # Update the previous I/O counters
    previous_net_io = current_net_io
    
    # Check for anomalies
    if nuevasubida > subida * 5 or nuevadescarga > descarga * 5:
        print(f"Anomalía detectada: Subida={nuevasubida:.2f} bytes/s, Descarga={nuevadescarga:.2f} bytes/s")
        print("Deteniendo Apache debido a una anomalía en la red...")
        stop_apache()
        break  # Detenemos el monitoreo después de detener Apache
    else:
        print(f"Normal: Subida={nuevasubida:.2f} bytes/s, Descarga={nuevadescarga:.2f} bytes/s")
    
    time.sleep(interval)
