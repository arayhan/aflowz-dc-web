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
import Penerima from './pages/Penerima/Penerima';
import PenerimaDetail from './pages/Penerima/PenerimaDetail';
import StaffListPage from './pages/Staff/StaffListPage';
import StaffCreate from './pages/Staff/StaffCreate';
import MitraForm from './pages/Mitra/MitraForm';
import StaffUpdate from './pages/Staff/StaffUpdate';
import ListPenerimaByKonstituen from './pages/Konstituen/ListPenerimaByKonstituen';
import StaffDetail from './pages/Staff/StaffDetail';
import City from './pages/City/City';
import CityForm from './pages/City/CityForm';
import CityDetail from './pages/City/CityDetail';
import Village from './pages/Village/Village';
import VillageForm from './pages/Village/VillageForm';
import VillageDetail from './pages/Village/VillageDetail';
import ListPenerimaByProgram from './pages/Program/ListPenerimaProgram';
import PenerimaForm from './pages/Penerima/PenerimaForm';
import Attendance from './pages/Attendance/AttendanceList';
import AttendanceCreateUpdate from './pages/Attendance/AttendanceCreateUpdate';
import AttendanceDetail from './pages/Attendance/AttendanceDetail';
import Dapil from './pages/Dapil/Dapil';
import District from './pages/District/District';
import DistrictDetail from './pages/District/DistrictDetail';
import DistrictForm from './pages/District/DistrictForm';
import TPS from './pages/TPS/TPS';
import TPSForm from './pages/TPS/TPSForm';

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
					<Route path="/mitra/update/:programCategoryID" element={<MitraForm />} />
					<Route path="/mitra/create" element={<MitraForm />} />
					<Route path="/mitra/:programCategoryID" element={<MitraDetail />} />
					<Route path="/mitra" element={<Mitra />} />
					<Route path="/institusi" element={<Konstituen />} />
					<Route path="/institusi/:konstituenID" element={<KonstituenDetail />} />
					<Route path="/institusi/create" element={<KonstituenCreate />} />
					<Route path="/institusi/update/:konstituenID" element={<KonstituenUpdate />} />
					<Route path="/institusi/penerima/:konstituenID" element={<ListPenerimaByKonstituen />} />
					<Route path="/village/update/:villageID" element={<VillageForm />} />
					<Route path="/village/create" element={<VillageForm />} />
					<Route path="/village/:villageID" element={<VillageDetail />} />
					<Route path="/village" element={<Village />} />
					<Route path="/city/update/:cityID" element={<CityForm />} />
					<Route path="/city/create" element={<CityForm />} />
					<Route path="/city/:cityID" element={<CityDetail />} />
					<Route path="/city" element={<City />} />
					<Route path="/district/update/:districtID" element={<DistrictForm />} />
					<Route path="/district/create" element={<DistrictForm />} />
					<Route path="/district/:districtID" element={<DistrictDetail />} />
					<Route path="/district" element={<District />} />
					<Route path="/program/penerima/:programID" element={<ListPenerimaByProgram />} />
					<Route path="/program/update/:programID" element={<ProgramForm />} />
					<Route path="/program/create" element={<ProgramForm />} />
					<Route path="/program/:programID" element={<ProgramDetail />} />
					<Route path="/program" element={<Program />} />
					<Route path="/penerima/update/:penerimaID" element={<PenerimaForm />} />
					<Route path="/penerima/create" element={<PenerimaForm />} />
					<Route path="/penerima/:penerimaID" element={<PenerimaDetail />} />
					<Route path="/penerima" element={<Penerima />} />
					<Route path="/staff" element={<StaffListPage />} />
					<Route path="/staff/create" element={<StaffCreate />} />
					<Route path="/staff/update/:staffID" element={<StaffUpdate />} />
					<Route path="/staff/:staffID" element={<StaffDetail />} />
					<Route path="/program/penerima/:programID" element={<ListPenerimaByProgram />} />
					<Route path="/absensi" element={<Attendance />} />
					<Route path="/absensi/:attendanceID" element={<AttendanceDetail />} />
					<Route path="/absensi/create" element={<AttendanceCreateUpdate />} />
					<Route path="/absensi/update/:attendanceID" element={<AttendanceCreateUpdate />} />
					<Route path="/dapil" element={<Dapil />} />
					<Route path="/TPS/update/:TPSID" element={<TPSForm />} />
					<Route path="/TPS/create" element={<TPSForm />} />
					<Route path="/tps" element={<TPS />} />
				</Route>
			</Route>
		</Routes>
	);
};
