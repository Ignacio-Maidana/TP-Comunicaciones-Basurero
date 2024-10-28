import React, { useState } from 'react';
import '../styles/TrashControl.css'
import Header from '../components/Header';
import Greeting from '../components/Greeting';
import Container from '../components/Container';
import Popup from '../components/PopUp';
import Levels from '../components/Levels';
import { Link, useNavigate} from 'react-router-dom';

const TrashControl = ({addContainer, deleteContainer, updateContainer, containers}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedContainer, setSelectedContainer] = useState(null)

    const navigate = useNavigate()

    const handleDetailsClick = (container) => {
        navigate(`/container/${container.id}`, { state: { container } });
    };

    const togglePopup = () => {
        setShowPopup(!showPopup)
        if (!showPopup) {
            setSelectedContainer(null)
        }
    }

    const selectContainer = (id) => {
        setSelectedContainer(containers.find(container => container.id === id))
        setShowPopup(true)
    }

    const handleSubmit = (type, location) => {
        if (selectedContainer) {
            updateContainer(type, location, selectedContainer.id);
        } else {
            addContainer(type, location);
        }
        togglePopup();
    };

    return (
        <>
            <Header />
            <div className="containerMain">
                <div className="buttons">
                    <Greeting />
                    <Link to='/graphs'><button>Gráficos</button></Link>
                </div>
                <div className="levels">
                    <Levels />
                </div>
                <div className="addContainer">
                    <h2>Basureros Activos</h2>
                    <button onClick={togglePopup}>Agregar basurero</button>
                </div>
                <Popup  
                    show={showPopup} 
                    handleClose={togglePopup} 
                    handleSubmit={handleSubmit}
                    selectedContainer={selectedContainer}
                />
                <Container  
                    selectContainer={selectContainer}
                    deleteContainer={deleteContainer}
                    containers={containers} 
                    handleDetailsClick={handleDetailsClick}
                />
            </div>
        </>
    );
};

export default TrashControl;