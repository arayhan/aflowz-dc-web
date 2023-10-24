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
import City from './pages/Dapil/City/City';
import CityForm from './pages/Dapil/City/CityForm';
import CityDetail from './pages/Dapil/City/CityDetail';
import District from './pages/Dapil/District/District';
import DistrictForm from './pages/Dapil/District/DistrictForm';
import DistrictDetail from './pages/Dapil/District/DistrictDetail';
import Village from './pages/Dapil/Village/Village';
import VillageForm from './pages/Dapil/Village/VillageForm';
import VillageDetail from './pages/Dapil/Village/VillageDetail';
import ListPenerimaByProgram from './pages/Program/ListPenerimaProgram';
import PenerimaForm from './pages/Penerima/PenerimaForm';
import Attendance from './pages/Attendance/AttendanceList';
import AttendanceCreateUpdate from './pages/Attendance/AttendanceCreateUpdate';
import AttendanceDetail from './pages/Attendance/AttendanceDetail';
import Dapil from './pages/Dapil/Dapil';
import TPS from './pages/TPS/TPS';
import TPSForm from './pages/TPS/TPSForm';
import Stockiest from './pages/Stockiest/Stockiest';
import StockiestCreateUpdate from './pages/Stockiest/StockiestCreateUpdate';
import StockiestMove from './pages/Stockiest/StockiestMove';
import StockiestDetail from './pages/Stockiest/StockiestDetail';
import Activity from './pages/Activity/Activity';
import ActivityForm from './pages/Activity/ActivityForm';
import ActivityDetail from './pages/Activity/ActivityDetail';
import ActivityDetailForm from './pages/Activity/ActivityDetailForm';
import ActivityPromiseForm from './pages/Activity/ActivityPromiseForm';
import ActivityDetailDetail from './pages/Activity/ActivityDetailDetail';
import CityDatabaseReport from './pages/Dapil/City/CityDatabaseReport';
import VillageDatabaseReport from './pages/Dapil/Village/VillageDatabaseReport';
import DistrictDatabaseReport from './pages/Dapil/District/DistrictDatabaseReport';
import KonstituenDatabaseReport from './pages/Konstituen/KonstituenDatabaseReport';
import MitraDetailTimelineForm from './pages/Mitra/MitraDetailTimelineForm';
import ProgramOrganization from './pages/ProgramOrganization/ProgramOrganization';
import ProgramOrganizationForm from './pages/ProgramOrganization/ProgramOrganizationForm';
import Proposal from './pages/Konstituen/Proposal';
import ProposalForm from './pages/Konstituen/ProposalForm';
import ProgramDetailTimelineForm from './pages/Program/ProgramDetailTimelineForm';
import Visitasi from './pages/Visitasi/Visitasi';
import VisitasiForm from './pages/Visitasi/VisitasiForm';
import VisitasiDetail from './pages/Visitasi/VisitasiDetail';
import VisitasiPromiseForm from './pages/Visitasi/VisitasiPromiseForm';
import TPSDetail from './pages/TPS/TPSDetail';
import Saksi from './pages/Saksi/Saksi';

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
					<Route
						path="/program/:programID/timeline/update/:programTimelineID"
						element={<ProgramDetailTimelineForm />}
					/>
					<Route path="/program/:programID/timeline/create" element={<ProgramDetailTimelineForm />} />
					<Route
						path="/mitra/:programCategoryID/timeline/update/:programCategoryTimelineID"
						element={<MitraDetailTimelineForm />}
					/>
					<Route path="/mitra/:programCategoryID/timeline/create" element={<MitraDetailTimelineForm />} />
					<Route path="/mitra/update/:programCategoryID" element={<MitraForm />} />
					<Route path="/mitra/create" element={<MitraForm />} />
					<Route path="/mitra/:programCategoryID" element={<MitraDetail />} />
					<Route path="/mitra" element={<Mitra />} />
					<Route path="/institusi" element={<Konstituen />} />
					<Route path="/institusi/:konstituenID/report" element={<KonstituenDatabaseReport />} />
					<Route path="/institusi/:konstituenID" element={<KonstituenDetail />} />
					<Route path="/institusi/create" element={<KonstituenCreate />} />
					<Route path="/institusi/update/:konstituenID" element={<KonstituenUpdate />} />
					<Route path="/institusi/penerima/:konstituenID" element={<ListPenerimaByKonstituen />} />
					<Route path="/institusi" element={<Konstituen />} />
					<Route path="/institusi/:konstituenID/proposal" element={<Proposal />} />
					<Route path="/institusi/:konstituenID/proposal/create" element={<ProposalForm />} />
					<Route path="/institusi/:konstituenID/proposal/update/:proposalID" element={<ProposalForm />} />
					<Route path="/dapil" element={<Dapil />} />
					<Route path="/dapil/city/update/:cityID" element={<CityForm />} />
					<Route path="/dapil/city/create" element={<CityForm />} />
					<Route path="/dapil/city/:cityID/report" element={<CityDatabaseReport />} />
					<Route path="/dapil/city/:cityID" element={<CityDetail />} />
					<Route path="/dapil/city" element={<City />} />
					<Route path="/dapil/district/update/:districtID" element={<DistrictForm />} />
					<Route path="/dapil/district/create" element={<DistrictForm />} />
					<Route path="/dapil/district/:districtID/report" element={<DistrictDatabaseReport />} />
					<Route path="/dapil/district/:districtID" element={<DistrictDetail />} />
					<Route path="/dapil/district" element={<District />} />
					<Route path="/dapil/village/update/:villageID" element={<VillageForm />} />
					<Route path="/dapil/village/create" element={<VillageForm />} />
					<Route path="/dapil/village/:villageID/report" element={<VillageDatabaseReport />} />
					<Route path="/dapil/village/:villageID" element={<VillageDetail />} />
					<Route path="/dapil/village" element={<Village />} />
					<Route path="/district/update/:districtID" element={<DistrictForm />} />
					<Route path="/district/create" element={<DistrictForm />} />
					<Route path="/district/:districtID" element={<DistrictDetail />} />
					<Route path="/district" element={<District />} />
					<Route
						path="/program/:programID/organization/update/:programOrganizationID"
						element={<ProgramOrganizationForm />}
					/>
					<Route path="/program/:programID/organization/create" element={<ProgramOrganizationForm />} />
					<Route path="/program/:programID/organization" element={<ProgramOrganization />} />
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
					<Route
						path="/activity/:activityID/detail/:activityDetailID/promise/update/:activityPromiseID"
						element={<ActivityPromiseForm />}
					/>
					<Route
						path="/activity/:activityID/detail/:activityDetailID/promise/create"
						element={<ActivityPromiseForm />}
					/>
					<Route path="/activity/:activityID/detail/update/:activityDetailID" element={<ActivityDetailForm />} />
					<Route path="/activity/:activityID/detail/create" element={<ActivityDetailForm />} />
					<Route path="/activity/:activityID/detail/:activityDetailID" element={<ActivityDetailDetail />} />
					<Route path="/activity/:activityID" element={<ActivityDetail />} />
					<Route path="/activity/update/:activityID" element={<ActivityForm />} />
					<Route path="/activity/create" element={<ActivityForm />} />
					<Route path="/activity" element={<Activity />} />
					<Route path="/visitasi/:visitasiID/promise/create" element={<VisitasiPromiseForm />} />
					<Route path="/visitasi/:visitasiID" element={<VisitasiDetail />} />
					<Route path="/visitasi/update/:visitasiID" element={<VisitasiForm />} />
					<Route path="/visitasi/create" element={<VisitasiForm />} />
					<Route path="/visitasi" element={<Visitasi />} />
					<Route path="/stockiest" element={<Stockiest />} />
					<Route path="/stockiest/create" element={<StockiestCreateUpdate />} />
					<Route path="/stockiest/update/:stockiestID" element={<StockiestCreateUpdate />} />
					<Route path="/stockiest/move" element={<StockiestMove />} />
					<Route path="/stockiest/:stockiestID" element={<StockiestDetail />} />
					<Route path="/tps/update/:TPSID" element={<TPSForm />} />
					<Route path="/tps/create" element={<TPSForm />} />
					<Route path="/tps/:TPSID" element={<TPSDetail />} />
					<Route path="/tps" element={<TPS />} />
					<Route path="/saksi" element={<Saksi />} />
				</Route>
			</Route>
		</Routes>
	);
};
