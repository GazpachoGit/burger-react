import styles from './ingredient-details.module.css';

export default function IngredientDetails(props) {
    return (
        <div className={styles.modal}>
            <div className={styles.modalHead + ' p-1'}>
                <span>qwerty</span>
                <span>click</span>
            </div>
            <div>
                {props.item.name}
            </div>
        </div>
        
    )
}