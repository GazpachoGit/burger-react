import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

export default function Modal(props){

    const listener = function(event) {
        const key = event.key;
        if (key === "Escape") {
            props.closeHandler();
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('keydown', listener);
        } 
    })

    return ReactDOM.createPortal((
        <div className={styles.overlay} onClick={props.closeHandler}>
        <ModalOverlay title={props.title} children={props.children} closeHandler={props.closeHandler}/>
        </div>
    ), modalRoot)
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    closeHandler: PropTypes.func
};