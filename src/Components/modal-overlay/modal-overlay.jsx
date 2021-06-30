import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

export default function ModalOverlay(props){

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
        <Modal title={props.title} children={props.children} closeHandler={props.closeHandler}/>
        </div>
    ), modalRoot)
}

ModalOverlay.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    closeHandler: PropTypes.func
};