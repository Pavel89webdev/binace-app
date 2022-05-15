import { Suspense, lazy } from "react";
import { PageSpinner } from '../PageSpinner'

const MarketDepthLazy = lazy(() => import('./MarketDepth')); 

export const MarketDepth = () => (
    <Suspense fallback={<PageSpinner/>}>
        <MarketDepthLazy/>
    </Suspense>
)