import OpenedOrderDetails from '../Components/opened-order-details/opened-order-details';
import ModalContent from '../Components/modal-content/modal-content';
import styles from './login.module.css';

export default function OrderPage() {
    return (
        <div className={styles.center}>
            <ModalContent children={<OpenedOrderDetails />} hideCloseButton={true}/>
        </div>
    )
}