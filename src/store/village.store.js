import { SERVICE_VILLAGE } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingVillageItem: false,
	fetchingVillageList: false,
	fetchingVillageDetail: false,

	processingCreateVillage: false,
	processingUpdateVillage: false,
	processingDeleteVillage: false,

	villageItem: null,
	villageList: null,
	villageDetail: null,

	errorsVillage: null,

	getVillageItem: async (villageID) => {
		set({ fetchingVillage: true });
		set({ village: null });

		const { success, payload } = await SERVICE_VILLAGE.getVillageItem(villageID);

		if (!success) set({ errorsVillage: payload });

		set({ village: success ? payload : null });
		set({ fetchingVillage: false });
	},

	getVillageList: async (params) => {
		set({ fetchingVillageList: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_VILLAGE.getVillageList(requestParams);

		set({ villageList: success ? payload : null });
		set({ fetchingVillageList: false });
	},

	getVillageDetail: async (villageID) => {
		set({ fetchingVillageDetail: true });

		const { success, payload } = await SERVICE_VILLAGE.getVillageDetail(villageID);

		set({ villageDetail: success ? payload : null });
		set({ fetchingVillageDetail: false });
	},

	createVillage: async (params, callback) => {
		set({ processingCreateVillage: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_VILLAGE.createVillage(params);

		if (!success) set({ errorsVillage: payload });

		toastRequestResult(loader, success, 'Village created', payload?.odoo_error || payload?.message);
		set({ processingCreateVillage: false });

		callback({ payload, success });
	},

	updateVillage: async (villageID, params, callback) => {
		set({ processingUpdateVillage: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_VILLAGE.updateVillage(villageID, params);

		if (!success) set({ errorsVillage: payload });

		toastRequestResult(loader, success, 'Village updated', payload?.odoo_error || payload?.message);
		set({ processingUpdateVillage: false });

		callback({ payload, success });
	},

	deleteVillage: async (villageID) => {
		set({ processingDeleteVillage: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_VILLAGE.deleteVillage(villageID);

		toastRequestResult(loader, success, 'Kota deleted', payload?.odoo_error || payload?.message);
		get().getVillageList();
		set({ processingDeleteVillage: false });
	},

	clearStateVillage: () => {
		set({ village: null });
		set({ errorsVillage: null });
	}
});

export const useVillageStore = create(devtools(states, { name: 'village-store', getStorage: () => localStorage }));
