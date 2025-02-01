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
				backgroundColor: isDarkTheme ? '#141414' : '#727272',
			}}
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
			collapsible={true}
			collapsed={isCollapsed}
		>
			<Title
				style={{
					// color: isDarkTheme ? '#d9d9d9' : '#000000',
					textAlign: 'center',
					paddingTop: 8,
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
			<Menu
				style={{
					backgroundColor: isDarkTheme ? '#141414' : '#727272',
				}}
				theme={isDarkTheme ? 'dark' : 'light'}
				mode="inline"
				onClick={selectCurrentPath}
				defaultSelectedKeys={[selectedPath]} 
				// openKeys={[selectedPath]}
				items={formatRoutes(routes, 'menu').filter(
					(route) =>
						isDashboard(route?.key as string) &&
						(route?.key as string).includes(user.role)
				)}
			/>
		</Sider>
	);
};

export default Sidebar;
