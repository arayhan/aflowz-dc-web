import { SERVICE_PARTNER } from '@/services';
import { STATUS_PENERIMA_TYPES } from '@/utils/constants';
import { exportToCsv, toastRequestResult } from '@/utils/helpers';
import moment from 'moment';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set, get) => ({
	fetchingPartnerItem: false,
	fetchingPartnerList: false,
	fetchingPartnerDetail: false,
	fetchingPenerimaItem: false,
	fetchingPenerimaList: false,
	fetchingPenerimaDetail: false,
	fetchingStaff: false,
	fetchingStaffTitleList: false,
	fetchingStaffList: false,
	fetchingStaffOrganizationStructureImage: false,
	fetchingDownloadPenerimaList: false,

	processingSubmitPenerima: false,
	processingDeletePenerima: false,
	processingCreateStaff: false,
	processingEditStaff: false,
	processingBulkCreatePartner: false,
	processingBulkCreatePartnerCandidate: false,
	processingBulkCreatePartnerConfirm: false,
	processingUploadStaffOrganizationStructureImage: false,
	processingDeleteStaffOrganizationStructureImage: false,
	processingBulkDownloadPartnerCertificate: false,

	partnerItem: null,
	partnerList: null,
	partnerDetail: null,
	calonPenerimaList: null,
	penerimaItem: null,
	penerimaList: null,
	penerimaDetail: null,
	staff: null,
	staffList: null,
	staffTitleList: null,
	staffTitleParentList: null,
	penerimaAllCity: null,
	staffOrganizationStructureImage: null,

	// =================================
	// ALL
	// =================================
	getPartnerItem: async (partnerID) => {
		set({ fetchingPartnerItem: true });

		const { success, payload } = await SERVICE_PARTNER.getPartnerItem(partnerID);

		set({ partnerItem: success ? payload : null });
		set({ fetchingPartnerItem: false });
	},

	getPartnerList: async (params, callback) => {
		set({ fetchingPartnerList: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_PARTNER.getPartnerList(requestParams);

		if (callback) callback({ payload, success });
		else set({ partnerList: success ? payload : null });

		set({ fetchingPartnerList: false });

		return { payload, success };
	},

	// =================================
	// PENERIMA
	// =================================
	getPenerimaItem: async (penerimaID) => {
		set({ fetchingPenerimaItem: true });

		const { success, payload } = await SERVICE_PARTNER.getPartnerItem(penerimaID);

		set({ penerimaItem: success ? payload : null });
		set({ fetchingPenerimaItem: false });
	},

	getPenerimaList: async (params, callback, isNeedAbort = false) => {
		set({ fetchingPenerimaList: true });

		const { success, payload } = await SERVICE_PARTNER.getPartnerList(params, isNeedAbort);

		if (callback) callback({ payload, success });

		if (params?.candidate_status === STATUS_PENERIMA_TYPES.CONFIRMED) {
			set({ penerimaList: success ? payload : null });
		} else {
			set({ calonPenerimaList: success ? payload : null });
		}
		set({ fetchingPenerimaList: false });
	},

	downloadCsvPenerima: async (params, callback) => {
		set({ fetchingDownloadPenerimaList: true });
		const loader = toast.loading('Processing...');

		const requestParams = params;
		const { success, payload } = await SERVICE_PARTNER.getPartnerList(requestParams);

		toastRequestResult(loader, success, 'Penerima Downloaded', payload?.odoo_error || payload?.message);

		if (success) {
			const header = ['No', 'NIK', 'Nama Penerima', 'Institusi', 'Alamat', 'Email', 'Mobile', 'Gender', 'Program'];
			const data = payload?.items?.map((penerima, index) => [
				index + 1,
				penerima?.nik_number || '-',
				penerima?.name || '-',
				penerima?.konstituen?.name || '-',
				penerima?.address || '-',
				penerima?.email || '-',
				penerima?.mobile || '-',
				penerima?.gender || '-',
				penerima?.programs?.map((program) => program.name).join(', ') || '-'
			]);

			const filename = `Penerima Program - ${moment().format('yyyy MMMM DD HH:mm:ss')}.csv`;
			exportToCsv(filename, [header, ...data]);
		}

		set({ fetchingDownloadPenerimaList: false });
		if (callback) callback({ payload, success });
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

	bulkCreatePartnerCandidate: async (params, callback) => {
		set({ processingBulkCreatePartnerCandidate: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PARTNER.bulkCreatePartnerCandidate(params);

		toastRequestResult(loader, success, 'Penerima Created', payload?.odoo_error || payload?.message);
		set({ processingBulkCreatePartnerCandidate: false });

		callback({ payload, success });
	},

	bulkCreatePartnerConfirm: async (params, callback) => {
		set({ processingBulkCreatePartnerConfirm: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PARTNER.bulkCreatePartnerConfirm(params);

		toastRequestResult(loader, success, 'Penerima Created', payload?.odoo_error || payload?.message);
		set({ processingBulkCreatePartnerConfirm: false });

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

		if (success && payload?.total > 0) {
			const filteredRoles = payload?.items.filter((role) => role?.parent?.name).map((role) => role.parent);
			const filteredRolesUnique = filteredRoles?.reduce((acc, role) => {
				const isDuplicate = acc?.find((item) => item.id === role.id);
				return isDuplicate ? acc : [...acc, role];
			}, []);

			set({ staffTitleParentList: filteredRolesUnique });
		}

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
