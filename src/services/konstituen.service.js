import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getKonstituenList = async (params) => {
	try {
		const newParams = Object.keys(params).length === 2 ? { ...params, konstituen_type: 'sekolah,kampus' } : params;
		const queryParams = objectToQueryString(newParams);

		const response = await http.get('/konstituen' + queryParams);

		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getKonstituenDetail = async (konstituenID) => {
	try {
		const response = await http.get('/page-detail/konstituen/' + konstituenID);

		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getPenerimaKonstituenDetail = async (params) => {
	try {
		const defaultParams = { is_staff: false };
		const requestParams = params ? { ...params, ...defaultParams } : defaultParams;
		const queryParams = objectToQueryString(requestParams);

		const response = await http.get('/partner' + queryParams);

		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const postKonstituenCreate = async (params) => {
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

export const deleteKonstituen = async (params) => {
	try {
		const response = await http.delete('/konstituen' + `/${params}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateKonstituen = async (konstituenID, params) => {
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
		const response = await http.put('/konstituen' + `/${konstituenID}`, request);

		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getKonstituen = async (konstituenID) => {
	try {
		const response = await http.get(`/konstituen/${konstituenID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
