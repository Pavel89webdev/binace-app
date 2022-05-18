import { Layout } from "antd";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import { MarketDepth } from "../MarketDepth";
import { DragAndDrop } from "../DragAndDrop";
import styles from './AppRouter.module.css'
import { ROUTES } from '../../consts';


import { AppHeader } from "../AppHeader";

const { Content } = Layout;


export const AppRouter = () => (<Router>
				<Layout>
                    <AppHeader/>

					<Content className={styles.content}>
						<Routes>
							<Route
								path={ROUTES.FIRST_PAGE_URL}
								element={<MarketDepth />}
							/>

							<Route
								exact
								path={ROUTES.SECOND_PAGE_URL}
								element={<DragAndDrop />}
							/>
						</Routes>
					</Content>
				</Layout>
			</Router>)