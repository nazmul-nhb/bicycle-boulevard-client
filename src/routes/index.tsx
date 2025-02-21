import { Route, Routes } from 'react-router';
import { routes } from '../configs/route_list';
import Root from '../layouts/Root';
import Cart from '../pages/Cart/Cart';
import CheckOut from '../pages/CheckOut/CheckOut';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Register from '../pages/Register/Register';
import Unauthorized from '../pages/Unauthorized';
import { formatRoutes } from '../utils/routeUtils';

export const BicycleRoutes = () => {
	return (
		<Routes>
			<Route path="*" element={<NotFound />} />
			<Route path="/" element={<Root />}>
				{formatRoutes(routes, 'route')}
				<Route path="/products/:id" element={<ProductDetails />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/checkout" element={<CheckOut />} />
			</Route>
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route path="/unauthorized" element={<Unauthorized />} />
		</Routes>
	);
};
