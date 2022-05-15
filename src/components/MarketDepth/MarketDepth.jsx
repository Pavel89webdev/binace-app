import { useEffect, useState, useCallback, useMemo } from "react";
import { getSnapshot } from '../../plugins/eventBus';
import { GetSnapshotService } from '../../plugins/GetSnapshotService/GetSnapshotService';
import { prepareInitialSnapshotData } from '../../utils';
import { PriceItem } from '../PriceItem';

const DEPTH = 100;
const SYMBOL = 'BTCUSDT'

const getSnapShotService = new GetSnapshotService(SYMBOL, DEPTH, getSnapshot.emit)


const MarketDepthComponent = () => {

    // что должен далеть компонент?
    // положить initial стакан в стейт
        // - нужно запросить у шины первоначальный снепшот
        // добавить в шину сервис получения данных от бинанс
            // подписываемся на событие "получение снапшота" - вернуть отписку! 
            // передать туда сет стейт
        // подписаться на его обновления - значит передать колбек
            // полписаться нс обновление стакана - передать колбек/утилку с проверкуами (свежее ли обновление) и сет стейт (хитор сетить чтобы лишнего не рендерить или примитивы)
            // не забыть отписку
        // пусть в обновлении будет type который показвает это снапшот или обновление стакана
        //  

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
            <h2>Market Depth will be here</h2>
            {markedDepthData && priceItems}
        </>
    )
}

export default MarketDepthComponent;