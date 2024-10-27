import React, {useEffect, useState} from "react"
import Header from "../components/Header"
import WeeklyChart from "../components/WeeklyChart"
import MonthlyChart from "../components/MonthlyChart"
import Details from "../components/Details"
import { useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const TrashDetails = () => {

    const location = useLocation();
    const { container } = location.state;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            const simulatedData = {
            labels: ['Enero', 'Febrero', 'Marzo'],
            values: [50, 75, 100],
            };
        setData(simulatedData);
        setLoading(false);
        }, 1500); // Simulación de 2 segundos para cargar datos
    }, []);
    
    if (loading) {
        return <ClipLoader color="#00BFFF" size={50} />;
    }

    return (
    <>
        <Header/>
        <h2>Contenedor N°{container.id}</h2>
        <h3>Tipo: {container.type}</h3>
        <WeeklyChart data={data}/>
        <MonthlyChart data={data} />
        <Details container={container}/>
    </>
    )
}

export default TrashDetails