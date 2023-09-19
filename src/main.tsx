import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app/ui/App';
import '@/app/styles/index.scss';
import { StoreProvider } from '@/app/providers/Store/ui/StoreProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary>
			<StoreProvider>
				<App />
			</StoreProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
