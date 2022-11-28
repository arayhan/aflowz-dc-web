import { useAuthStore } from '@/store';
import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getStaffList = async (params) => {
	try {
		const defaultParams = { is_staff: true };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;
		const queryParams = objectToQueryString(requestParams);

		const response = await http.get('/partner' + queryParams);

		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getPartnerList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/partner' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createPartner = async (params, isBulk) => {
	const createdBy = useAuthStore.getState().profile;
	console.log({ params, isBulk, createdBy });
	try {
		const response = await http.post('/partner', params);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
