import { SERVICE_VILLAGE } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingVillageList: false,
	villageList: null,

	getVillageList: async (cityID) => {
		set({ fetchingVillageList: true });

		const { success, payload } = await SERVICE_VILLAGE.getVillageList(cityID);

		set({ villageList: success ? payload : null });
		set({ fetchingVillageList: false });
	}
});

export const useVillageStore = create(devtools(states));
