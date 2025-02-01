import './styles.css';
import './styles/quill.css';
import 'react-quill/dist/quill.snow.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import BicycleApp from './App';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BicycleApp />
		</Provider>
	</StrictMode>
);
