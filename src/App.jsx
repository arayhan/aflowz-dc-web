import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { SystemInformationContainer } from './components/organisms';
import { useAuthStore } from './store';

import Home from './pages/SystemInformation/Home/Home';
import Login from './pages/Auth/Login/Login';
import Program from './pages/SystemInformation/Program/Program';
import SystemInformationPageContainer from './components/organisms/SystemInformationPageContainer/SystemInformationPageContainer';

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
				<Route path="/" element={<SystemInformationContainer />}>
					<Route path="/" element={<Home />} />
					<Route path="/" element={<SystemInformationPageContainer />}>
						<Route path="/mitra" element={<Program />} />
						<Route path="/sekolah" element={<Program />} />
						<Route path="/kampus" element={<Program />} />
						<Route path="/desa" element={<Program />} />
						<Route path="/kota" element={<Program />} />
						<Route path="/program" element={<Program />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
