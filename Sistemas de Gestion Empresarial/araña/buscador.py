import sqlite3  # Librería para manejar bases de datos SQLite
import tkinter as tk  # Librería para crear interfaces gráficas en Python
from tkinter import ttk, messagebox  # ttk para mejorar estilos, messagebox para mostrar alertas

def buscar():
    """
    Función que busca coincidencias en la base de datos según el término ingresado.
    """
    termino = entry_busqueda.get().strip()  # Obtiene el texto ingresado y elimina espacios en blanco
    if not termino:  # Si el campo está vacío, muestra una advertencia
        messagebox.showwarning("Entrada vacía", "Por favor, ingrese un término de búsqueda.")
        return  # Sale de la función sin hacer la búsqueda
    
    # Conectar a la base de datos
    conn = sqlite3.connect("mercado.db")
    cursor = conn.cursor()
    
    try:
        # Ejecuta la consulta SQL para buscar coincidencias en la tabla "target_attributes"
        cursor.execute("SELECT target FROM target_attributes WHERE target LIKE ?", (f"%{termino}%",))
        resultados = cursor.fetchall()  # Obtiene todos los resultados de la consulta
        
        lista_resultados.delete(*lista_resultados.get_children())  # Borra los resultados anteriores en la tabla

        if resultados:  # Si hay resultados, los muestra en la tabla
            for resultado in resultados:
                lista_resultados.insert("", "end", values=(resultado[0],))
        else:  # Si no hay resultados, muestra un mensaje informativo
            messagebox.showinfo("Sin resultados", "No se encontraron coincidencias.")
    except sqlite3.Error as e:  # Captura errores de la base de datos
        messagebox.showerror("Error", f"Error en la base de datos: {e}")
    finally:
        conn.close()  # Cierra la conexión con la base de datos

# Crear la ventana principal
root = tk.Tk()
root.title("Buscador en Base de Datos")  # Título de la ventana
root.geometry("650x450")  # Tamaño de la ventana
root.configure(bg="#f4f4f4")  # Color de fondo

# Estilos para mejorar la apariencia
style = ttk.Style()
style.configure("TButton", font=("Arial", 12), padding=5)  # Configura los botones
style.configure("TLabel", font=("Arial", 12))  # Configura las etiquetas de texto
style.configure("Treeview.Heading", font=("Arial", 12, "bold"))  # Configura el encabezado de la tabla

# Marco de búsqueda (para organizar mejor los elementos)
frame_busqueda = tk.Frame(root, bg="#f4f4f4")
frame_busqueda.pack(pady=15)  # Margen superior

# Etiqueta "Buscar"
lbl_busqueda = tk.Label(frame_busqueda, text="Buscar:", font=("Arial", 12), bg="#f4f4f4")
lbl_busqueda.pack(side=tk.LEFT, padx=5)

# Campo de entrada para la búsqueda
entry_busqueda = tk.Entry(frame_busqueda, width=40, font=("Arial", 12))
entry_busqueda.pack(side=tk.LEFT, padx=5)

# Botón para ejecutar la búsqueda
btn_buscar = ttk.Button(frame_busqueda, text="Buscar", command=buscar)
btn_buscar.pack(side=tk.LEFT, padx=5)

# Tabla para mostrar los resultados de la búsqueda
columns = ("Resultado",)
lista_resultados = ttk.Treeview(root, columns=columns, show="headings", height=12)
lista_resultados.heading("Resultado", text="Coincidencias en la Base de Datos")
lista_resultados.pack(expand=True, fill="both", padx=15, pady=10)

# Barra de desplazamiento vertical para la tabla
scroll_y = ttk.Scrollbar(root, orient="vertical", command=lista_resultados.yview)
lista_resultados.configure(yscroll=scroll_y.set)
scroll_y.pack(side="right", fill="y")

# Ejecutar la aplicación
root.mainloop()
