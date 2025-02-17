from flask import Flask, render_template, jsonify
import random
import datetime
import calendar
from collections import defaultdict

app = Flask(__name__, static_url_path='/flask')

#  Función para generar reservas aleatorias para un año completo, considerando días reales del mes
def generar_reservas():
    reservas = []
    año_actual = datetime.datetime.now().year

    # Generar reservas para cada mes (por ejemplo, 500 reservas por mes)
    for mes in range(1, 13):
        diasDelMes = calendar.monthrange(año_actual, mes)[1]  # Número de días en el mes
        for _ in range(500):
            dia_random = random.randint(1, diasDelMes)
            fecha = datetime.date(año_actual, mes, dia_random)
            # Excluir lunes (weekday() devuelve 0 para lunes)
            if fecha.weekday() == 0:
                continue
            reservas.append({"fecha": str(fecha)})
    return reservas

# Datos simulados de reservas históricas usando la nueva función
reservas_historicas = generar_reservas()

#  Agrupar reservas por día
def reservas_por_dia():
    conteo_dias = defaultdict(int)
    for reserva in reservas_historicas:
        conteo_dias[reserva["fecha"]] += 1
    return [{"fecha": fecha, "cantidad": cantidad} for fecha, cantidad in conteo_dias.items()]

#  Ruta de la API para obtener datos de reservas por día (para el calendario)
@app.route("/flask/reservas_calendario")
def get_reservas_calendario():
    return jsonify(reservas_por_dia())

#  Servir la página del calendario
@app.route("/flask/calendario")
def calendario():
    return render_template("calendario.html")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
