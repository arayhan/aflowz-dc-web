import { SERVICE_DPT } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set, get) => ({
	fetchingDPTItem: false,
	fetchingDPTList: false,
	fetchingDPTDetail: false,

	processingCreateDPT: false,
	processingUpdateDPT: false,
	processingDeleteDPT: false,

	DPTItem: null,
	DPTList: null,
	DPTDetail: null,

	errorsDPT: null,

	getDPTItem: async (DPTID) => {
		set({ fetchingDPT: true });
		set({ DPTItem: null });

		const { success, payload } = await SERVICE_DPT.getDPTItem(DPTID);

		if (!success) set({ errorsDPT: payload });

		set({ DPTItem: success ? payload : null });
		set({ fetchingDPT: false });
	},

	getDPTList: async (params) => {
		set({ fetchingDPTList: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_DPT.getDPTList(requestParams);

		set({ DPTList: success ? payload : null });
		set({ fetchingDPTList: false });
	},

	createDPT: async (params, callback) => {
		set({ processingCreateDPT: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_DPT.createDPT(params);

		if (!success) set({ errorsDPT: payload });

		toastRequestResult(loader, success, 'DPT created', payload?.odoo_error || payload?.message);
		set({ processingCreateDPT: false });

		callback({ payload, success });
	},

	updateDPT: async (DPTID, params, callback) => {
		set({ processingUpdateDPT: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_DPT.updateDPT(DPTID, params);

		if (!success) set({ errorsDPT: payload });

		toastRequestResult(loader, success, 'DPT updated', payload?.odoo_error || payload?.message);
		set({ processingUpdateDPT: false });

		callback({ payload, success });
	},

	deleteDPT: async (DPTID) => {
		set({ processingDeleteDPT: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_DPT.deleteDPT(DPTID);

		toastRequestResult(loader, success, 'DPT deleted', payload?.odoo_error || payload?.message);
		get().getDPTList();
		set({ processingDeleteDPT: false });
	},

	clearStateDPT: () => {
		set({ DPTList: null });
		set({ errorsDPT: null });
	}
});

export const useDPTStore = create(devtools(states));
