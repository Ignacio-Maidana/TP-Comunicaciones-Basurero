// MonthlyChart.jsx
import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { getMonthlyData } from '../api';

const MonthlyChart = ({ binId }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const monthlyData = await getMonthlyData(binId);
                setData(monthlyData);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los datos mensuales');
                setLoading(false);
            }
        };

        fetchData();
    }, [binId]);

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
            <Bar data={data} />
        </div>
    );
}

export default MonthlyChart;