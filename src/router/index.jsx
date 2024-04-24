import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './AuthProvider.jsx';
import LoginPage from '../pages/login/index.jsx';
import HomePage from '../pages/home/index.jsx';
import NoMatch from '../pages/404.jsx';

const BuMaintenancePage = lazy(() => import('../pages/buMaintenance'));
const ConfirmRightsPage = lazy(() => import('../pages/confirmRights'));
const BuProfitPage = lazy(() => import('../pages/buProfit'));

function RequireAuth({ children }) {
	const { isAuthenticated = false } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <Suspense fallback={<Spin />}>{children}</Suspense>;
}

export default function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<HomePage />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/basicData">
						<Route
							index
							element={
								<RequireAuth>
									<BuMaintenancePage />
								</RequireAuth>
							}
						/>
						<Route
							path="/basicData/buMaintenance"
							element={
								<RequireAuth>
									<BuMaintenancePage />
								</RequireAuth>
							}
						/>
						<Route
							path="/basicData/confirmRights"
							element={
								<RequireAuth>
									<ConfirmRightsPage />
								</RequireAuth>
							}
						/>
					</Route>

					<Route
						path="/buProfit"
						element={
							<RequireAuth>
								<BuProfitPage />
							</RequireAuth>
						}
					/>
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
