import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getDistrictItem = async (districtID) => {
	try {
		const response = await http.get(`/district/${districtID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getDistrictList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/district' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getDistrictDetail = async (districtID) => {
	try {
		const response = await http.get('/page-detail/kecamatan/' + districtID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createDistrict = async (params) => {
	const request = {
		name: params?.name || '',
		district_id: params?.district_id || 0,
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0
	};

	try {
		const response = await http.post('/district', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateDistrict = async (districtID, params) => {
	const request = {
		name: params?.name || '',
		district_id: params?.district_id || 0,
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0
	};

	try {
		const response = await http.put(`/district/${districtID}`, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteDistrict = async (districtID) => {
	try {
		const response = await http.delete(`/district/${districtID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
