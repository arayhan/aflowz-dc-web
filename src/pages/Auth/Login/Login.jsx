import { APP_NAME } from '@/utils/constants';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/utils/validation-schema';
import { useAuthStore } from '@/store';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(loginSchema) });

	const { isProcessLogin } = useAuthStore();
	const { authLogin } = useAuthStore();

	const handleLogin = (values) => authLogin({ username: values.username, password: values.password });

	return (
		<div className="bg-primary-100">
			<div className="container flex justify-center items-center min-h-screen">
				<form className="w-full max-w-md bg-white rounded-md shadow-md" onSubmit={handleLogin}>
					<div className="px-8 py-8 border-b text-center space-y-3">
						<div className="text-3xl text-primary font-extralight">{APP_NAME}</div>
						{/* <div className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div> */}
					</div>
					<div className="px-8 py-6 border-b space-y-4">
						<div className="flex flex-col space-y-2">
							<label className="text-sm text-gray-400" htmlFor="username">
								Username
							</label>
							<div className="space-y-1">
								<input
									{...register('username')}
									className="w-full border-gray-300 rounded-md focus:ring-0 focus:outline-none focus:border-gray-300"
									id="username"
									placeholder="Username"
									disabled={isProcessLogin}
									type="text"
								/>
								{errors.username && <div className="text-sm text-red-500">{errors.username.message}</div>}
							</div>
						</div>

						<div className="flex flex-col space-y-2">
							<label className="text-sm text-gray-400" htmlFor="password">
								Password
							</label>
							<div className="space-y-1">
								<input
									{...register('password')}
									className="w-full border-gray-300 rounded-md focus:ring-primary focus:outline-none"
									id="password"
									placeholder="Password"
									disabled={isProcessLogin}
									type="password"
								/>
								{errors.password && <div className="text-sm text-red-500">{errors.password.message}</div>}
							</div>
						</div>
					</div>
					<div className="px-8 py-6">
						<button
							disabled={isProcessLogin}
							className="w-full bg-primary hover:bg-primary-600 transition-all text-white rounded-md py-3 disabled:bg-primary-300"
							onClick={handleSubmit(handleLogin)}
						>
							Masuk
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
