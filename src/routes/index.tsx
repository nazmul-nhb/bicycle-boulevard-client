import Root from '../layouts/Root';
import { Route, Routes } from 'react-router';
import { formatRoutes } from '../utils/routeUtils';
import { routes } from '../configs/route_list';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Unauthorized from '../pages/Unauthorized';
import NotFound from '../pages/NotFound';

export const BicycleRoutes = () => {
	return (
		<Routes>
			<Route path="*" element={<NotFound />} />
			<Route path="/" element={<Root />}>
				{formatRoutes(routes, 'route')}
			</Route>
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route path="/unauthorized" element={<Unauthorized />} />
		</Routes>
	);
};
