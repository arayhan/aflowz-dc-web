import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getProgram = async (programID) => {
	try {
		const response = await http.get(`/program/${programID}`);
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

export const createProgram = async (params) => {
	const request = {
		name: params?.name || '',
		periode: params?.periode.toString() || '',
		program_category_id: params?.program_category_id || 0,
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0,
		description: params?.description || ''
	};

	try {
		const response = await http.post('/program', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateProgram = async (programID, params) => {
	const request = {
		name: params?.name || '',
		periode: params?.periode.toString() || '',
		program_category_id: params?.program_category_id || 0,
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0,
		description: params?.description || ''
	};

	try {
		const response = await http.put(`/program/${programID}`, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteProgram = async (programID) => {
	try {
		const response = await http.delete(`/program/${programID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProgramCategory = async (programCategoryID) => {
	try {
		const response = await http.get('/program/category/' + programCategoryID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProgramCategoryList = async () => {
	try {
		const response = await http.get('/program/category');
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

export const createProgramCategory = async (params) => {
	const request = {
		name: params?.name || '',
		alias: params?.alias || '',
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0,
		address: params?.address || ''
	};

	try {
		const response = await http.post('/program/category', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateProgramCategory = async (programID, params) => {
	const request = {
		name: params?.name || '',
		alias: params?.alias || '',
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0,
		address: params?.address || ''
	};

	try {
		const response = await http.put('/program/category/' + programID, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteProgramCategory = async (programCategoryID) => {
	try {
		const response = await http.delete(`/program/category/${programCategoryID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProgramCategoryOrganizationStructure = async (programCategoryID) => {
	try {
		const response = await http.get('/program/organization/' + programCategoryID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createProgramCategoryOrganizationStructure = async (programCategoryID, params) => {
	const data = {
		program_id: params?.program_id,
		partner_id: params?.partner_id,
		position_id: params?.position_id,
		city_id: params?.city_id,
		konstituen_id: params?.konstituen_id
	};

	try {
		const response = await http.post('/program/organization', data);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateProgramCategoryOrganizationStructure = async (programCategoryID, params) => {
	const data = {
		program_id: params?.program_id,
		partner_id: params?.partner_id,
		position_id: params?.position_id,
		city_id: params?.city_id,
		konstituen_id: params?.konstituen_id
	};

	try {
		const response = await http.put('/program/organization/' + programCategoryID, data);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteProgramCategoryOrganizationStructure = async (programCategoryID) => {
	try {
		const response = await http.delete('/program/organization/' + programCategoryID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
