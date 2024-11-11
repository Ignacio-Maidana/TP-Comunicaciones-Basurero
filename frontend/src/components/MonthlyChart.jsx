import React, { useState, useEffect, useRef } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';


// Registrar las escalas "category", "linear" y el elemento "bar"
Chart.register(CategoryScale, LinearScale, BarElement);

const MonthlyChart = ({ binId }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    if (loading) {
        return <div>Cargando datos mensuales...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!data || !data.labels || !data.datasets) {
        return <div>No hay datos disponibles para mostrar el gráfico mensual.</div>;
    }

    return (
        <div>
            <h3>Datos Mensuales</h3>
            <Bar
                ref={chartRef}
                data={data}
                options={{
                    scales: {
                        y: {
                            type: 'linear',
                            position: 'left',
                        },
                        y1: {
                            type: 'linear',
                            position: 'right',
                            grid: {
                                drawOnChartArea: false,
                            },
                        },
                    },
                }}
            />
        </div>
    );
}

export default MonthlyChart;