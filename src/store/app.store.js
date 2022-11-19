import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAppStore = create(
	devtools((set) => ({
		isPageLoading: false,
		isFullPageLoading: false,

		setPageLoading: (isPageLoading) => set({ isPageLoading }),
		setFullPageLoading: (isFullPageLoading) => set({ isFullPageLoading })
	}))
);
