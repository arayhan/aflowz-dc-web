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

export const getStaffTitleList = async () => {
	try {
		const response = await http.get('/partner/staff-title');
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getPartner = async (partnerID) => {
	try {
		const response = await http.get(`/partner/${partnerID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const postStaffCreate = async (params) => {
	console.log(params);
	const request = {
		nik_number: params?.nik_number || 0,
		name: params?.name || '',
		address: params?.address || '',
		city_id: params?.city || 0,
		mobile: params?.mobile || '',
		email: params?.email || '',
		gender: params?.gender || '',
		staff_title: params?.staff_title || '',
		is_staff: true
	};
	console.log(request);

	try {
		const response = await http.post('/partner', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateStaff = async (staffID, params) => {
	const request = {
		name: params?.name || '',
		konstituen_type: params?.konstituen_type || '',
		address: params?.address || '',
		city_id: params?.city || 0,
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0
	};

	try {
		const response = await http.post('/konstituen', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
