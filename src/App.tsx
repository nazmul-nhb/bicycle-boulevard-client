import { useEffect, useRef } from 'react';
import { App, ConfigProvider, theme } from 'antd';
import { useAppSelector } from './app/hooks';
import { selectTheme } from './app/features/themeSlice';
import { BrowserRouter } from 'react-router';
import { BicycleRoutes } from './routes';
import type { TNotifications } from './types';
import { processNotifications } from './lib/notifications';
import { useLazyGetMeQuery } from './app/api/authApi';
import { useAuth } from './hooks/useAuth';

/**
 * Use modified `antd` notification methods as `toast`, `notify` and `showModal`.
 * @param sound - Whether to play sound effects or not.
 * @returns The notification methods (`toast`, `notify`, `showModal`).
 */
export function AntNotifications(sound?: boolean): TNotifications {
	const appProps = App.useApp();

	const { toastify, notify, modal } = processNotifications(appProps, sound);

	return { toastify, notify, modal };
}

const BicycleApp = () => {
	const { token } = useAuth();
	const appTheme = useAppSelector(selectTheme);
	const [getCurrentUser] = useLazyGetMeQuery();

	const modalContainerRef = useRef<HTMLDivElement>(null);

	const algorithm = appTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;

	const isDarkTheme = appTheme === 'dark';

	useEffect(() => {
		if (!token) return;

		getCurrentUser();
	}, [getCurrentUser, token]);

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
					colorPrimary: isDarkTheme ? '#0d7f1b' : '#060e00',
					colorBgLayout: isDarkTheme ? '#111a2c' : '#f0f2f5',
					colorBgContainer: isDarkTheme ? '#141414' : '#ffffff',
					colorText: isDarkTheme ? '#d9d9d9' : '#000000',
					colorPrimaryBg: isDarkTheme ? '#1d1d1d' : '#e6f7ff',
					colorSuccessBg: isDarkTheme ? '#1d1d1d' : '#f6ffed',
					colorWarningBg: '#fffbe6',
				},

				components: {
					Layout: {
						siderBg: isDarkTheme ? '#141414' : '#727272',
						headerBg: isDarkTheme ? '#141414' : '#727272',
						footerBg: isDarkTheme ? '#141414' : '#727272',
						algorithm: true,
					},

					Menu: {
						itemBg: isDarkTheme ? '#141414' : '#727272',
						itemHoverBg: isDarkTheme ? '#141414' : '#e6f7ff',
						subMenuItemSelectedColor: isDarkTheme ? '#e6f7ff' : '#141414',
						subMenuItemBg: '#727272',
						darkSubMenuItemBg: '#141414',
						// colorLinkActive: '#1d1d1d',
						// itemActiveBg: isDarkTheme ? '#000000' : '#141414',
						algorithm: true,
						itemSelectedColor: isDarkTheme ? '#727272' : '#141414',
					},
					Table: {
						algorithm: true,
					},
					Result: {
						colorBgLayout: isDarkTheme ? '#141414' : '#727272',
						algorithm: true,
					},
					Button: {
						colorBgBase: isDarkTheme ? '#141414' : '#727272',
						algorithm: true,
					},
					Input: {
						paddingContentVertical: 12,
						paddingContentHorizontal: 8,
						activeBg: isDarkTheme ? '#141414' : '#ffffff',

						// colorBgContainerDisabled: isDarkTheme ? '#1d1d1d' : '#f5f5f5', // Disabled input
						// colorBorder: isDarkTheme ? '#333' : '#d9d9d9', // Default border
						// colorPrimaryBorderHover: isDarkTheme ? '#40a9ff' : '#1890ff', // Border on hover
						// colorPrimaryHover: isDarkTheme ? '#1d1d1d' : '#e6f7ff', // Background on hover
						// colorPrimaryBgHover: isDarkTheme ? '#1d1d1d' : '#e6f7ff', // Background on focus
						borderRadius: 0,
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
