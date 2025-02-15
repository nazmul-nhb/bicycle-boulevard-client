import { Icon } from '@iconify/react';
import { Breadcrumb } from 'antd';
import { capitalizeString } from 'nhb-toolbox';
import { Link, useLocation } from 'react-router';

const AntdBreadcrumb = () => {
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter(Boolean);

	const breadcrumbs = [
		{
			title: (
				<Link to="/">
					<Icon icon="line-md:home-twotone" width="20" height="20" />
				</Link>
			),
		},
		...pathnames.map((title, index) => {
			const path = `/${pathnames.slice(0, index + 1).join('/')}`;
			const isLast = index === pathnames.length - 1;

			if (!isLast) {
				return {
					key: title,
					title: (
						<Link to={path}>
							{capitalizeString(title.replace(/-/g, ' '), {
								capitalizeEachFirst: true,
							})}
						</Link>
					),
				};
			}
			return {
				key: title,
				title: capitalizeString(title.replace(/-/g, ' '), {
					capitalizeEachFirst: true,
				}),
			};
		}),
	];

	return (
		<Breadcrumb
			items={breadcrumbs}
			separator={
				<Icon icon="fluent:ios-arrow-right-24-filled" width="12" height="12" />
			}
		/>
	);
};

export default AntdBreadcrumb;
