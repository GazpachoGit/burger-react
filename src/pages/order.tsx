import OpenedOrderDetails from '../Components/opened-order-details/opened-order-details';
import Modal from '../Components/modal/modal';
import styles from './login.module.css';

export default function OrderPage() {
    return (
        <div className={styles.center}>
            <Modal children={<OpenedOrderDetails />} hideCloseButton={true}/>
        </div>
    )
}