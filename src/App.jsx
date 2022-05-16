import { Layout, Menu, Typography } from "antd";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useParams,
	useLocation,
} from "react-router-dom";
import { MarketDepth } from "./components/MarketDepth";
import { DragAndDrop } from "./components/DragAndDrop";
import styles from './App.module.css'

const { Header, Content } = Layout;
const { Title, Text } = Typography;

// вынести в константы
const FIRST_PAGE_URL = "/";
const SECOND_PAGE_URL = "/second-page";

function App() {
	return (
		<div className="App">
			<Router>
				<Layout>
					<Header>
						<Menu
							theme="dark"
							mode="horizontal"
							// defaultSelectedKeys={["1"]}
							items={[
								{
									key: FIRST_PAGE_URL,
									label: (
										<Link to={FIRST_PAGE_URL}>
											first page
										</Link>
									),
								},
								{
									key: SECOND_PAGE_URL,
									label: (
										<Link to={SECOND_PAGE_URL}>
											second page
										</Link>
									),
								},
							]}
						/>
					</Header>

					<Content className={styles.content}>
						<Routes>
							<Route
								path={FIRST_PAGE_URL}
								element={<MarketDepth />}
							/>

							<Route
								exact
								path={SECOND_PAGE_URL}
								element={<DragAndDrop />}
							/>
						</Routes>
					</Content>
				</Layout>
			</Router>
		</div>
	);
}

export default App;
