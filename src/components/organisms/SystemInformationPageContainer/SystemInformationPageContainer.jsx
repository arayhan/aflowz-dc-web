import React from 'react';
import { Outlet } from 'react-router-dom';
import { SystemInformationPageBanner } from './SystemInformationPageBanner/SystemInformationPageBanner';

const SystemInformationPageContainer = () => {
	return (
		<div>
			<SystemInformationPageBanner />
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default SystemInformationPageContainer;
