import { Suspense, lazy } from "react";
import { PageSpinner } from '../PageSpinner'

const DragAndDropLazy = lazy(() => import('./DragAndDrop')); 

export const DragAndDrop = () => (
    <Suspense fallback={<PageSpinner/>}>
        <DragAndDropLazy/>
    </Suspense>
)