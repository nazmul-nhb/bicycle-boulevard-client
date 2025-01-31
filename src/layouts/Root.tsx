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
import { isDashboard } from '../utils/helpers';
import { useIsMobile } from '../hooks/useIsMobile';

const { Content, Footer } = Layout;

const Root: React.FC = () => {
	const {selectedPath} = useGetSelectedPath();
	const user = useAppSelector(selectUser);
	const appTheme = useAppSelector(selectTheme);
		const isMobile = useIsMobile();

	// console.log(selectedPath);

	const algorithm = appTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;

	const isDarkTheme = appTheme === 'dark';

	return (
		<Layout style={{ minHeight: '100vh' }}>
			{isMobile ||
				(user && isDashboard(selectedPath) ? <Sidebar user={user} isDarkTheme={isDarkTheme} /> : null)}
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
