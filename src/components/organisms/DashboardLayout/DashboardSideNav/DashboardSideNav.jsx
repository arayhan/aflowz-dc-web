import React from 'react';
import { RiHomeLine } from 'react-icons/ri';
import { FaBox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DASHBOARD_MENUS = [
	{ label: 'Dashboard', icon: <RiHomeLine />, path: '' },
	{ label: 'Sekolah', icon: <FaBox />, path: '/sekolah' },
	{ label: 'Program', icon: <FaBox />, path: '/program' }
];

export const DashboardSideNav = () => {
	const navigate = useNavigate();

	return (
		<div className="w-60 bg-primary h-screen">
			{DASHBOARD_MENUS.map((menu) => (
				<button
					key={menu.path}
					className="w-full text-left text-white px-4 py-4 hover:bg-white hover:bg-opacity-5 flex items-center space-x-3"
					onClick={() => navigate(`/dashboard${menu.path}`)}
				>
					<span>{menu.icon}</span>
					<span>{menu.label}</span>
				</button>
			))}
		</div>
	);
};
