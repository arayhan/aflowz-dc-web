import { SERVICE_PARTNER } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set, get) => ({
	fetchingPenerimaItem: false,
	fetchingPenerimaList: false,
	fetchingPenerimaDetail: false,
	fetchingStaff: false,
	fetchingStaffTitleList: false,
	fetchingStaffList: false,
	fetchingStaffOrganizationStructureImage: false,

	processingSubmitPenerima: false,
	processingDeletePenerima: false,
	processingCreateStaff: false,
	processingEditStaff: false,
	processingBulkCreatePartner: false,
	processingUploadStaffOrganizationStructureImage: false,
	processingDeleteStaffOrganizationStructureImage: false,

	penerimaItem: null,
	penerimaList: null,
	penerimaDetail: null,
	staff: null,
	staffList: null,
	staffTitleList: null,
	penerimaAllCity: null,
	staffOrganizationStructureImage: null,

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
		set({ processingSubmitPenerima: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PARTNER.updatePartner(penerimaID, params);

		toastRequestResult(loader, success, 'Penerima Updated', payload?.odoo_error || payload?.message);
		set({ processingSubmitPenerima: false });

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

	getPenerimaAllCity: async () => {
		set({ fetchingPenerimaList: true });

		const { success, payload } = await SERVICE_PARTNER.getPartnerAllCity();

		set({ penerimaAllCity: success ? payload : null });
		set({ fetchingPenerimaList: false });
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
		set({ processingCreateStaff: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PARTNER.postStaffCreate(params);

		toastRequestResult(loader, success, 'Staff created', payload?.odoo_error || payload?.message);
		set({ processingCreateStaff: false });

		callback({ payload, success });
	},

	updateStaff: async (staffID, params, callback) => {
		set({ processingEditStaff: true });

		const loader = toast.loading('Updating...');
		const { payload, success } = await SERVICE_PARTNER.updateStaff(staffID, params);

		toastRequestResult(loader, success, 'Staff updated', payload?.odoo_error || payload?.message);
		set({ processingEditStaff: false });

		callback({ payload, success });
	},

	updatePicture: async (partnerID, params, callback) => {
		set({ processingEditStaff: true });

		const loader = toast.loading('Updating...');
		const { payload, success } = await SERVICE_PARTNER.updatePicture(partnerID, params);

		toastRequestResult(loader, success, 'Picture updated', payload?.odoo_error || payload?.message);
		set({ processingEditStaff: false });

		callback({ payload, success });
	},

	deleteStaff: async (staffID) => {
		set({ processingDeletePenerima: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PARTNER.deletePartner(staffID);

		toastRequestResult(loader, success, 'Tim Internal deleted', payload?.odoo_error || payload?.message);
		get().getStaffList();
		set({ processingDeletePenerima: false });
	},

	getStaffOrganizationStructureImage: async (callback) => {
		set({ fetchingStaffOrganizationStructureImage: true });

		const { payload, success } = await SERVICE_PARTNER.getStaffOrganizationStructureImage();
		set({ staffOrganizationStructureImage: success ? payload : null });
		set({ fetchingStaffOrganizationStructureImage: false });

		if (callback) callback({ payload, success });
	},

	uploadStaffOrganizationStructureImage: async (params, callback) => {
		set({ processingUploadStaffOrganizationStructureImage: true });

		const loader = toast.loading('Uploading...');
		const { payload, success } = await SERVICE_PARTNER.uploadStaffOrganizationStructureImage(params);

		toastRequestResult(loader, success, 'Organization Structure uploaded', payload?.odoo_error || payload?.message);

		set({ processingUploadStaffOrganizationStructureImage: false });

		get().getStaffOrganizationStructureImage();
		callback({ payload, success });
	},

	deleteStaffOrganizationStructureImage: async () => {
		set({ processingDeleteStaffOrganizationStructureImage: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PARTNER.deleteStaffOrganizationStructureImage();

		toastRequestResult(loader, success, 'Organization Structure deleted', payload?.odoo_error || payload?.message);
		get().getStaffOrganizationStructureImage();
		set({ processingDeleteStaffOrganizationStructureImage: false });
	}
});

export const usePartnerStore = create(devtools(states, { name: 'partner-store', getStorage: () => localStorage }));
