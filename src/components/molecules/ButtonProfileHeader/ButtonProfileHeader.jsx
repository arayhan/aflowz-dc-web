import React, { useState } from 'react';
import { RiAdminLine, RiHomeLine } from 'react-icons/ri';
import { GoSignOut } from 'react-icons/go';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAuthStore } from '@/store';
import { useNavigate } from 'react-router-dom';

export const ButtonProfileHeader = () => {
	const navigate = useNavigate();
	const { isAdmin, isSystem, profile, authLogout } = useAuthStore();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const dropdownItemClasses = 'flex items-center space-x-3 p-3 text-left hover:bg-gray-100 text-gray-600';

	const dropdownRef = useDetectClickOutside({ onTriggered: () => setIsDropdownOpen(false) });

	const handleLogout = () => authLogout();

	return (
		<div className="relative flex items-center space-x-3">
			<button
				ref={dropdownRef}
				className="flex items-center hover:bg-white hover:bg-opacity-5 px-4 py-4 space-x-2"
				onClick={() => setIsDropdownOpen(true)}
			>
				<img
					className="w-8 rounded-full"
					src="https://static.wixstatic.com/media/0e8679_e83474054db34680800cb2c1bd81fb72~mv2.png/v1/fill/w_544,h_577,al_c,lg_1,q_85,enc_auto/avatars%20-%20Amanda.png"
					alt=""
				/>
				<div className="text-white">
					<span>Welcome, </span> <span className="font-extralight">{profile.username}</span>
				</div>
			</button>

			{isDropdownOpen && (
				<div className="absolute right-0 bottom-0 transform translate-y-full w-48 bg-white rounded-sm shadow-lg overflow-hidden">
					<div className="flex flex-col divide-y">
						{isSystem && (
							<button className={dropdownItemClasses} onClick={() => navigate('/')}>
								<RiHomeLine />
								<span>Home</span>
							</button>
						)}
						{isAdmin && (
							<button className={dropdownItemClasses} onClick={() => navigate('/dashboard')}>
								<RiAdminLine />
								<span>Dashboard</span>
							</button>
						)}
						<button className={dropdownItemClasses} onClick={handleLogout}>
							<GoSignOut />
							<span>Logout</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
