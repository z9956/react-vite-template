import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { lazy } from 'react';

import { AuthProvider, useAuth } from './AuthProvider.jsx';
import LoginPage from '../pages/login/index.jsx';
import HomePage from '../pages/home/index.jsx';
import NoMatch from '../pages/404.jsx';

const BuMaintenancePage = lazy(() => import('../pages/buMaintenance'));

function RequireAuth({ children }) {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}

export default function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<HomePage />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/basicData">
						<Route
							path="/basicData/buMaintenance"
							element={
								<RequireAuth>
									<BuMaintenancePage />
								</RequireAuth>
							}
						/>
					</Route>
					<Route path="*" element={<NoMatch />} />
					<Route
						path="/"
						element={
							<RequireAuth>
								<BuMaintenancePage />
							</RequireAuth>
						}
					/>
				</Route>
			</Routes>
		</AuthProvider>
	);
}
