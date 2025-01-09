import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import { useAuth } from '../context/AuthContext.js';
import AuthProvider from './AuthProvider.jsx';
import LoginPage from '../pages/login/index.jsx';
import HomePage from '../pages/home/index.jsx';
import NoMatch from '../pages/404.jsx';

const PermissionsPage = lazy(() => import('../pages/permissions'));

function ProtectedRoute({ children }) {
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

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

function GuestRoute({ children }) {
	const { isAuthenticated = false } = useAuth();
	const location = useLocation();

	if (isAuthenticated) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return (
		<Suspense fallback={<Spin className="errorBoundary" />}>
			{children}
		</Suspense>
	);
}

GuestRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<HomePage />}>
					<Route
						path="/login"
						element={
							<GuestRoute>
								<LoginPage />
							</GuestRoute>
						}
					/>

					<Route path="/permissions">
						<Route
							index
							element={
								<ProtectedRoute>
									<PermissionsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/permissions/test"
							element={
								<ProtectedRoute>
									<PermissionsPage />
								</ProtectedRoute>
							}
						/>
					</Route>

					<Route
						path="/"
						element={
							<ProtectedRoute>
								<PermissionsPage />
							</ProtectedRoute>
						}
					/>

					<Route path="*" element={<NoMatch />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
}
