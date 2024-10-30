import React from 'react';
import '../styles/Container.css'

const Container = ({containers, deleteContainer, selectContainer, handleDetailsClick}) => {
    return(
        <div>
            {
                containers.map((container) => (
                    <div key={container.id} className='containerCard'>
                        <div className="containerData">
                            <h2>Contenedor N° {container.id}</h2> 
                            <h3>Tipo: {container.tipo}</h3>
                            <h4>Ubicación: {container.ubicacion}</h4>
                            <h5>Estado: {container.estado || 'No especificado'}</h5>
                        </div>
                        <div className="containerButtons">
                            <button 
                                className='buttonDelete' 
                                onClick={() => deleteContainer(container.id)}
                            >
                                Eliminar Basurero
                            </button>
                            <button 
                                className='buttonEdit' 
                                onClick={() => selectContainer(container)}
                            >
                                Modificar Basurero
                            </button>
                            <button 
                                className='buttonDetails' 
                                onClick={() => handleDetailsClick(container)}
                            >
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Container;