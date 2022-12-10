import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getTPSItem = async (TPSID) => {
	try {
		const response = await http.get(`/tps/${TPSID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getTPSList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/tps' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createTPS = async (params) => {
	const request = {
		name: params?.name || '',
		village_id: params?.village_id || 0,
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0
	};

	try {
		const response = await http.post('/tps', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateTPS = async (TPSID, params) => {
	const request = {
		name: params?.name || '',
		village_id: params?.village_id || 0,
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0
	};

	try {
		const response = await http.put(`/tps/${TPSID}`, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteTPS = async (TPSID) => {
	try {
		const response = await http.delete(`/tps/${TPSID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
