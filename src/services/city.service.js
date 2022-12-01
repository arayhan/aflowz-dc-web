import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getCityItem = async (cityID) => {
	try {
		const response = await http.get(`/city/${cityID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getCityList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/city' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getCityDetail = async (cityID) => {
	try {
		const response = await http.get('/page-detail/city/' + cityID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createCity = async (params) => {
	const request = {
		name: params?.name || '',
		periode: params?.periode.toString() || '',
		city_category_id: params?.city_category_id || 0,
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0
	};

	try {
		const response = await http.post('/city', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateCity = async (cityID, params) => {
	const request = {
		city_category_id: params?.city_category_id || 0,
		pic_staff_id: params?.pic_staff_id || 0
	};

	try {
		const response = await http.put(`/city/${cityID}`, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteCity = async (cityID) => {
	try {
		const response = await http.delete(`/city/${cityID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
