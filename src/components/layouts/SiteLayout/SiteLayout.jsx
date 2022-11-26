import React from 'react';
import { Outlet } from 'react-router-dom';
import { SiteHeader } from './SiteHeader/SiteHeader';

export const SiteLayout = () => {
	return (
		<div>
			<SiteHeader />
			<Outlet />
		</div>
	);
};
