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
		periode: params?.periode.toString() || '',
		contact: params?.contact || '',
		total_target_voters: params?.total_target_voters || null,
		total_dc_voters: params?.total_dc_voters || null,
		total_legitimate_vote: params?.total_legitimate_vote || null,
		total_invalid_vote: params?.total_invalid_vote || null,
		village_id: params?.village_id || 0,
		witness_staff_ids: params?.witness_staff_ids || [],
		volunteer_staff_ids: params?.volunteer_staff_ids || []
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
		periode: params?.periode.toString() || '',
		contact: params?.contact || '',
		total_target_voters: params?.total_target_voters || null,
		total_dc_voters: params?.total_dc_voters || null,
		total_legitimate_vote: params?.total_legitimate_vote || null,
		total_invalid_vote: params?.total_invalid_vote || null,
		village_id: params?.village_id || 0,
		witness_staff_ids: params?.witness_staff_ids || [],
		volunteer_staff_ids: params?.volunteer_staff_ids || []
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
