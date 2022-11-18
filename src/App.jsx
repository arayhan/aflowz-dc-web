import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { SystemInformationContainer } from './components/organisms';
import Home from './pages/SystemInformation/Home/Home';
import Login from './pages/Auth/Login/Login';
import { useAuthStore } from './store';

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
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
