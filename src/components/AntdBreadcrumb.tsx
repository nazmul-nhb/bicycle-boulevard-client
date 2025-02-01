import { Icon } from '@iconify/react';
import { Breadcrumb } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router';

const AntdBreadcrumb: React.FC = () => {
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter(Boolean);

	return (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to="/">
					<Icon icon="line-md:home-twotone" width="20" height="20" />
				</Link>
			</Breadcrumb.Item>
			{pathnames.map((value, index) => {
				const path = `/${pathnames.slice(0, index + 1).join('/')}`;

				return (
					<Breadcrumb.Item key={path}>
						<Link to={path}>{value.replace(/-/g, ' ').toUpperCase()}</Link>
					</Breadcrumb.Item>
				);
			})}
		</Breadcrumb>
	);
};

export default AntdBreadcrumb;
