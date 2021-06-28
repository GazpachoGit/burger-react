import styles from './modal.module.css';
import PropTypes from 'prop-types';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export default function Modal(props){
    return (
        <div onClick={e => e.stopPropagation()} className={styles.wrap}>
            <div className={styles.modal + ' pr-10 pl-10 pt-10 pb-15'}>
                <div className={styles.modalHead}>
                    <span className="text text_type_main-medium ">{props.title}</span>
                    <CloseIcon onClick={props.closeHandler} type="primary" />
                </div>
                {props.children}
            </div>           
        </div>
    )
}

Modal.propTypes = {
    children: PropTypes.node,
};