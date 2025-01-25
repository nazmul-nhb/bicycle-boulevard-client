import './styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { BanguRoutes } from './routes';
import { App, ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from './app/store';
import type { TNotifications } from './types';
import { processNotifications } from './lib/notifications';

/**
 * Use modified `antd` notification methods as `toast`, `notify` and `showModal`.
 * @param sound - Whether to play sound effects or not.
 * @returns The notification methods (`toast`, `notify`, `showModal`).
 */
export default function AntNotifications(sound?: boolean): TNotifications {
	const appProps = App.useApp();

	const { toastify, notify, modal } = processNotifications(appProps, sound);

	return { toastify, notify, modal };
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ConfigProvider
					modal={{
						styles: {
							mask: { background: '#f6ffed' },
						},
					}}
					theme={{
						token: {
							colorPrimaryBg: '#111a2c',
							colorSuccessBg: '#111a2c',
							// colorPrimary: "#006ca2",
							// colorBgLayout: "#111a2c",
							borderRadius: 2,
							colorBgContainer: '#f6ffed',
							colorInfoBg: '#e6f7ff',
							colorWarningBg: '#fffbe6',
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
						<BanguRoutes />
					</App>
				</ConfigProvider>
			</BrowserRouter>
		</Provider>
	</StrictMode>
);
