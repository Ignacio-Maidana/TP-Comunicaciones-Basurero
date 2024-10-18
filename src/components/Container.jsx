import React from 'react';

const Container = ({containers, deleteContainer, selectContainer}) => {
    return(
        <div className="containterCard">
            {
                containers.map((containers, id) => (
                        <div key={containers.id}>
                            <span>Contenedor N° {containers.id}</span> 
                            <span>Tipo: {containers.type}</span>
                            <span>Ubicación: </span>{containers.location}
                            <span>Nivel de basura: {containers.level}</span>
                            <button onClick={()=>deleteContainer(containers.id)}>Eliminar Basurero</button>
                            <button onClick={()=>selectContainer(id)}>Modificar Basurero</button>
                            <button>Ver Detalles</button>
                        </div>
                    ))
            }
        </div>
    );
}

export default Container;