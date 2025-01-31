import React from 'react';
import { Outlet } from 'react-router';
import { Layout } from 'antd';
import { configs } from '../configs/site_configs';
import Navbar from './components/Navbar';
import { useGetSelectedPath } from '../hooks/useSelectedPath';
import Sidebar from './components/Sidebar';
import { isDashboard } from '../utils/helpers';
import { useIsMobile } from '../hooks/useIsMobile';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

const { Content, Footer } = Layout;

const Root: React.FC = () => {
	const { user } = useAuth();
	const { algorithm, isDarkTheme } = useTheme();
	const { selectedPath } = useGetSelectedPath();
	const isMobile = useIsMobile();

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
