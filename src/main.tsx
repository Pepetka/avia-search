import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app/ui/App';
import '@/app/styles/index.scss';
import { StoreProvider } from '@/app/providers/Store/ui/StoreProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<StoreProvider>
			<App />
		</StoreProvider>
	</React.StrictMode>
);
