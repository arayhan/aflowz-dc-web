import { SERVICE_PARTNER } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

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

	successStaffDelete: null,

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

	updateStaff: async (staffID, params, callback) => {
		setPageLoading(true);
		set({ processingEditStaff: true });

		const loader = toast.loading('Updating...');
		const { payload, success } = await SERVICE_PARTNER.updateStaff(staffID, params);

		toastRequestResult(loader, success, 'Staff updated', payload?.odoo_error || payload?.message);
		set({ pprocessingEditStaff: false });
		setPageLoading(false);

		callback({ payload, success });
	},

	getPartnerDetail: async (partnerID) => {
		set({ fetchingPartnerDetail: true });

		const { success, payload } = await SERVICE_PARTNER.getPartnerDetail(partnerID);

		set({ partnerDetail: success ? payload : null });
		set({ fetchingPartnerDetail: false });
	},

	bulkCreatePartner: async (params, callback) => {
		set({ processingBulkCreatePartner: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PARTNER.bulkCreatePartner(params);

		toastRequestResult(loader, success, 'Partners Created', payload?.odoo_error || payload?.message);
		set({ processingBulkCreatePartner: false });

		callback({ payload, success });
	},

	deleteStaff: async (staffID) => {
		const { success, payload } = await SERVICE_PARTNER.deleteStaff(staffID);

		set({ successStaffDelete: success ? payload : null });
	}
});

export const usePartnerStore = create(devtools(states, { name: 'partner-store', getStorage: () => localStorage }));
