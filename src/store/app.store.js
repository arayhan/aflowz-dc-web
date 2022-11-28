import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	isPageLoading: false,
	isFullPageLoading: false,

	setPageLoading: (isPageLoading) => set({ isPageLoading }),
	setFullPageLoading: (isFullPageLoading) => set({ isFullPageLoading })
});

export const useAppStore = create(devtools(states, { name: 'app-store', getStorage: () => localStorage }));
