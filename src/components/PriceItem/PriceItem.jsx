import styles from './PriceItem.module.css';
import { Col, Row } from 'antd';

export const PriceItem = ({price, ask, bid}) => (
    <li className={styles.item}>
        <div className={styles.askWrapper}>
            <div className={styles.ask}>{ask}</div>
        </div>
        <div className={styles.priceWrapper}>
            <div className={styles.price}>{price}</div>
        </div>
        <div className={styles.bidWrapper}>
            <div className={styles.bid}>{bid}</div>
        </div>
    </li>
)