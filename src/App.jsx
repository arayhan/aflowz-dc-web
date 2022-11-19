import { useEffect, useRef } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAppStore, useAuthStore } from './store';
import LoadingBar from 'react-top-loading-bar';

import { SiteLayout } from './components/organisms';

import Login from './pages/Auth/Login/Login';
import Home from './pages/Home/Home';
import Program from './pages/Program/Program';
import { APP_COLOR_PRIMARY } from './utils/constants';

function App() {
	const loaderRef = useRef(null);

	const { isLoggedIn } = useAuthStore();
	const { isPageLoading } = useAppStore();

	const ProtectedRoute = () => {
		return !isLoggedIn ? <Navigate to="/login" replace /> : <Outlet />;
	};
	const AuthenticationRoute = () => {
		return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
	};

	useEffect(() => {
		if (isPageLoading) loaderRef.current.continuousStart();
		else loaderRef.current.complete();
	}, [isPageLoading]);

	return (
		<div>
			<LoadingBar color={APP_COLOR_PRIMARY} ref={loaderRef} />

			<Routes>
				<Route element={<AuthenticationRoute />}>
					<Route path="/login" element={<Login />} />
				</Route>

				<Route element={<ProtectedRoute />}>
					<Route element={<SiteLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="/mitra" element={<Program />} />
						<Route path="/sekolah" element={<Program />} />
						<Route path="/kampus" element={<Program />} />
						<Route path="/desa" element={<Program />} />
						<Route path="/kota" element={<Program />} />
						<Route path="/program" element={<Program />} />
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
