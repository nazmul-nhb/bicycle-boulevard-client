import React, { useState } from 'react';
import { Header } from 'antd/es/layout/layout';
import { Avatar, Button, Flex, Menu, Popover, theme } from 'antd';
import { formatRoutes } from '../../utils/routeUtils';
import { routes } from '../../configs/route_list';
import type { MappingAlgorithm } from 'antd/es/theme/interface';
import { Icon } from '@iconify/react';
import { useAppDispatch } from '../../app/hooks';
import { setTheme } from '../../app/features/themeSlice';
import { AntNotifications } from '../../App';
import { logOut } from '../../app/features/authSlice';
import { getImageLink, isDashboard } from '../../utils/helpers';
import { Link } from 'react-router';
import type { TRootState } from '../../app/store';
import Title from 'antd/es/typography/Title';
import { configs } from '../../configs/site_configs';
import { useGetSelectedPath } from '../../hooks/useSelectedPath';
import ResponsiveSidebar from './ResponsiveSidebar';
import { useIsMobile } from '../../hooks/useIsMobile';

// type Derivative = import('antd').MappingAlgorithm;

interface Props {
	user: TRootState['auth']['user'];
	isDarkTheme: boolean;
	algorithm: MappingAlgorithm;
}

const Navbar: React.FC<Props> = ({ user, algorithm, isDarkTheme }) => {
	const [open, setOpen] = useState<boolean>(false);
	const isMobile = useIsMobile();
	const dispatch = useAppDispatch();
	const { selectedPath, selectCurrentPath } = useGetSelectedPath();
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

	console.log(isMobile);

	return (
		<Header
			style={{
				backgroundColor: isDarkTheme ? '#141414' : '#727272',
				padding: '0',
			}}
		>
			<Flex justify="space-between" align="center" style={{ marginRight: 12 }}>
				<Flex
					style={{
						marginLeft: 16,
					}}
					align="center"
				>
					{isMobile && (
						<Button
							onClick={() => setOpen(true)}
							type="text"
							ghost
							size="large"
							icon={<Icon icon="gg:menu-round" width="40" height="40" />}
						/>
					)}
					<ResponsiveSidebar
						isDarkTheme={isDarkTheme}
						user={user}
						open={open}
						setOpen={setOpen}
					/>
					{!isDashboard(selectedPath) ? (
						<Icon icon="streamline-emojis:bicycle" width="40" height="40" />
					) : null}
					<Title
						style={{
							textAlign: 'center',
							paddingTop: 8,
							marginLeft: 16,
							textWrap: 'nowrap',
						}}
						level={3}
						title={configs.site_title}
					>
						{configs.site_title}
					</Title>
				</Flex>
				{!isMobile ? (
					<Menu
						style={{
							backgroundColor: isDarkTheme ? '#141414' : '#727272',
						}}
						theme={isDarkTheme ? 'dark' : 'light'}
						mode="horizontal"
						onClick={selectCurrentPath}
						overflowedIndicator={<Icon icon="mdi:menu" />}
						defaultSelectedKeys={[selectedPath]}
						// openKeys={[selectedPath]}
						items={formatRoutes(routes, 'nav-menu').filter((route) =>
							!isDashboard(selectedPath)
								? !isDashboard(route?.key as string) ||
								  (user &&
										isDashboard(route?.key as string) &&
										(route?.key as string).includes(user.role))
								: !isDashboard(route?.key as string)
						)}
					/>
				) : null}

				<Flex gap={8} align="center">
					{algorithm === theme.defaultAlgorithm ? (
						<Button
							onClick={() => dispatch(setTheme('dark'))}
							icon={<Icon icon="mdi:moon-and-stars" width="24" height="24" />}
							style={{ borderWidth: 0 }}
							type="default"
							shape="circle"
						/>
					) : (
						<Button
							onClick={() => dispatch(setTheme('light'))}
							icon={
								<Icon
									icon="ant-design:sun-outlined"
									width="24"
									height="24"
								/>
							}
							style={{ borderWidth: 0 }}
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
									style={{
										font: '18px bold',
									}}
								>
									Logout
								</Button>
							}
						>
							<Button
								type="link"
								size="large"
								shape="circle"
								icon={
									<Avatar
										alt={user.name}
										src={getImageLink(user.image)}
									/>
								}
							/>
						</Popover>
					) : (
						<Link to="login">
							<Button
								type="primary"
								color="green"
								shape="default"
								icon={<Icon icon="mdi:lock" width="18" height="18" />}
								style={{ font: '18px bold' }}
							>
								Login
							</Button>
						</Link>
					)}
				</Flex>
			</Flex>
		</Header>
	);
};

export default Navbar;
