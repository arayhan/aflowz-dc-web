import { SERVICE_PARTNER } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { useAppStore } from './app.store';

const { setPageLoading } = useAppStore.getState();

const states = (set, get) => ({
	fetchingPenerimaItem: false,
	fetchingPenerimaList: false,
	fetchingPenerimaDetail: false,
	fetchingStaff: false,
	fetchingStaffTitleList: false,
	fetchingStaffList: false,

	processingSubmitPenerima: false,
	processingDeletePenerima: false,
	processingCreateStaff: false,
	processingEditStaff: false,
	processingBulkCreatePartner: false,

	penerimaItem: null,
	penerimaList: null,
	penerimaDetail: null,
	staff: null,
	staffList: null,
	staffTitleList: null,

	// =================================
	// PENERIMA
	// =================================
	getPenerimaItem: async (penerimaID) => {
		set({ fetchingPenerimaItem: true });

		const { success, payload } = await SERVICE_PARTNER.getPartnerItem(penerimaID);

		set({ penerimaItem: success ? payload : null });
		set({ fetchingPenerimaItem: false });
	},

	getPenerimaList: async (params) => {
		set({ fetchingPenerimaList: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_PARTNER.getPartnerList(requestParams);

		set({ penerimaList: success ? payload : null });
		set({ fetchingPenerimaList: false });
	},

	getPenerimaDetail: async (penerimaID) => {
		set({ fetchingPenerimaDetail: true });

		const { success, payload } = await SERVICE_PARTNER.getPartnerDetail(penerimaID);

		set({ penerimaDetail: success ? payload : null });
		set({ fetchingPenerimaDetail: false });
	},

	bulkCreatePartner: async (params, callback) => {
		set({ processingBulkCreatePartner: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PARTNER.bulkCreatePartner(params);

		toastRequestResult(loader, success, 'Penerima Created', payload?.odoo_error || payload?.message);
		set({ processingBulkCreatePartner: false });

		callback({ payload, success });
	},

	updatePenerima: async (penerimaID, params, callback) => {
		setPageLoading(true);
		set({ processingSubmitPenerima: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PARTNER.updatePartner(penerimaID, params);

		toastRequestResult(loader, success, 'Penerima Updated', payload?.odoo_error || payload?.message);
		set({ processingSubmitPenerima: false });
		setPageLoading(false);

		callback({ payload, success });
	},

	deletePenerima: async (penerimaID) => {
		set({ processingDeletePenerima: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PARTNER.deletePartner(penerimaID);

		toastRequestResult(loader, success, 'Penerima deleted', payload?.odoo_error || payload?.message);
		get().getPenerimaList();
		set({ processingDeletePenerima: false });
	},

	// =================================
	// STAFF
	// =================================
	getStaffList: async (params) => {
		set({ fetchingStaffList: true });
		const reqParams = { ...params, is_staff: true };

		const { success, payload } = await SERVICE_PARTNER.getPartnerList(reqParams);

		set({ staffList: success ? payload : null });
		set({ fetchingStaffList: false });
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

		const { success, payload } = await SERVICE_PARTNER.getPartnerItem(staffID);

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
	}
});

export const usePartnerStore = create(devtools(states, { name: 'partner-store', getStorage: () => localStorage }));
