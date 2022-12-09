import { SERVICE_DISTRICT } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingDistrictItem: false,
	fetchingDistrictList: false,
	fetchingDistrictDetail: false,

	processingCreateDistrict: false,
	processingUpdateDistrict: false,
	processingDeleteDistrict: false,

	districtItem: null,
	districtList: null,
	districtDetail: null,

	errorsDistrict: null,

	getDistrictItem: async (districtID) => {
		set({ fetchingDistrict: true });
		set({ district: null });

		const { success, payload } = await SERVICE_DISTRICT.getDistrictItem(districtID);

		if (!success) set({ errorsDistrict: payload });

		set({ district: success ? payload : null });
		set({ fetchingDistrict: false });
	},

	getDistrictList: async (params) => {
		set({ fetchingDistrictList: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_DISTRICT.getDistrictList(requestParams);

		set({ districtList: success ? payload : null });
		set({ fetchingDistrictList: false });
	},

	getDistrictDetail: async (districtID) => {
		set({ fetchingDistrictDetail: true });

		const { success, payload } = await SERVICE_DISTRICT.getDistrictDetail(districtID);

		set({ districtDetail: success ? payload : null });
		set({ fetchingDistrictDetail: false });
	},

	createDistrict: async (params, callback) => {
		set({ processingCreateDistrict: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_DISTRICT.createDistrict(params);

		if (!success) set({ errorsDistrict: payload });

		toastRequestResult(loader, success, 'District created', payload?.odoo_error || payload?.message);
		set({ processingCreateDistrict: false });

		callback({ payload, success });
	},

	updateDistrict: async (districtID, params, callback) => {
		set({ processingUpdateDistrict: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_DISTRICT.updateDistrict(districtID, params);

		if (!success) set({ errorsDistrict: payload });

		toastRequestResult(loader, success, 'District updated', payload?.odoo_error || payload?.message);
		set({ processingUpdateDistrict: false });

		callback({ payload, success });
	},

	deleteDistrict: async (districtID) => {
		set({ processingDeleteDistrict: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_DISTRICT.deleteDistrict(districtID);

		toastRequestResult(loader, success, 'Desa deleted', payload?.odoo_error || payload?.message);
		get().getDistrictList();
		set({ processingDeleteDistrict: false });
	},

	clearStateDistrict: () => {
		set({ district: null });
		set({ errorsDistrict: null });
	}
});

export const useDistrictStore = create(devtools(states));
