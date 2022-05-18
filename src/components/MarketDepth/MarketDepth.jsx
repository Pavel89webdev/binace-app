import { useEffect, useState, useCallback, useMemo } from "react";
import { prepareInitialSnapshotData } from '../../utils';
import { PriceItem } from '../PriceItem';
import { Typography } from 'antd';
import styles from './MarketDepth.module.css';
import { SYMBOLS, DEFAULT_DEPTH } from '../../consts';
import { addPlugin, plugins } from '../../core';

// const getSnapShotService = new GetSnapshotService(SYMBOLS.BTCUSDT, DEFAULT_DEPTH, getSnapshot.emit)

const MarketDepthComponent = () => {

    const [markedDepthData, setMarkedDepthData] = useState(undefined);
    const [initialApdateId, setInitialUpdateId] = useState(0);

    const dataSetter = useCallback((data) => {
        const { lastUpdateId, asks, bids } = data;

        setInitialUpdateId(lastUpdateId);

        const preparedData = prepareInitialSnapshotData(asks, bids);
        setMarkedDepthData(preparedData)
    },[]);

    useEffect( () => {

        async function connectEventBus () {
            // получить асинхронно плагин
            const eventBus = await import('../../plugins/eventBus');

            // добавить в ядро
            addPlugin('eventBus', eventBus);

            // асинхронно получаем сервис
            const {GetSnapshotService} = await import('../../plugins/GetSnapshotService/GetSnapshotService');

            // подписать сервис чтобы транслривать события
            const getSnapShotService = new GetSnapshotService(SYMBOLS.BTCUSDT, DEFAULT_DEPTH, plugins.eventBus.getSnapshot.emit)

            // подписать колбек на нужное событие
            plugins.eventBus.getSnapshot.subscribe(dataSetter);

            // запускаем сервис
            getSnapShotService.getSnapshot();
        }

        connectEventBus();

        // как сделать отписку если тут все асинхронно?
    },[dataSetter]);

    const priceItems = useMemo(() => {
        const result = [];

        for(let price in markedDepthData) {
            if(markedDepthData.hasOwnProperty(price)){

                const { ask, bid } = markedDepthData[price]; 

                result.push(<PriceItem key={price} price={price} ask={ask} bid={bid}/>);
            }
        }

        return result;

    }, [markedDepthData]);


    return (
        <>
            <Typography.Title className={styles.title}>Market Depth</Typography.Title>
            { markedDepthData && 
            (<div className={styles.centered}>
                <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.headerItem}>asks</div>
                    <div className={styles.headerItem}>price</div>
                    <div className={styles.headerItem}>bid</div>
                </div>
                <ul className={styles.ul}>
                    {priceItems}
                </ul>
            </div>
            </div>
            
            )
            }
        </>
    )
}

export default MarketDepthComponent;