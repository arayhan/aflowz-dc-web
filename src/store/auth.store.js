import { USER_ROLE_TYPES } from '@/utils/constants';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAuthStore = create(
	devtools((set) => ({
		isProcessLogin: false,
		isLoggedIn: false,
		auth: null,

		authLogin: (values) => {
			set({
				isLoggedIn: true,
				auth: {
					name: values.username,
					role: USER_ROLE_TYPES.ADMIN
				}
			});
		}
	}))
);

export const { getState, setState, destroy } = useAuthStore;
