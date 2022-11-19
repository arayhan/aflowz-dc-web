import React from 'react';
import { useAuthStore } from './store';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { DashboardLayout, SiteLayout } from './components/organisms';

import Login from './pages/Auth/Login/Login';
import Home from './pages/Home/Home';
import Program from './pages/Program/Program';
import { Dashboard } from './pages/Dashboard/Dashboard';
import ProgramDetail from './pages/Program/ProgramDetail';
import Mitra from './pages/Mitra/Mitra';

export const AppRoutes = () => {
	const { isAdmin, isSystem, isLoggedIn } = useAuthStore();

	const ProtectedRoute = () => {
		return !isLoggedIn ? <Navigate to="/login" replace /> : <Outlet />;
	};

	const AuthenticationRoute = () => {
		if (isLoggedIn && isAdmin) return <Navigate to="/dashboard" replace />;
		if (isLoggedIn && isSystem) return <Navigate to="/" replace />;
		return <Outlet />;
	};

	return (
		<Routes>
			<Route element={<AuthenticationRoute />}>
				<Route path="/login" element={<Login />} />
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route element={<SiteLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/mitra/:mitraID" element={<Mitra />} />
					<Route path="/mitra" element={<Mitra />} />
					<Route path="/sekolah" element={<Program />} />
					<Route path="/kampus" element={<Program />} />
					<Route path="/desa" element={<Program />} />
					<Route path="/kota" element={<Program />} />
					<Route path="/program/:programID" element={<ProgramDetail />} />
					<Route path="/program" element={<Program />} />
				</Route>
				<Route path="/dashboard" element={<DashboardLayout />}>
					<Route path="" element={<Dashboard />} />
					<Route path="sekolah" element={<Dashboard />} />
					<Route path="program" element={<Dashboard />} />
				</Route>
			</Route>
		</Routes>
	);
};
