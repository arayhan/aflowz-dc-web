import React from 'react';
import { useAuthStore } from './store';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/organisms';

import Login from './pages/Auth/Login/Login';
import Home from './pages/Home/Home';
import Program from './pages/Program/Program';
import ProgramDetail from './pages/Program/ProgramDetail';
import Mitra from './pages/Mitra/Mitra';
import MitraDetail from './pages/Mitra/MitraDetail';
import ProgramForm from './pages/Program/ProgramForm';

export const AppRoutes = () => {
	const { isLoggedIn } = useAuthStore();

	const ProtectedRoute = () => {
		return !isLoggedIn ? <Navigate to="/login" replace /> : <Outlet />;
	};

	const AuthenticationRoute = () => {
		return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
	};

	return (
		<Routes>
			<Route element={<AuthenticationRoute />}>
				<Route path="/login" element={<Login />} />
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route element={<SiteLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/mitra/:mitraID" element={<MitraDetail />} />
					<Route path="/mitra" element={<Mitra />} />
					<Route path="/sekolah" element={<Program />} />
					<Route path="/kampus" element={<Program />} />
					<Route path="/desa" element={<Program />} />
					<Route path="/kota" element={<Program />} />
					<Route path="/program/create" element={<ProgramForm />} />
					<Route path="/program/:programID" element={<ProgramDetail />} />
					<Route path="/program" element={<Program />} />
				</Route>
			</Route>
		</Routes>
	);
};
