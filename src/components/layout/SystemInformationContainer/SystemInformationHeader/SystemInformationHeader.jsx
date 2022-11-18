import React from 'react';
import { Link } from 'react-router-dom';

export const SystemInformationHeader = () => {
	return (
		<div className="bg-primary">
			<div className="container">
				<div className="flex items-center justify-between">
					<Link to={'/'} className="text-white font-extralight text-xl">
						DC Web
					</Link>
					<div className="flex items-center space-x-3">
						<button className="flex items-center hover:bg-white hover:bg-opacity-5 px-4 py-4 space-x-2">
							<img
								className="w-8 rounded-full"
								src="https://static.wixstatic.com/media/0e8679_e83474054db34680800cb2c1bd81fb72~mv2.png/v1/fill/w_544,h_577,al_c,lg_1,q_85,enc_auto/avatars%20-%20Amanda.png"
								alt=""
							/>
							<div className="text-white">
								<span>Welcome, </span> <span className="font-extralight">Dewi Coryati</span>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
