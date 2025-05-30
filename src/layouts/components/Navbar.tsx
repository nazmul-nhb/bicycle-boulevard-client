import { Icon } from '@iconify/react';
import { Avatar, Badge, Button, Flex, Menu, Popover, Space, Spin, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import type { MappingAlgorithm } from 'antd/es/theme/interface';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AntNotifications } from '../../App';
import { logOut } from '../../app/features/authSlice';
import { selectCartTotal } from '../../app/features/cartSlice';
import { setTheme } from '../../app/features/themeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { routes } from '../../configs/route_list';
import { configs } from '../../configs/site_configs';
import { useAuth } from '../../hooks/useAuth';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useGetSelectedPath } from '../../hooks/useSelectedPath';
import { getImageLink, isDashboard } from '../../utils/helpers';
import { formatRoutes } from '../../utils/routeUtils';
import ResponsiveSidebar from './ResponsiveSidebar';

interface Props {
	// user: TRootState['auth']['user'];
	isDarkTheme: boolean;
	algorithm: MappingAlgorithm;
}

const Navbar: React.FC<Props> = ({ algorithm, isDarkTheme }) => {
	const [open, setOpen] = useState<boolean>(false);
	const { user, isLoading } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const isMobile = useMediaQuery(960);
	const dispatch = useAppDispatch();
	const { modal } = AntNotifications(true);

	const { selectedPath, selectCurrentPath } = useGetSelectedPath();

	// const { isLoading } = useGetMeQuery(undefined, { skip: !!user || !token });

	const cartTotal = useAppSelector(selectCartTotal);

	// Store the current path in state for redirect after login
	const redirectState = { from: { pathname: location.pathname } };

	const handleLogOut = () => {
		modal.confirm({
			title: 'Log out Now?',
			content: 'Do you really want to log out?',
			onOk: () => {
				dispatch(logOut());
				navigate('/login', { state: redirectState });
			},
			okText: 'Log out',
			okType: 'primary',
			closable: true,
			type: 'confirm',
			maskClosable: true,
		});
	};

	return (
		<Header
			style={{
				padding: isMobile ? '0 8px' : '0 24px',
				backgroundColor: isDarkTheme ? '#141414' : '#727272',
			}}
		>
			<Flex
				align="center"
				justify={isMobile ? 'space-between' : 'flex-start'}
				gap={12}
				style={{ paddingTop: isMobile ? 8 : 0 }}
			>
				<Flex style={{}} align="center">
					{isMobile ? (
						<Button
							onClick={() => setOpen(true)}
							type="text"
							size="large"
							icon={<Icon icon="gg:menu-round" width="40" height="40" />}
						/>
					) : (
						<Icon icon="streamline-emojis:bicycle" width="40" height="40" />
					)}
					<ResponsiveSidebar
						isDarkTheme={isDarkTheme}
						user={user}
						open={open}
						setOpen={setOpen}
					/>
					{/* Site Title */}
					<Link to="/">
						<Title
							style={{
								textAlign: 'center',
								paddingTop: 8,
								marginLeft: isMobile ? 8 : 16,
								textWrap: 'nowrap',
							}}
							level={4}
							title={configs.site_title}
						>
							{configs.site_title}
						</Title>
					</Link>
				</Flex>
				<Flex
					justify={isMobile ? 'flex-end' : 'space-between'}
					align="center"
					style={{ width: '100%' }}
				>
					{!isMobile ? (
						<Menu
							style={{
								backgroundColor: isDarkTheme ? '#141414' : '#727272',
								borderBottom: 0,
							}}
							theme={isDarkTheme ? 'dark' : 'light'}
							mode="horizontal"
							onClick={selectCurrentPath}
							disabledOverflow
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
						<Badge size="small" count={cartTotal}>
							<Button
								type="link"
								shape="circle"
								icon={<Icon icon="raphael:cart" width="24" height="24" />}
								onClick={() => navigate('/cart')}
								style={{
									font: '18px bold',
								}}
							/>
						</Badge>

						{algorithm === theme.defaultAlgorithm ? (
							<Button
								onClick={() => dispatch(setTheme('dark'))}
								icon={
									<Icon
										icon="mdi:moon-and-stars"
										width="24"
										height="24"
									/>
								}
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
						{isLoading ? (
							<Spin />
						) : user ? (
							<Popover
								trigger="click"
								placement="bottomRight"
								content={
									<Space direction="vertical">
										<Badge size="small" count={cartTotal || 0}>
											<Button
												type="primary"
												icon={
													<Icon
														icon="raphael:cart"
														width="24"
														height="24"
													/>
												}
												onClick={() => navigate('/cart')}
												style={{
													font: '18px bold',
												}}
											>
												Cart
											</Button>
										</Badge>
										<Button
											type="primary"
											icon={
												<Icon
													icon="raphael:user"
													width="24"
													height="24"
												/>
											}
											onClick={() => navigate('/profile')}
											style={{
												font: '18px bold',
											}}
										>
											Profile
										</Button>
										<Button
											type="primary"
											color="red"
											danger
											icon={
												<Icon
													icon="mdi:logout"
													width="24"
													height="24"
												/>
											}
											onClick={handleLogOut}
											style={{
												font: '18px bold',
											}}
										>
											Logout
										</Button>
									</Space>
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
									title="Login"
									color="green"
									shape="default"
									icon={<Icon icon="mdi:lock" width="18" height="18" />}
									style={{ font: '18px bold' }}
								>
									{isMobile || 'Login'}
								</Button>
							</Link>
						)}
					</Flex>
				</Flex>
			</Flex>
		</Header>
	);
};

export default Navbar;
