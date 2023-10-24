import { SERVICE_REALCOUNT } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingRealCountCityDetail: false,
	fetchingRealCountVillageDetail: false,

	realcountCityDetail: null,
	realcountVillageDetail: null,

	getRealCountCityDetail: async (cityID, params) => {
		set({ fetchingRealCountCityDetail: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_REALCOUNT.getRealCountCityDetail(cityID, requestParams);

		set({ realcountCityDetail: success ? payload : null });
		set({ fetchingRealCountCityDetail: false });
	},
	getRealCountVillageDetail: async (villageID, params) => {
		set({ fetchingRealCountVillageDetail: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_REALCOUNT.getRealCountVillageDetail(villageID, requestParams);

		set({ realcountVillageDetail: success ? payload : null });
		set({ fetchingRealCountVillageDetail: false });
	}
});

export const useRealCountStore = create(devtools(states));
