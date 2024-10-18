import React, { useEffect, useState } from 'react';

const Saludo = () => {
    const [saludo, setSaludo] = useState("");

    const obtenerSaludo = () => {
        const fecha = new Date();
        const hora = fecha.getHours();

        if (hora >= 6 && hora < 12) {
            return "Buenos días";
        } else if (hora >= 12 && hora < 19) {
            return "Buenas tardes";
        } else {
            return "Buenas noches";
        }
    };

    useEffect(() => {
        const saludoActual = obtenerSaludo();
        setSaludo(saludoActual);
    }, []);

    return (
        <h2>{saludo}</h2>
    );
};

export default Saludo;