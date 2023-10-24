import { SERVICE_REALCOUNT } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set, get) => ({
	fetchingRealCountVillageDetail: false,

	realcountVillageDetail: null,

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
