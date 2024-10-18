import Header from '../components/Header';
import Saludo from '../components/Saludo';
import Container from '../components/Container';
import Popup from '../components/PopUp';
import Levels from '../components/Levels';
import React, { useState } from 'react';

const TrashControl = ({addContainer, deleteContainer, updateContainer, containers}) => {

    const [showPopup, setShowPopup] = useState(false);
    const [selectedContainer, setSelectedContainer] = useState(null)

    const togglePopup = () => {
        setShowPopup(!showPopup)
        if (!showPopup) {
            setSelectedContainer(null)
        }
    }

    const selectContainer = (id) => {
        setSelectedContainer({...containers[id], id})
        setShowPopup(true)
    }
    return (
        <>
            <Header />
            <div className="contenedorMain">
                <Saludo />
                <div className="buttons">
                    <button>Home</button>
                    <button>Gráficos</button>
                </div>
                <Levels />
                <div className="addContainer">
                    <h2>Basureros Activos</h2>
                    <button onClick={togglePopup}>Agregar basurero</button>
                </div>
                <Popup  show={showPopup} 
                        handleClose={togglePopup} 
                        handleSubmit={selectedContainer ? updateContainer : addContainer}
                        selectedContainer={selectedContainer}/>

                <Container  selectContainer = {selectContainer}
                            deleteContainer = {deleteContainer}
                            containers={containers} />
            </div>

        </>
    );
};

export default TrashControl;