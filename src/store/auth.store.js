import { SERVICE_AUTH } from '@/services';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { toast } from 'react-toastify';
import { useAppStore } from './app.store';

const { setPageLoading } = useAppStore.getState();

const states = (set) => ({
	isProcessLogin: false,
	isLoggedIn: false,
	isAdmin: false,
	isSystem: false,
	profile: null,

	authLogin: async (values) => {
		set({ isProcessLogin: true });
		setPageLoading(true);

		const loader = toast.loading('Logging in...');
		const params = { login: values.username, password: values.password };
		const { success, payload } = await SERVICE_AUTH.authLogin(params);

		if (success) {
			set({
				isLoggedIn: true,
				isAdmin: payload.is_admin,
				isSystem: payload.is_system,
				maxUploadSize: payload.max_file_upload_size,
				profile: {
					name: payload.name,
					username: payload.username
				}
			});
		}

		toast.update(loader, {
			type: success ? 'success' : 'error',
			render: success ? 'Login success' : payload?.odoo_error || 'Login failed',
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
