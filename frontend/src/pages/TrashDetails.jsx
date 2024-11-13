import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LightweightChart from '../components/LightweightChart';
import Header from '../components/Header';
import '../styles/TrashDetails.css';

const TrashDetails = () => {
    const { id } = useParams();
    const [chartData, setChartData] = useState([]);

    const fetchRegistros = useCallback(async () => {
        const response = await fetch(`http://localhost:4000/api/placa/${id}/registros`);
        const data = await response.json();

        // Filtra registros válidos y obtén solo los últimos 20
        const registros = data
            .filter((r) => r.porcentaje !== null && r.fecha) // Asegúrate de que los datos son válidos
            .slice(-20) // Obtiene los últimos 20 registros reales
            .reverse(); // Invierte para mostrar del más reciente al más antiguo

        const chartData = registros.map((r) => {
            const fecha = new Date(r.fecha);
            fecha.setHours(fecha.getHours() + 3); // Ajustar la hora sumando 3 horas
            return {
                time: fecha.getTime() / 1000, // Convertir a segundos
                value: r.porcentaje,
            };
        });

        setChartData(chartData);
    }, [id]);

    useEffect(() => {
        fetchRegistros();
    }, [fetchRegistros]);

    return (
        <>
            <Header />
            <div className="detailsContainer">
                <h2>Detalles de Basureros</h2>
                <h3>Gráfico Diario</h3>
                <button onClick={fetchRegistros}>Actualizar gráfico</button>
                {chartData.length > 0 ? (
                    <div className="chartContainer">
                        <LightweightChart data={chartData} />
                    </div>
                ) : (
                    <p className="chartPlaceholder">Gráfico en blanco</p>
                )}
            </div>
        </>
    );
};

export default TrashDetails;