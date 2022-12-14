import { SERVICE_KONSTITUEN } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { toastRequestResult } from '@/utils/helpers';
import { useAppStore } from './app.store';
import { toast } from 'react-toastify';

const { setPageLoading } = useAppStore.getState();

const states = (set) => ({
	fetchingKonstituenList: false,
	fetchingKonstituenDetail: false,
	fetchingPenerimaKonstituenDetail: false,
	fetchingKonstituen: false,
	processingCreateKonstituen: false,
	processingEditKonstituen: false,

	konstituenList: null,
	konstituenDetail: null,
	penerimaKonstituenDetail: null,
	konstituen: null,

	successKonstituenCreate: null,
	successKonstituenDelete: null,
	successKonstituenUpdate: null,

	getKonstituenList: async (params) => {
		set({ fetchingKonstituenList: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_KONSTITUEN.getKonstituenList(requestParams);

		set({ konstituenList: success ? payload : null });
		set({ fetchingKonstituenList: false });
	},
	getKonstituenDetail: async (konstituenID) => {
		set({ fetchingKonstituenDetail: true });

		const { success, payload } = await SERVICE_KONSTITUEN.getKonstituenDetail(konstituenID);

		set({ konstituenDetail: success ? payload : null });
		set({ fetchingKonstituenDetail: false });
	},
	getPenerimaKonstituenDetail: async (params) => {
		set({ fetchingPenerimaKonstituenDetail: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_KONSTITUEN.getPenerimaKonstituenDetail(requestParams);

		set({ penerimaKonstituenDetail: success ? payload : null });
		set({ fetchingPenerimaKonstituenDetail: false });
	},
	postKonstituenCreate: async (params, callback) => {
		setPageLoading(true);
		set({ processingCreateKonstituen: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_KONSTITUEN.postKonstituenCreate(params);

		toastRequestResult(loader, success, 'Konstituen created', payload?.odoo_error || payload?.message);
		set({ processingCreateKonstituen: false });
		setPageLoading(false);

		callback({ payload, success });
	},
	deleteKonstituen: async (params) => {
		const { success, payload } = await SERVICE_KONSTITUEN.deleteKonstituen(params);

		set({ successKonstituenDelete: success ? payload : null });
	},
	updateKonstituen: async (konstituenID, params, callback) => {
		setPageLoading(true);
		set({ processingEditKonstituen: true });

		const loader = toast.loading('Updating...');
		const { payload, success } = await SERVICE_KONSTITUEN.updateKonstituen(konstituenID, params);

		toastRequestResult(loader, success, 'Konstituen updated', payload?.odoo_error || payload?.message);
		set({ processingEditKonstituen: false });
		setPageLoading(false);

		callback({ payload, success });
	},
	getKonstituen: async (konstituenID) => {
		set({ fetchingKonstituen: true });
		set({ konstituen: null });

		const { success, payload } = await SERVICE_KONSTITUEN.getKonstituen(konstituenID);

		set({ konstituen: success ? payload : null });
		set({ fetchingKonstituen: false });
	}
});

export const useKonstituenStore = create(devtools(states, { name: 'auth-store', getStorage: () => localStorage }));
