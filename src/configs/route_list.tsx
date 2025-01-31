import type { IRoute } from '../types/routes';
import Home from '../pages/Home/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import AdminDashboard from '../pages/admin/Dashboard';
import ManageProducts from '../pages/admin/ManageProducts';
import CustomerDashboard from '../pages/customer/Dashboard';
import ViewOrder from '../pages/customer/ViewOrder';
import Private from '../routes/Private';

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
		path: 'dashboard/admin',
		icon: 'ic:outline-admin-panel-settings',
		children: [
			{
				label: 'Dashboard',
				path: '',
				icon: 'ic:outline-admin-panel-settings',
				element: (
					<Private roles={['admin']}>
						<AdminDashboard />
					</Private>
				),
			},
			{
				label: 'Manage Products',
				path: 'manage-products',
				icon: 'fluent-mdl2:product-list',
				element: (
					<Private roles={['admin']}>
						<ManageProducts />
					</Private>
				),
			},
		],
	},
	{
		label: 'Customer Panel',
		path: 'dashboard/customer',
		icon: 'garden:customer-lists-fill-26',
		children: [
			{
				label: 'Dashboard',
				path: '',
				icon: 'garden:customer-lists-fill-26',
				element: (
					<Private roles={['customer']}>
						<CustomerDashboard />
					</Private>
				),
			},
			{
				label: 'View Order',
				path: 'view-order',
				icon: 'lsicon:order-edit-outline',
				element: (
					<Private roles={['customer']}>
						<ViewOrder />
					</Private>
				),
			},
		],
	},
];
