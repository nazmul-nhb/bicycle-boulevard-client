import Root from '../layouts/Root';
import { Route, Routes } from 'react-router';
import { formatRoutes } from '../utils/routeUtils';
import { routes } from '../configs/route_list';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';

export const BanguRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Root />}>
				{formatRoutes(routes, 'route')}
			</Route>
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};
