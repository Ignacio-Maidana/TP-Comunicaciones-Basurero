// WeeklyChart.jsx
import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { getWeeklyData } from '../api';

const WeeklyChart = ({ binId }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weeklyData = await getWeeklyData(binId);
                setData(weeklyData);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los datos semanales');
                setLoading(false);
            }
        };

        fetchData();
    }, [binId]);

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
            <Bar data={data} />
        </div>
    );
}

export default WeeklyChart;