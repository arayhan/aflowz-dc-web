import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader/DashboardHeader';

export const DashboardLayout = () => {
	return (
		<div>
			<DashboardHeader />
			<Outlet />
		</div>
	);
};
