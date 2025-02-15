import { Icon } from '@iconify/react';
import { Button, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { routes } from '../../configs/route_list';
import { configs } from '../../configs/site_configs';
import { useGetSelectedPath } from '../../hooks/useSelectedPath';
import type { ISingleUser } from '../../types/user.types';
import { isDashboard } from '../../utils/helpers';
import { formatRoutes } from '../../utils/routeUtils';

interface Props {
	user: ISingleUser;
	isDarkTheme: boolean;
}

const Sidebar: React.FC<Props> = ({ user, isDarkTheme }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const { selectedPath, selectCurrentPath } = useGetSelectedPath();

	return (
		<Sider
			width={240}
			style={{
				height: '100vh',
				overflow: 'hidden',
				backgroundColor: isDarkTheme ? '#141414' : '#727272',
			}}
			collapsible
			collapsed={isCollapsed}
			trigger={
				<Button
					type="text"
					icon={
						isCollapsed ? (
							<Icon icon="line-md:menu-unfold-right" width="24" height="24" />
						) : (
							<Icon icon="line-md:menu-unfold-left" width="24" height="24" />
						)
					}
					onClick={() => setIsCollapsed(!isCollapsed)}
					style={{
						fontSize: '16px',
						width: '100%',
						height: '100%',
						padding: 0,
						backgroundColor: isDarkTheme ? '#141414' : '#727272',
					}}
				/>
			}
		>
			<Title
				style={{
					textAlign: 'center',
					paddingTop: 16,
					textWrap: 'nowrap',
				}}
				level={3}
				title={configs.site_title}
			>
				{isCollapsed ? (
					<Icon icon="streamline-emojis:bicycle" width="40" height="40" />
				) : (
					configs.site_title
				)}
			</Title>
			{/* Make the menu scrollable independently */}
			<div
				style={{
					flex: 1,
					overflowY: 'auto',
					height: 'calc(100vh - 100px)', // Adjust based on content
				}}
			>
				<Menu
					style={{
						backgroundColor: isDarkTheme ? '#141414' : '#727272',
					}}
					theme={isDarkTheme ? 'dark' : 'light'}
					mode="inline"
					onClick={selectCurrentPath}
					defaultSelectedKeys={[selectedPath]}
					items={formatRoutes(routes, 'menu').filter(
						(route) =>
							isDashboard(route?.key as string) &&
							(route?.key as string).includes(user.role)
					)}
				/>
			</div>
		</Sider>
	);
};

export default Sidebar;
