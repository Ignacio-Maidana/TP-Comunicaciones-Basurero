import React, { useEffect, useState } from "react"
import { useLocation, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Header from "../components/Header"
import WeeklyChart from "../components/WeeklyChart"
import MonthlyChart from "../components/MonthlyChart"
import Details from "../components/Details"

const TrashDetails = () => {
    const location = useLocation();
    const { id } = useParams();
    const [container, setContainer] = useState(location.state?.container);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (container) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3001/api/bins/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch container data');
                }
                const data = await response.json();
                setContainer(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching container data:', error);
                setError('Error al cargar los datos del contenedor');
                setLoading(false);
            }
        };

        fetchData();
    }, [id, container]);
    
    if (loading) {
        return <ClipLoader color="#00BFFF" size={50} />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!container) {
        return <div>No se encontraron datos para este contenedor.</div>;
    }

    return (
        <>
            <Header/>
            <h2>Contenedor N°{container.id}</h2>
            <h3>Tipo: {container.tipo}</h3>
            <WeeklyChart binId={id} />
            <MonthlyChart binId={id} />
            <Details container={container}/>
        </>
    )
}

export default TrashDetails;