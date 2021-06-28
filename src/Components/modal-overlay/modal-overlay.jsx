import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

export default function ModalOverlay(props){
    return ReactDOM.createPortal((
        <div className={styles.overlay} onClick={props.closeHandler}>
        <Modal children={props.children} closeHandler={props.closeHandler}/>
        </div>
    ), modalRoot)
}

ModalOverlay.propTypes = {
    children: PropTypes.node,
    closeHandler: PropTypes.func
};