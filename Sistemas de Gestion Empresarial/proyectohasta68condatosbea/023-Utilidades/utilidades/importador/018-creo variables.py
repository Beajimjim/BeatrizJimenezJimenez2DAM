import csv                                                          # Importo librería para trabajar con CSV
import pandas as pd                                                 # Importo la librería
import mysql.connector                                              # Importo conector de MySQL
import tkinter as tk
from tkinter import filedialog


ruta_archivo_excel = None


def definir():
    print("ok definimos archivo de entrada")
    global ruta_archivo_excel
    ruta_archivo_excel = filedialog.askopenfilename()

def vamosAlla():
    print("ok definimos archivo de entrada")

############################## CONEXION A MYSQL ################################

conexion = mysql.connector.connect(
            host="localhost",
            database="sistemagestionempresa",
            user="appsge",
            contrasena="appsge"
        )                                                                 # Me conecto a la base de datos

cursor = conexion.cursor()                                              # Creo un cursor

contenidoglobal = pd.read_excel("clientes.xlsx")                        # Leo el contenido del archivo de excel
lineas = len(contenidoglobal)                                           # Quiero saber cuantas lineas tengo que importar

for i in range(0,lineas):                                               # Hago un bucle for para asegurarme que pongo tantas lineas como sea necesario

    peticion = "INSERT INTO clientes (Identificador) VALUES (NULL)"     # Inserto un cliente VACIO
    print(peticion)
    cursor.execute(peticion)                                            # ejecuto la petición
    conexion.commit()                                                   # Lanzo la peticion

    peticion = "SELECT Identificador FROM clientes ORDER BY Identificador DESC LIMIT 1" # Dame unicamente el ultimo identificador que acabo de meter

    cursor.execute(peticion)                                            # Ejecuto la peticion

    resultado = cursor.fetchall()                                       # Obtengo el resultado
    identificador = resultado[0][0]                                     # Creo un identificador

    ############################## CONEXION A MYSQL ################################


    ############################## CARGO EL MAPEADO DE EXCEL A MYSQL ################################

    diccionario = {}                                                    # Creo un diccionario
    archivo = open('mapeado.csv', mode='r')                             # Abro el csv en modo lectura
    lectorcsv = csv.DictReader(archivo)                                 # Cargo sobre el diccionario el contenido del csv

    mapeado = {}                                                        # Creo un diccionario vacía

    for fila in lectorcsv:                                              # Para cada una de las filas del csv
        mapeado[fila['excel']] = fila['mysql']                          # Añado el diccionario a la lista

    #print(mapeado)                                                      # Lo imprimo para comprobar que todo va bien

    ############################## CARGO EL MAPEADO DE EXCEL A MYSQL ################################

    print("-------------------------------------------")

    ############################## LEO EXCEL ################################

    contenido = pd.read_excel("clientes.xlsx")                          # Leo el contenido del archivo de excel
    diccionario = contenido.to_dict()                                   # Lo convierto a diccionario de Python

    #print(diccionario)                                                  # imprimo el diccionario

    for clave in diccionario:                                           # PAra cada clave en el diccionario
        #print("clave excel:",clave)                                     # Imprimo la clave de excel
        #print("valor de esa clave:",diccionario[clave][0])              # Imprimo su contenido
        #print("La columna coincidente de MySQL es:",mapeado[clave])     # Imprimo la columna correspondiente en MySQL
        #print("--------")                                               # Separador visual
        peticion = "UPDATE clientes SET "+str(mapeado[clave])+" = '"+str(diccionario[clave][i])+"' WHERE Identificador = "+str(identificador)+";"
        print(peticion)
        cursor.execute(peticion)                                            # ejecuto la petición
        conexion.commit()                                                   # Lanzo la peticion

    ############################## LEO EXCEL ################################


ventana = tk.Tk()

nombre_tabla = tk.StringVar()

tk.Label(ventana,text="Primero carga el archivo de excel").pack(padx=10,pady=10)
tk.Button(ventana,text="Define el archivo de entrada",command=definir).pack(padx=10,pady=10)
tk.Label(ventana,text="Ahora indica el nombre de la tabla en la que vas a importar").pack(padx=10,pady=10)
tk.Entry(ventana,textvariable = nombre_tabla).pack(padx=10,pady=10)
tk.Label(ventana,text="Ahora ejecutamos").pack(padx=10,pady=10)
tk.Button(ventana,text="Vamos alla",command=vamosAlla).pack(padx=10,pady=10)

ventana.mainloop()



