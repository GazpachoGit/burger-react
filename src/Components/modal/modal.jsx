import styles from './modal.module.css';
import PropTypes from 'prop-types';

export default function Modal(props){
    return (
        <div onClick={e => e.stopPropagation()} className={styles.modal}>
            {props.children}
        </div>
    )
}

Modal.propTypes = {
    children: PropTypes.node,
};