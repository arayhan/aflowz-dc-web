import { SERVICE_PARTNER } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { toastRequestResult } from '@/utils/helpers';
import { useAppStore } from './app.store';
import { toast } from 'react-toastify';

const { setPageLoading } = useAppStore.getState();

const states = (set) => ({
	fetchingStaffList: false,
	fetchingPartnerList: false,
	fetchingStaffTitleList: false,
	fetchingStaff: false,
	fetchingPartnerDetail: false,

	processingCreateStaff: false,
	processingEditStaff: false,
	processingBulkCreatePartner: false,

	staffList: null,
	partnerList: null,
	staffTitleList: null,
	partnerDetail: null,
	staff: null,
	getStaffList: async (params) => {
		set({ fetchingStaffList: true });

		const { success, payload } = await SERVICE_PARTNER.getStaffList(params);

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

	getStaffTitleList: async () => {
		set({ fetchingStaffTitleList: true });

		const { success, payload } = await SERVICE_PARTNER.getStaffTitleList();

		set({ staffTitleList: success ? payload : null });
		set({ fetchingStaffTitleList: false });
	},

	getStaff: async (staffID) => {
		set({ fetchingStaff: true });
		set({ staff: null });

		const { success, payload } = await SERVICE_PARTNER.getPartner(staffID);

		set({ staff: success ? payload : null });
		set({ fetchingStaff: false });
	},

	postStaffCreate: async (params, callback) => {
		setPageLoading(true);
		set({ processingCreateStaff: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PARTNER.postStaffCreate(params);

		toastRequestResult(loader, success, 'Staff created', payload?.odoo_error || payload?.message);
		set({ processingCreateStaff: false });
		setPageLoading(false);

		callback({ payload, success });
	},

	updateStaff: async (staffID, params) => {
		setPageLoading(true);
		set({ processingEditStaff: true });

		const loader = toast.loading('Updating...');
		const { payload, success } = await SERVICE_PARTNER.updateStaff(staffID, params);

		toastRequestResult(loader, success, 'Staff updated', payload?.odoo_error || payload?.message);
		set({ pprocessingEditStaff: false });
		setPageLoading(false);
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
