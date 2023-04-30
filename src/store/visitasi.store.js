import { SERVICE_VISITASI } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set, get) => ({
	fetchingVisitasiItem: false,
	fetchingVisitasiCategory: false,
	fetchingVisitasiList: false,
	fetchingVisitasiPromiseItem: false,
	fetchingVisitasiPromiseList: false,

	processingCreateVisitasi: false,
	processingUpdateVisitasi: false,
	processingDeleteVisitasi: false,
	processingCreateVisitasiPromise: false,
	processingUpdateVisitasiPromise: false,
	processingDeleteVisitasiPromise: false,

	visitasiItem: null,
	visitasiCategory: null,
	visitasiList: null,
	visitasiPromiseItem: null,
	visitasiPromiseList: null,

	errorsVisitasi: null,
	errorsVisitasiPromise: null,

	// ==================================
	// Visitasi
	// ==================================
	getVisitasiItem: async (visitasiID) => {
		set({ fetchingVisitasiItem: true });
		set({ visitasiItem: null });

		const { success, payload } = await SERVICE_VISITASI.getVisitasiItem(visitasiID);

		if (!success) set({ errorsVisitasi: payload });

		set({ visitasiItem: success ? payload : null });
		set({ fetchingVisitasiItem: false });
	},

	getVisitasiCategory: async () => {
		set({ fetchingVisitasiCategory: true });
		set({ visitasiCategory: null });

		const { success, payload } = await SERVICE_VISITASI.getVisitasiCategory();

		if (!success) set({ errorsVisitasi: payload });

		set({ visitasiCategory: success ? payload : null });
		set({ fetchingVisitasiCategory: false });
	},

	getVisitasiList: async (params = {}) => {
		set({ fetchingVisitasiList: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_VISITASI.getVisitasiList(requestParams);

		set({ visitasiList: success ? payload : null });
		set({ fetchingVisitasiList: false });
	},

	createVisitasi: async (params, callback) => {
		set({ processingCreateVisitasi: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_VISITASI.createVisitasi(params);

		if (!success) set({ errorsVisitasi: payload });

		toastRequestResult(loader, success, 'Visitasi created', payload?.odoo_error || payload?.message);
		set({ processingCreateVisitasi: false });
		callback({ payload, success });
	},

	updateVisitasi: async (visitasiID, params, callback) => {
		set({ processingUpdateVisitasi: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_VISITASI.updateVisitasi(visitasiID, params);

		if (!success) set({ errorsVisitasi: payload });

		toastRequestResult(loader, success, 'Visitasi updated', payload?.odoo_error || payload?.message);
		set({ processingUpdateVisitasi: false });

		callback({ payload, success });
	},

	deleteVisitasi: async (visitasiID) => {
		set({ processingDeleteVisitasi: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_VISITASI.deleteVisitasi(visitasiID);

		toastRequestResult(loader, success, 'Visitasi deleted', payload?.odoo_error || payload?.message);
		get().getVisitasiList();
		set({ processingDeleteVisitasi: false });
	},

	// ==================================
	// VisitasiPromise
	// ==================================
	getVisitasiPromiseItem: async (visitasiPromiseID) => {
		set({ fetchingVisitasiPromiseItem: true });

		const { success, payload } = await SERVICE_VISITASI.getVisitasiPromiseItem(visitasiPromiseID);

		set({ visitasiPromiseItem: success ? payload : null });
		set({ fetchingVisitasiPromiseItem: false });
	},

	getVisitasiPromiseList: async (params = {}, isSetLoading = true) => {
		if (isSetLoading) set({ fetchingVisitasiPromiseList: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_VISITASI.getVisitasiPromiseList(requestParams);

		set({ visitasiPromiseList: success ? payload : null });
		set({ fetchingVisitasiPromiseList: false });
	},

	createVisitasiPromise: async (params, callback) => {
		set({ processingCreateVisitasi: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_VISITASI.createVisitasiPromise(params);

		if (!success) set({ errorsVisitasiPromise: payload });

		toastRequestResult(loader, success, 'Janji Visitasi created', payload?.odoo_error || payload?.message);
		set({ processingCreateVisitasiPromise: false });

		callback({ payload, success });
	},

	updateVisitasiPromise: async (visitasiPromiseID, params, callback) => {
		set({ processingUpdateVisitasiPromise: true });

		const loader = toast.loading(`Updating Janji : ${params.name}`);
		const { payload, success } = await SERVICE_VISITASI.updateVisitasiPromise(visitasiPromiseID, params);

		if (!success) set({ errorsVisitasiPromise: payload });

		toastRequestResult(loader, success, `Janji ${params.name} updated`, payload?.odoo_error || payload?.message);
		set({ processingUpdateVisitasiPromise: false });

		callback({ payload, success });
	},

	deleteVisitasiPromise: async (visitasiPromiseID, callback) => {
		set({ processingDeleteVisitasiPromise: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_VISITASI.deleteVisitasiPromise(visitasiPromiseID);

		toastRequestResult(
			loader,
			success,
			'Janji Visitasi deleted',
			payload?.status || payload?.odoo_error || payload?.message
		);
		callback({ payload, success });
		set({ processingDeleteVisitasiPromise: false });
	},

	// ==================================
	// Clear State
	// ==================================
	clearStateVisitasi: () => {
		set({ fetchingVisitasiList: null });
		set({ errorsVisitasi: null });
	},

	clearStateVisitasiDetail: () => {
		set({ visitasiDetailList: null });
		set({ errorsVisitasiDetail: null });
	},

	clearStateVisitasiPromise: () => {
		set({ visitasiPromiseList: null });
		set({ errorsVisitasiPromise: null });
	}
});

export const useVisitasiStore = create(devtools(states, { name: 'visitasi-store', getStorage: () => localStorage }));
