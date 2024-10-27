import React from "react";
import { Bar } from 'react-chartjs-2';

const MonthlyChart = ({data}) => {

    if (!data || !data.labels || !data.datasets) {
        // Si los datos no están disponibles aún, puedes retornar un valor por defecto o un mensaje
        return <div>No hay datos disponibles para mostrar el gráfico.</div>;
    }

    const defaultData = {
        labels: ['Sin datos'],
        datasets: [
        {
            label: 'Nivel de basura',
            data: [0],  // Valor por defecto
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        ],
    };
    
    const chartData = data || defaultData;  // Usa datos reales si están disponibles
    
    return <Bar data={chartData} />;
}

export default MonthlyChart