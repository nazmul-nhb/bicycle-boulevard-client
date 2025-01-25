import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Icon } from '@iconify/react';
import { Button, Layout, Menu, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import { routes } from '../configs/route_list';
import { formatRoutes } from '../utils/routeUtils';
import { configs } from '../configs/site_configs';

const { Header, Sider, Content, Footer } = Layout;

const Root: React.FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const { token } = theme.useToken();

	const location = useLocation();
	const selectedKey = location.pathname;

	console.log(configs.server_api);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider width={240} trigger={null} collapsible={true} collapsed={isCollapsed}>
				<Title
					style={{
						color: 'white',
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
					theme="dark"
					mode="inline"
					// onClick={() => setIsCollapsed(true)}
					defaultSelectedKeys={[selectedKey]}
					items={formatRoutes(routes, 'menu')}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: '0', background: token.colorBgContainer }}>
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
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content
					style={{
						padding: '0 16px',
						background: token.colorBgContainer,
						borderRadius: token.borderRadiusLG,
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
