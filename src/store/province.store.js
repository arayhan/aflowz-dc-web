import { SERVICE_PROVINCE } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingProvinceList: false,
	provinceList: null,

	getProvinceList: async (params) => {
		set({ fetchingProvinceList: true });

		const { success, payload } = await SERVICE_PROVINCE.getProvinceList(params);

		set({ provinceList: success ? payload : null });
		set({ fetchingProvinceList: false });
	}
});

export const useProvinceStore = create(devtools(states));
