import { SERVICE_DISTRICT } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingDistrictList: false,
	districtList: null,

	getDistrictList: async (params) => {
		set({ fetchingDistrictList: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_DISTRICT.getDistrictList(requestParams);

		set({ districtList: success ? payload : null });
		set({ fetchingDistrictList: false });
	}
});

export const useDistrictStore = create(devtools(states));
