import './styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import BicycleApp from './App';
import { store } from './app/store';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BicycleApp />
		</Provider>
	</StrictMode>
);
