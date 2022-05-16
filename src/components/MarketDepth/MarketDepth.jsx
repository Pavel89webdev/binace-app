import { useEffect, useState, useCallback, useMemo } from "react";
import { getSnapshot } from '../../plugins/eventBus';
import { GetSnapshotService } from '../../plugins/GetSnapshotService/GetSnapshotService';
import { prepareInitialSnapshotData } from '../../utils';
import { PriceItem } from '../PriceItem';
import { Row, Col, Typography } from 'antd';
import styles from './MarketDepth.module.css';

const DEPTH = 100;
const SYMBOL = 'BTCUSDT'



const getSnapShotService = new GetSnapshotService(SYMBOL, DEPTH, getSnapshot.emit)


const MarketDepthComponent = () => {

    const [markedDepthData, setMarkedDepthData] = useState(undefined);
    const [initialApdateId, setInitialUpdateId] = useState(0);

    const dataSetter = useCallback((data) => {
        const { lastUpdateId, asks, bids } = data;

        setInitialUpdateId(lastUpdateId);

        const preparedData = prepareInitialSnapshotData(asks, bids);
        setMarkedDepthData(preparedData)
    },[]);

    useEffect(() => {
        const unsubscribe = getSnapshot.subscribe(dataSetter);

        getSnapShotService.getSnapshot();

        return unsubscribe;
    },[dataSetter]);

    const priceItems = useMemo(() => {
        const result = [];

        for(let price in markedDepthData) {
            if(markedDepthData.hasOwnProperty(price)){

                const { ask, bid } = markedDepthData[price]; 

                result.push(<PriceItem price={price} ask={ask} bid={bid}/>);
            }
        }

        return result;

    }, [markedDepthData]);


    return (
        <>
            <Typography.Title className={styles.title}>Market Depth</Typography.Title>
            { markedDepthData && 
            (<>
                <div className={styles.header}>
                    <div className={styles.headerItem}>asks</div>
                    <div className={styles.headerItem}>price</div>
                    <div className={styles.headerItem}>bid</div>
                </div>
                <ul className={styles.ul}>
                    {priceItems}
                </ul>
            </>
            )
            }
        </>
    )
}

export default MarketDepthComponent;