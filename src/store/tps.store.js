import { SERVICE_TPS } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingTPSItem: false,
	fetchingTPSList: false,
	fetchingTPSDetail: false,

	processingCreateTPS: false,
	processingUpdateTPS: false,
	processingDeleteTPS: false,

	TPSItem: null,
	TPSList: null,
	TPSDetail: null,

	errorsTPS: null,

	getTPSItem: async (TPSID) => {
		set({ fetchingTPS: true });
		set({ TPS: null });

		const { success, payload } = await SERVICE_TPS.getTPSItem(TPSID);

		if (!success) set({ errorsTPS: payload });

		set({ TPS: success ? payload : null });
		set({ fetchingTPS: false });
	},

	getTPSList: async (params) => {
		set({ fetchingTPSList: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_TPS.getTPSList(requestParams);

		set({ TPSList: success ? payload : null });
		set({ fetchingTPSList: false });
	},

	createTPS: async (params, callback) => {
		set({ processingCreateTPS: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_TPS.createTPS(params);

		if (!success) set({ errorsTPS: payload });

		toastRequestResult(loader, success, 'TPS created', payload?.odoo_error || payload?.message);
		set({ processingCreateTPS: false });

		callback({ payload, success });
	},

	updateTPS: async (TPSID, params, callback) => {
		set({ processingUpdateTPS: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_TPS.updateTPS(TPSID, params);

		if (!success) set({ errorsTPS: payload });

		toastRequestResult(loader, success, 'TPS updated', payload?.odoo_error || payload?.message);
		set({ processingUpdateTPS: false });

		callback({ payload, success });
	},

	deleteTPS: async (TPSID) => {
		set({ processingDeleteTPS: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_TPS.deleteTPS(TPSID);

		toastRequestResult(loader, success, 'Desa deleted', payload?.odoo_error || payload?.message);
		get().getTPSList();
		set({ processingDeleteTPS: false });
	},

	clearStateTPS: () => {
		set({ TPSList: null });
		set({ errorsTPS: null });
	}
});

export const useTPSStore = create(devtools(states));
