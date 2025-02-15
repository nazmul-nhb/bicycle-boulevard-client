import React from 'react';
import { Drawer, Menu } from 'antd';
import { formatRoutes } from '../../utils/routeUtils';
import { routes } from '../../configs/route_list';
import { useGetSelectedPath } from '../../hooks/useSelectedPath';
import type { TRootState } from '../../app/store';
import { isDashboard } from '../../utils/helpers';

interface Props {
	open: boolean;
	isDarkTheme: boolean;
	user: TRootState['auth']['user'];
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResponsiveSidebar: React.FC<Props> = ({ user, open, setOpen, isDarkTheme }) => {
	const { selectedPath, selectCurrentPath } = useGetSelectedPath();

	return (
		<Drawer
			onClose={() => setOpen(false)}
			open={open}
			placement="left"
			footer={null}
			closable={true}
			extra={user ? user.name : 'Welcome'}
			width={260}
			style={{ background: isDarkTheme ? '#141414' : '#727272', padding: 0 }}
		>
			<Menu
				style={{
					backgroundColor: isDarkTheme ? '#141414' : '#727272',
				}}
				theme={isDarkTheme ? 'dark' : 'light'}
				mode="inline"
				onClick={(e) => {
					selectCurrentPath(e);
					setOpen(false);
				}}
				defaultSelectedKeys={[selectedPath]}
				// openKeys={[selectedPath]}
				items={formatRoutes(routes, 'menu').filter((route) =>
					!isDashboard(selectedPath)
						? !isDashboard(route?.key as string) ||
						  (user &&
								isDashboard(route?.key as string) &&
								(route?.key as string).includes(user.role))
						: !isDashboard(route?.key as string)
				)}
			/>
		</Drawer>
	);
};

export default ResponsiveSidebar;
