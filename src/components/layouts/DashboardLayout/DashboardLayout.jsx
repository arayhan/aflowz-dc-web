import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader/DashboardHeader';
import { DashboardSideNav } from './DashboardSideNav/DashboardSideNav';

export const DashboardLayout = () => {
	return (
		<div className="max-h-screen overflow-hidden">
			<DashboardHeader />
			<div className="flex">
				<DashboardSideNav />
				<Outlet />
			</div>
		</div>
	);
};
