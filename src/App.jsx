import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login/Login';
import { useAuthStore } from './store';

const AuthenticationRoute = () => {
	const { isLoggedIn } = useAuthStore();
	return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

const ProtectedRoute = () => {
	const { isLoggedIn } = useAuthStore();
	return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
	return (
		<Routes>
			<Route element={<AuthenticationRoute />}>
				<Route path="/login" element={<Login />} />
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<div>Home</div>} />
			</Route>
		</Routes>
	);
}

export default App;
