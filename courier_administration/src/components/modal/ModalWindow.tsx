import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../css/CustomStyles.css"

interface modalProps {
    show: boolean
    handleClose: () => void
    modalTitle: string
    modalBody: string
}

export function ModalWindow({show, handleClose, modalTitle, modalBody} : modalProps) {

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="standard">
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body className="standard">
                    <p>{modalBody}</p>
                </Modal.Body>

                <Modal.Footer className="standard">
                    <Button variant="primary" onClick={handleClose}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
