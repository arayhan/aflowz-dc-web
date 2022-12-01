import { SERVICE_DISTRICT } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingDistrictList: false,
	districtList: null,

	getDistrictList: async (cityID) => {
		set({ fetchingDistrictList: true });

		const { success, payload } = await SERVICE_DISTRICT.getDistrictList(cityID);

		set({ districtList: success ? payload : null });
		set({ fetchingDistrictList: false });
	}
});

export const useDistrictStore = create(devtools(states));
