import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './AuthProvider.jsx';
import LoginPage from '../pages/login/index.jsx';
import HomePage from '../pages/home/index.jsx';
import NoMatch from '../pages/404.jsx';

const PermissionsPage = lazy(() => import('../pages/permissions'));

function RequireAuth({ children }) {
	const { isAuthenticated = false } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return (
		<Suspense fallback={<Spin className="errorBoundary" />}>
			{children}
		</Suspense>
	);
}

export default function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<HomePage />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/permissions">
						<Route
							index
							element={
								<RequireAuth>
									<PermissionsPage />
								</RequireAuth>
							}
						/>
						<Route
							path="/permissions/test"
							element={
								<RequireAuth>
									<PermissionsPage />
								</RequireAuth>
							}
						/>
					</Route>
					<Route path="*" element={<NoMatch />} />
					<Route
						path="/"
						element={
							<RequireAuth>
								<PermissionsPage />
							</RequireAuth>
						}
					/>
				</Route>
			</Routes>
		</AuthProvider>
	);
}
