import styles from './modal-content.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

type TPros = {
    title?: string,
    closeHandler?: () => void,
    hideCloseButton?: boolean
}

export const ModalContent: FC<TPros> = ({ title, children, hideCloseButton, closeHandler }) => {
    return (
        <div onClick={e => e.stopPropagation()} className={styles.wrap}>
            <div className={styles.modal + ' pr-10 pl-10 pt-10 pb-15'}>
                <div className={hideCloseButton ? styles.modalHeadTitle : styles.modalHeadWithClose}>
                    <span className="text text_type_main-medium ">{title}</span>
                    {hideCloseButton ?
                        null :
                        <>
                            <CloseIcon onClick={closeHandler} type="primary" />
                        </>}
                </div>
                {children}
            </div>
        </div>
    )
}
export default ModalContent;