import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getDPTItem = async (DPTID) => {
	try {
		const response = await http.get(`/tps/dpt/${DPTID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getDPTList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/tps/dpt' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createDPT = async (params) => {
	const request = {
		tps_id: params?.tps_id || 0,
		nik_number: params?.nik_number || ''
	};

	try {
		const response = await http.post('/tps/dpt', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateDPT = async (DPTID, params) => {
	const request = {
		tps_id: params?.tps_id || 0,
		nik_number: params?.nik_number || ''
	};

	try {
		const response = await http.put(`/tps/dpt/${DPTID}`, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteDPT = async (DPTID) => {
	try {
		const response = await http.delete(`/tps/dpt/${DPTID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
