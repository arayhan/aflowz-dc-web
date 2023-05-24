import React, { useState } from 'react';
import { RiHomeLine } from 'react-icons/ri';
import { GoSignOut } from 'react-icons/go';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAuthStore } from '@/store';
import { useNavigate } from 'react-router-dom';

export const ButtonProfileHeader = () => {
	const navigate = useNavigate();
	const { profile, authLogout } = useAuthStore();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const dropdownItemClasses = 'flex items-center space-x-3 p-3 text-left hover:bg-gray-100 text-gray-600';

	const dropdownRef = useDetectClickOutside({ onTriggered: () => setIsDropdownOpen(false) });

	const handleLogout = () => authLogout();

	return (
		<div className="relative flex items-center py-2 space-x-3 md:py-3">
			<button
				ref={dropdownRef}
				className="flex items-center px-3 py-2 space-x-2 rounded-md hover:bg-white hover:bg-opacity-5 md:px-4 md:py-3"
				onClick={() => setIsDropdownOpen(true)}
			>
				<img
					className="rounded-full w-7 md:w-8"
					src="https://static.wixstatic.com/media/0e8679_e83474054db34680800cb2c1bd81fb72~mv2.png/v1/fill/w_544,h_577,al_c,lg_1,q_85,enc_auto/avatars%20-%20Amanda.png"
					alt=""
				/>
				<div className="text-sm text-primary-600 md:text-base">
					<span>Welcome, </span> <span className="font-extralight">{profile.username}</span>
				</div>
			</button>

			{isDropdownOpen && (
				<div className="absolute bottom-0 right-0 z-10 w-48 overflow-hidden transform translate-y-full bg-white rounded-sm shadow-lg">
					<div className="flex flex-col text-xs divide-y md:text-sm">
						<button className={dropdownItemClasses} onClick={() => navigate('/')}>
							<RiHomeLine />
							<span>Home</span>
						</button>
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
