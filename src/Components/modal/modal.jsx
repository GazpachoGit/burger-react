import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';


const modalRoot = document.getElementById("react-modals");

export default function Modal({title, children, closeHandler, hideCloseButton }){

    const listener = React.useCallback((event)=>{
        const key = event.key;
        if (key === "Escape") {
            closeHandler(event);
        }
    },[closeHandler]);

    React.useEffect(() => {
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('keydown', listener);
        } 
    })

    return ReactDOM.createPortal((
        <div className={styles.overlay} onClick={closeHandler}>
        <ModalOverlay title={title} children={children} closeHandler={closeHandler} hideCloseButton={hideCloseButton}/>
        </div>
    ), modalRoot)
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    closeHandler: PropTypes.func,
    hideCloseButton: PropTypes.bool
};