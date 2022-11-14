import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAuthStore = create(
	devtools((set) => ({
		isLoggedIn: false,

		setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn })
	}))
);
