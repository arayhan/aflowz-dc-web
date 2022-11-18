import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store';

import { SiteLayout } from './components/organisms';

import Login from './pages/Auth/Login/Login';
import Home from './pages/Home/Home';
import Program from './pages/Program/Program';

const ProtectedRoute = () => {
	const { isLoggedIn } = useAuthStore();
	return !isLoggedIn ? <Navigate to="/login" replace /> : <Outlet />;
};

const AuthenticationRoute = () => {
	const { isLoggedIn } = useAuthStore();
	return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

function App() {
	return (
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
	);
}

export default App;
