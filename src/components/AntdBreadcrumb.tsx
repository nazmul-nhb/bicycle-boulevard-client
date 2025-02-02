import { Icon } from '@iconify/react';
import { Breadcrumb } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router';

const AntdBreadcrumb: React.FC = () => {
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter(Boolean);

	const breadcrumbItems = [
		{
			title: (
				<Link to="/">
					<Icon icon="line-md:home-twotone" width="20" height="20" />
				</Link>
			),
		},
		...pathnames.map((value, index) => ({
			title: (
				<Link to={`/${pathnames.slice(0, index + 1).join('/')}`}>
					{value.replace(/-/g, ' ').toUpperCase()}
				</Link>
			),
			key: value,
		})),
	];

	return (
		<Breadcrumb
			items={breadcrumbItems}
			separator={
				<Icon icon="fluent:ios-arrow-right-24-filled" width="12" height="12" />
			}
		/>
	);
};

export default AntdBreadcrumb;
