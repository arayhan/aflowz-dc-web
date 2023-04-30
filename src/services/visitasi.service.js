import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

// ==================================
// Visitasi
// ==================================
export const getVisitasiItem = async (visitasiID) => {
	try {
		const response = await http.get(`/program/visitasi/${visitasiID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getVisitasiCategory = async () => {
	try {
		const response = await http.get(`/program/visitasi/category`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getVisitasiList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/program/visitasi' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createVisitasi = async (params) => {
	const request = {
		name: params?.name || '',
		date: params?.date || '',
		origin: params?.origin || '',
		note: params?.note || '',
		address: params?.address || '',
		phone: params?.phone || '',
		is_potential: params?.is_potential || false,
		father_name: params?.father_name || '',
		father_phone: params?.father_phone || '',
		mother_name: params?.mother_name || '',
		mother_phone: params?.mother_phone || '',
		total_family_member: params?.total_family_member || 0,
		konstituen_id: params?.konstituen_id || 0,
		program_id: params?.program_id || 0,
		village_id: params?.village_id || 0,
		district_id: params?.district_id || 0,
		city_id: params?.city_id || 0
	};

	try {
		const response = await http.post('/program/visitasi', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateVisitasi = async (visitasiID, params) => {
	const request = {
		name: params?.name || '',
		date: params?.date || '',
		origin: params?.origin || '',
		note: params?.note || '',
		address: params?.address || '',
		phone: params?.phone || '',
		is_potential: params?.is_potential || false,
		father_name: params?.father_name || '',
		father_phone: params?.father_phone || '',
		mother_name: params?.mother_name || '',
		mother_phone: params?.mother_phone || '',
		total_family_member: params?.total_family_member || 0,
		konstituen_id: params?.konstituen_id || 0,
		program_id: params?.program_id || 0,
		village_id: params?.village_id || 0,
		district_id: params?.district_id || 0,
		city_id: params?.city_id || 0
	};

	try {
		const response = await http.put(`/program/visitasi/${visitasiID}`, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteVisitasi = async (visitasiID) => {
	try {
		const response = await http.delete(`/program/visitasi/${visitasiID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

// ==================================
// Visitasi Promise
// ==================================
export const getVisitasiPromiseItem = async (visitasiPromiseID) => {
	try {
		const response = await http.get('/program/visitasi/promise/' + visitasiPromiseID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getVisitasiPromiseList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/program/visitasi/promise' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createVisitasiPromise = async (params) => {
	const request = {
		visitasi_detail_id: params?.visitasi_detail_id || 0,
		name: params?.name || '',
		realization: params?.realization || false
	};

	try {
		const response = await http.post('/program/visitasi/promise', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateVisitasiPromise = async (visitasiPromiseID, params) => {
	const request = {
		realization: params?.realization || false
	};

	try {
		const response = await http.put(`/program/visitasi/promise/${visitasiPromiseID}`, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteVisitasiPromise = async (visitasiPromiseID) => {
	try {
		const response = await http.delete(`/program/visitasi/promise/${visitasiPromiseID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
