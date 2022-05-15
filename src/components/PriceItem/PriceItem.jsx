import styles from './PriceItem.css';

export const PriceItem = ({price, ask, bid}) => (
    <li className={styles.listItem}>
        <div>{ask}</div>
        <div>{price}</div>
        <div>{bid}</div>
    </li>
)