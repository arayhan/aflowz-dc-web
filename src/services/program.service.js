import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getProgramCategoryList = async () => {
	try {
		const response = await http.get('/program/category');
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProgramList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/program' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProgramDetail = async (programID) => {
	try {
		const response = await http.get('/page-detail/program/' + programID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProgramCategoryDetail = async (mitraID) => {
	try {
		const response = await http.get('/page-detail/mitra/' + mitraID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
