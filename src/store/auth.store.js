import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAuthStore = create(
	devtools((set) => ({
		isLoggedIn: false,

		authLogin: (values) => {
			set({ isLoggedIn: true });
		}
	}))
);

export const { getState, setState, destroy } = useAuthStore;
