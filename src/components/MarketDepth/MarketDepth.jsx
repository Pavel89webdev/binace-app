import { useEffect, useState, useMemo } from "react";
import { prepareInitialSnapshotData, updateMarketDepth } from '../../utils';
import { PriceItem } from '../PriceItem';
import { Typography } from 'antd';
import styles from './MarketDepth.module.css';
import { SYMBOLS, DEFAULT_DEPTH, PARAMS_SYMBOLS } from '../../consts';
import { addPlugin, plugins } from '../../core';


const updateMarketData = (setMarkedDepthData) => (event) => {
    const data = event.data;
    if (data) {
        const updateIdLast = data?.u;

        const asks = data?.a;
        const bids = data?.b;

        if( asks && bids && data ) setMarkedDepthData(({data, initialUpdateId}) => ({data: updateMarketDepth({initialUpdateId,data, asks, bids, updateIdLast}), initialUpdateId}));
    }
};

const MarketDepthComponent = () => {

    const [markedDepthData, setMarkedDepthData] = useState(undefined);

    const snapshotDataSetter = (data) => {
        const { lastUpdateId, asks, bids } = data;

        const preparedData = prepareInitialSnapshotData(asks, bids);
        setMarkedDepthData({initialUpdateId: lastUpdateId, data: preparedData})
    };

    useEffect( () => {

        async function connectEventBus () {
            // получить снимок биржевого стакана
            // получить асинхронно плагин шины данных
            const eventBus = await import('../../plugins/eventBus');

            // добавить в ядро
            addPlugin('eventBus', eventBus);

            // асинхронно получаем snapshot сервис 
            const {GetSnapshotService} = await import('../../plugins/GetSnapshotService/GetSnapshotService');

            // подписать сервис чтобы транслривать события
            const getSnapShotService = new GetSnapshotService(SYMBOLS.BTCUSDT, DEFAULT_DEPTH, plugins.eventBus.getSnapshot.emit)

            // подписать колбек на нужное событие
            plugins.eventBus.getSnapshot.subscribe(snapshotDataSetter);

            // запускаем сервис
            getSnapShotService.getSnapshot();

            // подписаться на обновления биржевого стакана по WSS
            // асинхронно получаем сервис чтобы транслировать собыития
            const { UpdateMarketService } = await import('../../plugins/UpdateMarketService/UpdateMarketService');

            // создаем экземпляр сервиса
            const updateMarketService = new UpdateMarketService(SYMBOLS.BTCUSDT, [PARAMS_SYMBOLS.BTCUSDT], plugins.eventBus.updateMarket.emit)

            // подписываемся на изменения, передаем колбек
            plugins.eventBus.updateMarket.subscribe(updateMarketData(setMarkedDepthData))

            // запускаем сервис
            updateMarketService.startWS();

        }

        connectEventBus();
    },[]);


    useEffect(() => {
        // как отписка от getSnapshot
        const unsubscribe = plugins?.eventBus?.getSnapshot?.subscribe(snapshotDataSetter); 

        if(unsubscribe) return unsubscribe;
    },[])

    const priceItems = useMemo(() => {
        const data = markedDepthData?.data;

        if(data){
            const sortedPriceKeys = Object.keys(data).sort((a,b) => Number(b) - Number(a));

            return sortedPriceKeys.map((price) => {
            
                const { ask, bid } = data[price];
    
                return (<PriceItem key={price} price={price} ask={ask} bid={bid}/>)
            });
        }
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