import { SERVICE_KONSTITUEN } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { toastRequestResult } from '@/utils/helpers';
import { useAppStore } from './app.store';
import { toast } from 'react-toastify';

const { setPageLoading } = useAppStore.getState();

const states = (set, get) => ({
	fetchingKonstituenList: false,
	fetchingKonstituenDetail: false,
	fetchingKonstituen: false,
	fetchingProposal: false,
	fetchingProposalList: false,

	processingCreateKonstituen: false,
	processingEditKonstituen: false,
	processingDeleteKonstituen: false,
	processingCreateProposal: false,
	processingEditProposal: false,
	processingDeleteProposal: false,

	konstituenList: null,
	konstituenDetail: null,
	penerimaKonstituenDetail: null,
	konstituen: null,
	proposal: null,
	proposalList: null,

	getKonstituenList: async (params) => {
		set({ fetchingKonstituenList: true });

		const defaultParams = { limit: 0, offset: 0 };
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
	deleteKonstituen: async (konstituenID) => {
		setPageLoading(true);
		set({ processingDeleteKonstituen: true });

		const loader = toast.loading('Processing...');
		const { success, payload } = await SERVICE_KONSTITUEN.deleteKonstituen(konstituenID);

		toastRequestResult(loader, success, 'Institusi deleted', payload?.odoo_error || payload?.message);
		get().getKonstituenList();
		set({ processingDeleteKonstituen: false });
		setPageLoading(false);
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
	},

	getProposalList: async (params) => {
		set({ fetchingProposalList: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_KONSTITUEN.getProposalList(requestParams);

		set({ proposalList: success ? payload : null });
		set({ fetchingProposalList: false });
	},
	getProposal: async (proposalID) => {
		set({ fetchingProposal: true });
		set({ proposal: null });

		const { success, payload } = await SERVICE_KONSTITUEN.getProposal(proposalID);

		set({ proposal: success ? payload : null });
		set({ fetchingProposal: false });
	},
	postProposalCreate: async (params, callback) => {
		setPageLoading(true);
		set({ processingCreateProposal: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_KONSTITUEN.postProposalCreate(params);

		toastRequestResult(loader, success, 'Proposal created', payload?.odoo_error || payload?.message);
		set({ processingCreateProposal: false });
		setPageLoading(false);

		callback({ payload, success });
	},
	deleteProposal: async (proposalID) => {
		setPageLoading(true);
		set({ processingDeleteProposal: true });

		const loader = toast.loading('Processing...');
		const { success, payload } = await SERVICE_KONSTITUEN.deleteProposal(proposalID);

		toastRequestResult(loader, success, 'Institusi deleted', payload?.odoo_error || payload?.message);
		get().getProposalList();
		set({ processingDeleteProposal: false });
		setPageLoading(false);
	},
	updateProposal: async (proposalID, params, callback) => {
		setPageLoading(true);
		set({ processingEditProposal: true });

		const loader = toast.loading('Updating...');
		const { payload, success } = await SERVICE_KONSTITUEN.updateProposal(proposalID, params);

		toastRequestResult(loader, success, 'Proposal updated', payload?.odoo_error || payload?.message);
		set({ processingEditProposal: false });
		setPageLoading(false);

		callback({ payload, success });
	}
});

export const useKonstituenStore = create(devtools(states, { name: 'auth-store', getStorage: () => localStorage }));
