import requests  # Para hacer peticiones HTTP a páginas web
from bs4 import BeautifulSoup  # Para analizar (parsear) el HTML de las páginas web
import sqlite3  # Para manejar bases de datos SQLite
from urllib.parse import urlparse, urlunparse  # Para manipular URLs
import time  # Para hacer pausas entre solicitudes
import random  # Para generar pausas aleatorias y evitar bloqueos

def clear_url_parameters(url):
    """
    Función para limpiar una URL, eliminando los parámetros de consulta.
    Esto ayuda a almacenar URLs más limpias en la base de datos.
    """
    parsed_url = urlparse(url)  # Separa la URL en sus componentes
    cleaned_url = urlunparse((parsed_url.scheme, parsed_url.netloc, parsed_url.path, '', '', ''))  
    return cleaned_url  # Retorna la URL sin parámetros

# Lista de criterios de búsqueda en Páginas Amarillas
criterios = [
    'web',
    'diseño-web',
    'programacion',
    'html',
    'informática',
    'ordenadores',
    'marketing',
    'aplicaciones',
    'informatico',
    'aplicaciones',  # Repetido, pero no afecta la ejecución
    'desarrollo',
    'soporte-informatico'
]

# Bucle para iterar sobre cada criterio de búsqueda
for criterio in criterios:
    pagina = 1  # Se inicia en la primera página de resultados
    while pagina < 5:  # Se recorren las primeras 4 páginas de resultados

        # Construcción de la URL con el criterio y número de página
        url = f'https://www.paginasamarillas.es/search/{criterio}/all-ma/sevilla/all-is/valencia/all-ba/all-pu/all-nc/{pagina}?what={criterio}&where=Sevilla'

        # Definición de los encabezados HTTP para simular un navegador real
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
        }

        # Realiza una petición GET a la URL
        response = requests.get(url, headers=headers)

        # Verifica si la solicitud fue exitosa (código 200)
        if response.status_code == 200:
            # Parsea el contenido HTML de la página
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Busca todas las etiquetas <a> con la clase "web" (enlaces de sitios web)
            a_tags = soup.find_all('a', class_='web')
            
            # Extrae los enlaces de los resultados
            targets = [a.get('href') for a in a_tags]
            
            # Conectar a la base de datos SQLite (o crearla si no existe)
            conn = sqlite3.connect('mercado.db')
            cursor = conn.cursor()
            
            # Crear la tabla si no existe
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS target_attributes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    target TEXT NOT NULL
                )
            ''')
            
            # Insertar cada enlace en la base de datos después de limpiarlo
            for target in targets:
                cursor.execute('INSERT INTO target_attributes (target) VALUES (?)', (clear_url_parameters(target),))
            
            # Guardar los cambios y cerrar la conexión con la base de datos
            conn.commit()
            conn.close()
            
            print(f"Successfully saved {len(targets)} target attributes to the database.")
        else:
            # Si la solicitud no es exitosa, mostrar el código de error
            print(f"Failed to retrieve the webpage. Status code: {response.status_code}")

        # Esperar entre 2 y 5 segundos antes de la siguiente solicitud para evitar bloqueos
        time.sleep(random.randint(2,5))
        
        # Pasar a la siguiente página de resultados
        pagina += 1
