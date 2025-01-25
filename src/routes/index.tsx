import Root from '../layouts/Root';
import { Route, Routes } from 'react-router';
import { formatRoutes } from '../utils/routeUtils';
import { routes } from '../configs/route_list';

export const BanguRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Root />}>
				{formatRoutes(routes, 'route')}
			</Route>
		</Routes>
	);
};
