import type { IRoute } from '../types/routes';
import Home from '../pages/Home/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import AdminDashboard from '../pages/admin/Dashboard';
import CreateProduct from '../pages/admin/CreateProduct';
import CustomerDashboard from '../pages/customer/Dashboard';
import ViewOrder from '../pages/customer/ViewOrder';

export const routes: IRoute[] = [
	{
		label: 'Home',
		path: '/',
		icon: 'line-md:home-twotone',
		element: <Home />,
	},
	{
		label: 'About',
		path: 'about',
		icon: 'heroicons-outline:information-circle',
		element: <About />,
	},
	{
		label: 'Contact',
		path: 'contact',
		icon: 'material-symbols:contact-support-outline',
		element: <Contact />,
	},
	{
		label: 'Admin Panel',
		path: 'admin',
		icon: 'ic:outline-admin-panel-settings',
		children: [
			{
				label: 'Dashboard',
				path: '',
				icon: 'ic:outline-admin-panel-settings',
				element: <AdminDashboard />,
			},
			{
				label: 'Manage Products',
				path: 'manage-products',
				icon: 'fluent-mdl2:product-list',
				element: <CreateProduct />,
			},
		],
	},
	{
		label: 'Customer Panel',
		path: 'customer',
		icon: 'garden:customer-lists-fill-26',
		children: [
			{
				label: 'Dashboard',
				path: '',
				icon: 'garden:customer-lists-fill-26',
				element: <CustomerDashboard />,
			},
			{
				label: 'View Order',
				path: 'view-order',
				icon: 'lsicon:order-edit-outline',
				element: <ViewOrder />,
			},
		],
	},
];
