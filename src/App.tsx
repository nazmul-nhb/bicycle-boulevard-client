import { App, ConfigProvider, theme } from 'antd';
import { useAppSelector } from './app/hooks';
import { selectTheme } from './app/features/themeSlice';
import { BrowserRouter } from 'react-router';
import { BicycleRoutes } from './routes';
import { useRef } from 'react';

const BicycleApp = () => {
	const appTheme = useAppSelector(selectTheme);
	const modalContainerRef = useRef<HTMLDivElement>(null);

	const algorithm = appTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;

	const isDarkTheme = appTheme === 'dark';

	return (
		<ConfigProvider
			getPopupContainer={() => modalContainerRef.current as HTMLElement}
			// modal={{
			// 	styles: {
			// 		mask: {
			// 			background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
			// 			backdropFilter: 'blur(8px)',
			// 		},
			// 	},
			// }}
			// drawer={{
			// 	styles: {
			// 		mask: {
			// 			background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
			// 			backdropFilter: 'blur(8px)',
			// 		},
			// 	},
			// }}
			theme={{
				algorithm,
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
				<div ref={modalContainerRef}>
					<BrowserRouter>
						<BicycleRoutes />
					</BrowserRouter>
				</div>
			</App>
		</ConfigProvider>
	);
};

export default BicycleApp;
