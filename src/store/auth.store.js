import { SERVICE_AUTH } from '@/services';
import { USER_ROLE_TYPES } from '@/utils/constants';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { toast } from 'react-toastify';
import { useAppStore } from './app.store';

const { setPageLoading } = useAppStore.getState();

const states = (set) => ({
	isProcessLogin: false,
	isLoggedIn: false,
	auth: null,

	authLogin: async (values) => {
		set({ isProcessLogin: true });
		setPageLoading(true);

		const loader = toast.loading('Logging in...');
		const params = { login: values.username, password: values.password, db: process.env.REACT_APP_API_DB };
		const response = await SERVICE_AUTH.authLogin(params);

		// TODO: Check if response is success or not
		set({
			isLoggedIn: true,
			auth: {
				name: values.username,
				role: USER_ROLE_TYPES.ADMIN
			}
		});

		toast.update(loader, {
			type: response.success ? 'success' : 'error',
			render: response.success ? 'Login success' : 'Login failed',
			isLoading: false,
			autoClose: 1500
		});

		set({ isProcessLogin: false });
		setPageLoading(false);
	},
	authLogout: () => {
		set({
			isLoggedIn: false,
			auth: null
		});
	}
});

export const useAuthStore = create(devtools(persist(states, { name: 'auth-store', getStorage: () => localStorage })));
