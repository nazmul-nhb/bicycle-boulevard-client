import React from 'react';
import { Outlet } from 'react-router';
import { Layout, theme } from 'antd';
import { configs } from '../configs/site_configs';
import { useAppSelector } from '../app/hooks';
import { selectTheme } from '../app/features/themeSlice';
import { selectUser } from '../app/features/authSlice';
import Navbar from './components/Navbar';
import { useGetSelectedPath } from '../hooks/useSelectedPath';
import Sidebar from './components/Sidebar';

const { Content, Footer } = Layout;

const Root: React.FC = () => {
	const selectedKey = useGetSelectedPath();
	const user = useAppSelector(selectUser);
	const appTheme = useAppSelector(selectTheme);

	console.log(user);

	const algorithm = appTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;

	const isDarkTheme = appTheme === 'dark';

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sidebar isDarkTheme={isDarkTheme} selectedKey={selectedKey} />
			<Layout>
				<Navbar
					user={user}
					algorithm={algorithm}
					isDarkTheme={isDarkTheme}
					selectedKey={selectedKey}
				/>
				<Content style={{ padding: '8px 12px' }}>
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
