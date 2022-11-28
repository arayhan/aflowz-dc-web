import { SERVICE_PARTNER } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { useAppStore } from './app.store';

const { setPageLoading } = useAppStore.getState();

const states = (set) => ({
	fetchingStaffList: false,
	fetchingPartnerList: false,
	fetchingPartnerDetail: false,

	processingBulkCreatePartner: false,

	staffList: null,
	partnerList: null,
	partnerDetail: null,

	getStaffList: async () => {
		set({ fetchingStaffList: true });

		const { success, payload } = await SERVICE_PARTNER.getStaffList();

		set({ staffList: success ? payload : null });
		set({ fetchingStaffList: false });
	},

	getPartnerList: async (params) => {
		set({ fetchingPartnerList: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_PARTNER.getPartnerList(requestParams);

		set({ partnerList: success ? payload : null });
		set({ fetchingPartnerList: false });
	},

	getPartnerDetail: async (partnerID) => {
		set({ fetchingPartnerDetail: true });

		const { success, payload } = await SERVICE_PARTNER.getPartnerDetail(partnerID);

		set({ partnerDetail: success ? payload : null });
		set({ fetchingPartnerDetail: false });
	},

	bulkCreatePartner: async (params, callback) => {
		setPageLoading(true);
		set({ processingBlukCreatePartner: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PARTNER.bulkCreatePartner(params);

		toastRequestResult(loader, success, 'Partners Created', payload?.odoo_error || payload?.message);
		set({ processingBulkCreatePartner: false });
		setPageLoading(false);

		callback({ payload, success });
	}
});

export const usePartnerStore = create(devtools(states, { name: 'auth-store', getStorage: () => localStorage }));
