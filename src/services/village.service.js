import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getVillageItem = async (villageID) => {
	try {
		const response = await http.get(`/village/${villageID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getVillageList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/village' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getVillageDetail = async (villageID) => {
	try {
		const response = await http.get('/page-detail/desa/' + villageID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createVillage = async (params) => {
	const request = {
		name: params?.name || '',
		district: params?.district || '',
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0
	};

	try {
		const response = await http.post('/village', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateVillage = async (villageID, params) => {
	const request = {
		village_category_id: params?.village_category_id || 0,
		pic_staff_id: params?.pic_staff_id || 0
	};

	try {
		const response = await http.put(`/village/${villageID}`, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteVillage = async (villageID) => {
	try {
		const response = await http.delete(`/village/${villageID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
