import { APP_NAME } from '@/utils/constants';
import React from 'react';

const Login = () => {
	return (
		<div className="bg-primary-100">
			<div className="container flex justify-center items-center min-h-screen">
				<div className="w-full max-w-md bg-white rounded-md shadow-md">
					<div className="px-8 py-8 border-b text-center space-y-3">
						<div className="text-3xl text-primary font-extralight">{APP_NAME}</div>
						<div className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
					</div>
					<div className="px-8 py-6 border-b space-y-4">
						<div className="flex flex-col space-y-2">
							<label className="text-sm text-gray-400" htmlFor="username">
								Username
							</label>
							<input
								className="border-gray-300 rounded-md focus:ring-0 focus:outline-none focus:border-gray-300"
								name="username"
								id="username"
								placeholder="Username"
								type="text"
							/>
						</div>

						<div className="flex flex-col space-y-2">
							<label className="text-sm text-gray-400" htmlFor="password">
								Password
							</label>
							<input
								className="border-gray-300 rounded-md focus:ring-primary focus:outline-none"
								name="password"
								id="password"
								placeholder="Password"
								type="password"
							/>
						</div>
					</div>
					<div className="px-8 py-6">
						<button className="w-full bg-primary hover:bg-primary-600 transition-all text-white rounded-md py-3 disabled:bg-primary-300">
							Masuk
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
