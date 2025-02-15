import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router';
import { configs } from '../configs/site_configs';
import { useAuth } from '../hooks/useAuth';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useGetSelectedPath } from '../hooks/useSelectedPath';
import { useTheme } from '../hooks/useTheme';
import { isDashboard } from '../utils/helpers';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const { Content, Footer } = Layout;

const Root: React.FC = () => {
	const { user } = useAuth();
	const { algorithm, isDarkTheme } = useTheme();
	const { selectedPath } = useGetSelectedPath();
	const isMobile = useMediaQuery();

	return (
		<Layout style={{ minHeight: '100vh' }}>
			{isMobile ||
				(user && isDashboard(selectedPath) ? (
					<Sidebar user={user} isDarkTheme={isDarkTheme} />
				) : null)}
			<Layout>
				<Navbar user={user} algorithm={algorithm} isDarkTheme={isDarkTheme} />
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
