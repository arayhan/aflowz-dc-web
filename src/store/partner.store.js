import { SERVICE_PARTNER } from '@/services';
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

	processingCreateStaff: false,
	processingEditStaff: false,

	staffList: null,
	partnerList: null,
	staffTitleList: null,
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
	}
});

export const usePartnerStore = create(devtools(states, { name: 'auth-store', getStorage: () => localStorage }));
