import React from 'react';
import { useAuthStore } from './store';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/layouts';

import Login from './pages/Auth/Login/Login';
import Home from './pages/Home/Home';
import Program from './pages/Program/Program';
import ProgramDetail from './pages/Program/ProgramDetail';
import Mitra from './pages/Mitra/Mitra';
import MitraDetail from './pages/Mitra/MitraDetail';
import ProgramForm from './pages/Program/ProgramForm';
import Konstituen from './pages/Konstituen/Konstituen';
import KonstituenDetail from './pages/Konstituen/KonstituenDetail';
import KonstituenCreate from './pages/Konstituen/KonstituenCreate';
import KonstituenUpdate from './pages/Konstituen/KonstituenUpdate';
import Partner from './pages/Partner/Partner';
import StaffListPage from './pages/Staff/StaffListPage';

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
					<Route path="/konstituen" element={<Konstituen />} />
					<Route path="/konstituen/:konstituenID" element={<KonstituenDetail />} />
					<Route path="/konstituen/create" element={<KonstituenCreate />} />
					<Route path="/konstituen/update/:konstituenID" element={<KonstituenUpdate />} />
					<Route path="/desa" element={<Program />} />
					<Route path="/kota" element={<Program />} />
					<Route path="/program/update/:programID" element={<ProgramForm />} />
					<Route path="/program/create" element={<ProgramForm />} />
					<Route path="/program/:programID" element={<ProgramDetail />} />
					<Route path="/program" element={<Program />} />
					<Route path="/partner" element={<Partner />} />
					<Route path="/staff" element={<StaffListPage />} />
				</Route>
			</Route>
		</Routes>
	);
};
