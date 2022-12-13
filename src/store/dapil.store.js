import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	selectedAreas: {
		city: null,
		district: null,
		village: null
	},

	setSelectedAreas: (areas) => {
		set({ selectedAreas: areas });
	},

	clearSelectedAreas: () => {
		selectedAreas({ city: null, district: null, village: null });
	}
});

export const useDapilStore = create(devtools(states, { name: 'dapil-store', getStorage: () => localStorage }));
