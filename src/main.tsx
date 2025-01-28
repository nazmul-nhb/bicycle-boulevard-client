import './styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'antd';
import { Provider } from 'react-redux';
import { store } from './app/store';
import type { TNotifications } from './types';
import { processNotifications } from './lib/notifications';
import BicycleApp from './App';

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
			<BicycleApp />
		</Provider>
	</StrictMode>
);
