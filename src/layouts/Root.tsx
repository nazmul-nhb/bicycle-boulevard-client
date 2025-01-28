import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Icon } from '@iconify/react';
import { Button, Flex, Layout, Menu, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import { routes } from '../configs/route_list';
import { formatRoutes } from '../utils/routeUtils';
import { configs } from '../configs/site_configs';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectTheme, setTheme } from '../app/features/themeSlice';

const { Header, Sider, Content, Footer } = Layout;

const Root: React.FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const appTheme = useAppSelector(selectTheme);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const selectedKey = location.pathname;

	const algorithm = appTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;

	const isDarkTheme = appTheme === 'dark';

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				width={240}
				style={{
					backgroundColor: isDarkTheme ? '#141414' : '#ffffff',
				}}
				trigger={
					<Button
						type="text"
						icon={
							isCollapsed ? (
								<Icon
									icon="line-md:menu-unfold-right"
									width="24"
									height="24"
								/>
							) : (
								<Icon
									icon="line-md:menu-unfold-left"
									width="24"
									height="24"
								/>
							)
						}
						onClick={() => setIsCollapsed(!isCollapsed)}
						style={{
							fontSize: '16px',
							width: '100%',
							height: '100%',
							padding: 0,
							backgroundColor: isDarkTheme ? '#141414' : '#ffffff',
						}}
					/>
				}
				collapsible={true}
				collapsed={isCollapsed}
			>
				<Title
					style={{
						color: isDarkTheme ? '#d9d9d9' : '#000000',
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
						backgroundColor: isDarkTheme ? '#141414' : '#ffffff',
					}}
					theme={isDarkTheme ? 'dark' : 'light'}
					mode="inline"
					// onClick={() => setIsCollapsed(true)}
					defaultSelectedKeys={[selectedKey]}
					items={formatRoutes(routes, 'menu')}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						backgroundColor: isDarkTheme ? '#141414' : '',
						padding: '0',
					}}
				>
					<Flex
						justify="space-between"
						align="center"
						style={{ marginRight: 12 }}
					>
						<Menu
							style={{
								backgroundColor: isDarkTheme ? '#141414' : '#ffffff',
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
								icon={
									<Icon
										icon="mdi:moon-and-stars"
										width="24"
										height="24"
									/>
								}
								type="primary"
								style={{
									borderRadius: '50%',
								}}
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
								type="primary"
								style={{
									borderRadius: '50%',
								}}
							/>
						)}
					</Flex>
				</Header>
				<Content
					style={{
						padding: '8px 12px',
						// background: token.colorBgContainer,
						// borderRadius: token.borderRadiusLG,
					}}
				>
					<Outlet />
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					&copy; {new Date().getFullYear()} {configs.site_title}
				</Footer>
			</Layout>
		</Layout>
	);
};

export default Root;
