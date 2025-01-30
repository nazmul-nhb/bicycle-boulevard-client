import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { Avatar, Button, Flex, Menu, Popover, theme } from 'antd';
import { formatRoutes } from '../../utils/routeUtils';
import { routes } from '../../configs/route_list';
import type { MappingAlgorithm } from 'antd/es/theme/interface';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAppDispatch } from '../../app/hooks';
import { setTheme } from '../../app/features/themeSlice';
import { AntNotifications } from '../../App';
import { logOut } from '../../app/features/authSlice';
import { getImageLink } from '../../utils/helpers';
import { Link } from 'react-router';
import type { TRootState } from '../../app/store';

// type Derivative = import('antd').MappingAlgorithm;

interface Props {
	user: TRootState['auth']['user'];
	isDarkTheme: boolean;
	algorithm: MappingAlgorithm;
	selectedKey: string;
}

const Navbar: React.FC<Props> = ({ user, algorithm, isDarkTheme, selectedKey }) => {
	const dispatch = useAppDispatch();
	const { modal } = AntNotifications(true);

	const handleLogOut = () => {
		modal.confirm({
			title: 'Log out Now?',
			content: 'Do you really want to log out?',
			onOk: () => dispatch(logOut()),
			okText: 'Log out',
			okType: 'danger',
			closable: true,
			type: 'confirm',
			maskClosable: true,
		});
	};

	return (
		<Header
			style={{
				backgroundColor: isDarkTheme ? '#141414' : '#727272',
				padding: '0',
			}}
		>
			<Flex justify="space-between" align="center" style={{ marginRight: 12 }}>
				<Menu
					style={{
						backgroundColor: isDarkTheme ? '#141414' : '#727272',
					}}
					theme={isDarkTheme ? 'dark' : 'light'}
					mode="horizontal"
					// onClick={() => setIsCollapsed(true)}
					defaultSelectedKeys={[selectedKey]}
					items={formatRoutes(routes, 'nav-menu')}
				/>
				{algorithm === theme.defaultAlgorithm ? (
					<Button
						onClick={() => dispatch(setTheme('dark'))}
						icon={<Icon icon="mdi:moon-and-stars" width="24" height="24" />}
						type="default"
						shape="circle"
					/>
				) : (
					<Button
						onClick={() => dispatch(setTheme('light'))}
						icon={
							<Icon icon="ant-design:sun-outlined" width="24" height="24" />
						}
						type="default"
						shape="circle"
					/>
				)}
				{user ? (
					<Popover
						trigger="click"
						placement="bottomRight"
						content={
							<Button
								type="primary"
								color="red"
								danger
								icon={<Icon icon="mdi:logout" width="24" height="24" />}
								onClick={handleLogOut}
							>
								Logout
							</Button>
						}
					>
						<Button
							shape="circle"
							icon={<Avatar alt={user.name} src={getImageLink(user.image)} />}
							type="dashed"
						/>
					</Popover>
				) : (
					<Link to="login">
						<Button
							type="primary"
							color="green"
							shape="round"
							icon={<Icon icon="mdi:lock" width="18" height="18" />}
							style={{ font: '18px bold' }}
						>
							Login
						</Button>
					</Link>
				)}
			</Flex>
		</Header>
	);
};

export default Navbar;
