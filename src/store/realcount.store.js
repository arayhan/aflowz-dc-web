import { SERVICE_REALCOUNT } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set, get) => ({
	fetchingRealcountVillageDetail: false,

	realcountVillageDetail: null,

	getRealcountVillageDetail: async (villageID, params) => {
		set({ fetchingRealcountVillageDetail: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_REALCOUNT.getRealcountVillageDetail(villageID, requestParams);

		set({ realcountVillageDetail: success ? payload : null });
		set({ fetchingRealcountVillageDetail: false });
	}
});

export const useRealcountStore = create(devtools(states));
