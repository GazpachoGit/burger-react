import styles from './modal.module.css';

export default function Modal(props){
    return (
        <div onClick={e => e.stopPropagation()} className={styles.modal}>
            {props.children}
        </div>
    )
}