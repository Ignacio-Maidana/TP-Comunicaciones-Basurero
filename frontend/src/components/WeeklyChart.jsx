import React, { useState, useEffect, useRef } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { getWeeklyData } from '../api';

// Registrar las escalas "category", "linear" y el elemento "bar"
Chart.register(CategoryScale, LinearScale, BarElement);

const WeeklyChart = ({ binId }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weeklyData = await getWeeklyData(binId);
                setData({
                    labels: weeklyData.labels,
                    datasets: [
                        {
                            label: 'Kg Estimados',
                            data: weeklyData.datasets[0].data,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            yAxisID: 'y',
                        },
                        {
                            label: 'Basura Recolectada',
                            data: weeklyData.datasets[1].data,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                            yAxisID: 'y1',
                        },
                    ],
                });
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los datos semanales');
                setLoading(false);
            }
        };

        fetchData();
    }, [binId]);

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    if (loading) {
        return <div>Cargando datos semanales...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!data || !data.labels || !data.datasets) {
        return <div>No hay datos disponibles para mostrar el gráfico semanal.</div>;
    }

    return (
        <div>
            <h3>Datos Semanales</h3>
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

export default WeeklyChart;