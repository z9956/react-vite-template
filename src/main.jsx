import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import App from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
);
