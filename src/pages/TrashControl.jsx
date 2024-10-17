import Header from '../components/Header';
import Saludo from '../components/Saludo';
import Container from '../components/Container';

const TrashControl = ({addContainer, removeContainer, container}) => {
    return (
        <>
            <Header />
            <div className="contenedorMain">
                <Saludo />
                <h2>Basureros Activos</h2>
                <Container  addContainer = {addContainer}
                            removeContainer = {removeContainer}
                            container={container} />
            </div>

        </>
    );
};

export default TrashControl;