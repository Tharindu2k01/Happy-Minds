import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopUpModel({handleRedirect, resetNotHappyEmotionCount}) {

    const [show, setShow] = useState(true);

    const handleClose = () => {
        resetNotHappyEmotionCount();
        setShow(false);

    }
    const handleProceed = () => {
        handleRedirect();
        setShow(false);
    }

    return (
        <>
            <Modal show={true} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>අපි සින්දුවක් අහමුද?</Modal.Title>
                </Modal.Header>
                <Modal.Body>කරුණාකර තහවුරු කරන්න.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleProceed}>
                        අපි යමු!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopUpModel;