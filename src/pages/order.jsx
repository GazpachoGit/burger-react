import OpenedOrderDetails from '../Components/opened-order-details/opened-order-details';
import ModalOverlay from '../Components/modal-overlay/modal-overlay';
import styles from './login.module.css';

export default function OrderPage() {
    return (
        <div className={styles.center}>
            <ModalOverlay children={<OpenedOrderDetails />} hideCloseButton={true}/>
        </div>
    )
}