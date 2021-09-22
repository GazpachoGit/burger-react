import styles from './modal-content.module.css';
import PropTypes from 'prop-types';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export default function ModalContent(props){
    return (
        <div onClick={e => e.stopPropagation()} className={styles.wrap}>
            <div className={styles.modal + ' pr-10 pl-10 pt-10 pb-15'}>
                <div className={props.hideCloseButton ? styles.modalHeadTitle: styles.modalHeadWithClose}>
                <span className="text text_type_main-medium ">{props.title}</span>
                {props.hideCloseButton ? 
                    null : 
                        <>
                            <CloseIcon onClick={props.closeHandler} type="primary" />
                        </>}
                </div>
                {props.children}
            </div>           
        </div>
    )
}

ModalContent.propTypes = {
    children: PropTypes.node,
    closeHandler: PropTypes.func
};