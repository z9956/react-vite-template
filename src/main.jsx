import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

import App from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ErrorBoundary>
	</React.StrictMode>,
);
