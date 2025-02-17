import sqlite3  # Importa la librería para manejar bases de datos SQLite

# Nombre del archivo de la base de datos
DATABASE = 'mercado.db'

def find_and_remove_duplicates(conn):
    """
    Busca y elimina correos electrónicos duplicados en la tabla 'emails'.
    """
    cursor = conn.cursor()  # Crea un cursor para ejecutar consultas SQL

    # Paso 1: Buscar correos electrónicos duplicados
    print("Searching for duplicate emails...")  # Mensaje de inicio

    cursor.execute('''
        SELECT email, COUNT(*) as count  # Selecciona los emails y cuenta cuántas veces se repiten
        FROM emails
        GROUP BY email  # Agrupa por email
        HAVING count > 1  # Filtra solo los emails que aparecen más de una vez
    ''')
    duplicates = cursor.fetchall()  # Obtiene los resultados de la consulta

    if not duplicates:  # Si no hay duplicados, muestra un mensaje y termina la función
        print("No duplicate emails found.")
        return

    print(f"Found {len(duplicates)} email(s) with duplicates.")  # Informa cuántos emails están duplicados

    # Paso 2: Eliminar duplicados, manteniendo solo una ocurrencia
    for email, count in duplicates:
        print(f"Processing email: {email} (found {count} times)")  # Muestra qué email se está procesando

        # Encuentra la primera aparición del email (con el menor rowid)
        cursor.execute('''
            SELECT MIN(rowid)
            FROM emails
            WHERE email = ?
        ''', (email,))
        min_rowid = cursor.fetchone()[0]  # Obtiene el ID más bajo de ese email

        # Elimina todas las ocurrencias del email excepto la primera
        cursor.execute('''
            DELETE FROM emails
            WHERE email = ? AND rowid != ?
        ''', (email, min_rowid))

        print(f"Removed {count - 1} duplicate(s) for email: {email}")  # Muestra cuántos duplicados se eliminaron

    # Guarda los cambios en la base de datos
    conn.commit()
    print("Duplicate removal completed.")  # Mensaje de confirmación

def main():
    """
    Función principal que se conecta a la base de datos y ejecuta la limpieza de duplicados.
    """
    conn = sqlite3.connect(DATABASE)  # Conecta a la base de datos

    find_and_remove_duplicates(conn)  # Llama a la función que elimina duplicados

    conn.close()  # Cierra la conexión con la base de datos
    print("Database connection closed.")  # Mensaje de cierre

# Si el script se ejecuta directamente, llama a la función main()
if __name__ == "__main__":
    main()
