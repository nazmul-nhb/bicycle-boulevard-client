import { App, ConfigProvider, theme } from 'antd';
import { useAppSelector } from './app/hooks';
import { selectTheme } from './app/features/themeSlice';
import { BrowserRouter } from 'react-router';
import { BicycleRoutes } from './routes';
import CommonDrawer from './components/CommonDrawer';

const BicycleApp = () => {
	const appTheme = useAppSelector(selectTheme);

	const isDarkTheme = appTheme.theme === theme.darkAlgorithm;

	return (
		<ConfigProvider
			modal={{
				styles: {
					mask: { background: '#f6ffed' },
				},
			}}
			theme={{
				algorithm: appTheme.theme,
				token: {
					borderRadius: 2,
					colorPrimary: '#006ca2',
					colorBgLayout: isDarkTheme ? '#111a2c' : '#f0f2f5',
					colorBgContainer: isDarkTheme ? '#141414' : '#ffffff',
					colorText: isDarkTheme ? '#d9d9d9' : '#000000',
					colorPrimaryBg: isDarkTheme ? '#1d1d1d' : '#e6f7ff',
					colorSuccessBg: isDarkTheme ? '#1d1d1d' : '#f6ffed',
					colorWarningBg: '#fffbe6',
				},

				components: {
					Layout: {
						siderBg: isDarkTheme ? '#141414' : '#ffffff',
						headerBg: isDarkTheme ? '#141414' : '#ffffff',
						footerBg: isDarkTheme ? '#141414' : '',
						algorithm: true,
					},

					Menu: {
						itemBg: isDarkTheme ? '#141414' : '#ffffff',
						itemHoverBg: isDarkTheme ? '#141414' : '#e6f7ff',
						subMenuItemSelectedColor: isDarkTheme ? '#e6f7ff' : '# 141414',
						subMenuItemBg: '#fafafa',
						darkSubMenuItemBg: '#141414',
						algorithm: true,
					},
					Table: {
						algorithm: true,
					},
					Button: {
						algorithm: true,
					},
				},
			}}
		>
			<App
				notification={{
					pauseOnHover: true,
					showProgress: true,
					placement: 'bottomRight',
				}}
				message={{ duration: 2 }}
			>
				<BrowserRouter>
                    <BicycleRoutes />
                    <CommonDrawer/>
				</BrowserRouter>
			</App>
		</ConfigProvider>
	);
};

export default BicycleApp;
