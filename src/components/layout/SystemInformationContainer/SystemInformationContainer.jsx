import React from 'react';
import { Outlet } from 'react-router-dom';
import { SystemInformationHeader } from './SystemInformationHeader/SystemInformationHeader';

export const SystemInformationContainer = () => {
	return (
		<div>
			<SystemInformationHeader />
			<div>
				<Outlet />
			</div>
		</div>
	);
};
