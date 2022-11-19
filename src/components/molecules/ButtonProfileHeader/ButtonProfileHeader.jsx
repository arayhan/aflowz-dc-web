import React, { useState } from 'react';
import { GoSignOut } from 'react-icons/go';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAuthStore } from '@/store';

export const ButtonProfileHeader = () => {
	const { profile, authLogout } = useAuthStore();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const ref = useDetectClickOutside({ onTriggered: () => setIsDropdownOpen(false) });

	const handleLogout = () => authLogout();

	return (
		<div className="relative flex items-center space-x-3">
			<button
				ref={ref}
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
						<button
							className="flex items-center space-x-3 p-3 text-left hover:bg-gray-100 text-gray-600"
							onClick={handleLogout}
						>
							<GoSignOut />
							<span>Logout</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
