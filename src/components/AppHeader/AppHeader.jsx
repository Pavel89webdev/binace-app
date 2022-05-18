import { Layout, Menu } from "antd";
import {
	Link, useLocation
} from "react-router-dom";
import { ROUTES } from '../../consts';

const { Header } = Layout;

export const AppHeader = () => {

	const { pathname } = useLocation();
	
	return (
    		<Header>
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={pathname}
					items={[
						{
							key: ROUTES.FIRST_PAGE_URL,
							label: (
								<Link to={ROUTES.FIRST_PAGE_URL}>
									first page
								</Link>
							),
						},
						{
							key: ROUTES.SECOND_PAGE_URL,
							label: (
								<Link to={ROUTES.SECOND_PAGE_URL}>
									second page
								</Link>
							),
						},
					]}
				/>
			</Header>
	)
}