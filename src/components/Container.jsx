import React from 'react';
import { Link } from 'react-router-dom';

const Container = ({containers, deleteContainer, selectContainer, handleDetailsClick}) => {
    return(
        <div className="containterCard">
            {
                containers.map((container, id) => (
                        <div key={container.id}>
                            <span>Contenedor N° {container.id}</span> 
                            <span>Tipo: {container.type}</span>
                            <span>Ubicación: </span>{container.location}
                            <span>Nivel de basura: {container.level}</span>
                            <button onClick={()=>deleteContainer(container.id)}>Eliminar Basurero</button>
                            <button onClick={()=>selectContainer(id)}>Modificar Basurero</button>
                            <button onClick={()=>handleDetailsClick(container)}>Ver Detalles</button>
                        </div>
                    ))
            }
        </div>
    );
}

export default Container;