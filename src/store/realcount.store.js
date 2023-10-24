import { SERVICE_REALCOUNT } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingRealCountCityDetail: false,
	fetchingRealCountDistrictDetail: false,
	fetchingRealCountVillageDetail: false,

	realcountCityDetail: null,
	realcountDistrictDetail: null,
	realcountVillageDetail: null,

	getRealCountCityDetail: async (cityID, params) => {
		set({ fetchingRealCountCityDetail: true });

		const defaultParams = {};
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_REALCOUNT.getRealCountCityDetail(cityID, requestParams);

		set({ realcountCityDetail: success ? payload : null });
		set({ fetchingRealCountCityDetail: false });
	},
	getRealCountDistrictDetail: async (districtID, params) => {
		set({ fetchingRealCountDistrictDetail: true });

		const defaultParams = {};
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_REALCOUNT.getRealCountDistrictDetail(districtID, requestParams);

		set({ realcountDistrictDetail: success ? payload : null });
		set({ fetchingRealCountDistrictDetail: false });
	},
	getRealCountVillageDetail: async (villageID, params) => {
		set({ fetchingRealCountVillageDetail: true });

		const defaultParams = {};
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_REALCOUNT.getRealCountVillageDetail(villageID, requestParams);

		set({ realcountVillageDetail: success ? payload : null });
		set({ fetchingRealCountVillageDetail: false });
	}
});

export const useRealCountStore = create(devtools(states));
