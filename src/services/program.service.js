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
		description: params?.description || '',
		location: params?.location || '',
		date: params?.date || '',
		total_participant: params?.total_participant || 0,
		is_special_program: params?.is_special_program || false,
		is_pip: params?.is_pip || false,
		is_kip: params?.is_kip || false
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
		description: params?.description || '',
		location: params?.location || '',
		date: params?.date || '',
		total_participant: params?.total_participant || 0,
		is_special_program: params?.is_special_program || false,
		is_pip: params?.is_pip || false,
		is_kip: params?.is_kip || false
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

export const changePorgramStatus = async (programID) => {
	try {
		const response = await http.post(`/program/validate/${programID}`);
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

export const getProgramCategoryTimeline = async (programCategoryTimelineID) => {
	try {
		const response = await http.get('/program/plan/' + programCategoryTimelineID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createProgramCategoryTimeline = async (params) => {
	const request = {
		name: params?.name || '',
		start_date: params?.start_date || '',
		end_date: params?.end_date || '',
		description: params?.description || '',
		program_category_id: params?.program_category_id || 0,
		target_receiver: params?.target_receiver || '',
		pic_staff_id: params?.pic_staff_id || 0,
		location: params?.location || '',
		status: params?.status || ''
	};

	try {
		const response = await http.post('/program/plan', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateProgramCategoryTimeline = async (programID, params) => {
	const request = {
		name: params?.name || '',
		start_date: params?.start_date || '',
		end_date: params?.end_date || '',
		description: params?.description || '',
		program_category_id: params?.program_category_id || 0,
		target_receiver: params?.target_receiver ? Number(params?.target_receiver) : '',
		pic_staff_id: params?.pic_staff_id || 0,
		location: params?.location || '',
		status: params?.status || ''
	};

	try {
		const response = await http.put('/program/plan/' + programID, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteProgramCategoryTimeline = async (programCategoryTimelineID) => {
	try {
		const response = await http.delete(`/program/plan/${programCategoryTimelineID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProgramOrganizationPositionList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/program/organization/position' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProgramOrganizationList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/program/organization' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProgramOrganization = async (programOrganizationID) => {
	try {
		const response = await http.get('/program/organization/' + programOrganizationID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createProgramOrganization = async (params) => {
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

export const updateProgramOrganization = async (programOrganizationID, params) => {
	const data = {
		program_id: params?.program_id,
		partner_id: params?.partner_id,
		position_id: params?.position_id,
		city_id: params?.city_id,
		konstituen_id: params?.konstituen_id
	};

	try {
		const response = await http.put('/program/organization/' + programOrganizationID, data);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteProgramOrganization = async (programOrganizationID) => {
	try {
		const response = await http.delete('/program/organization/' + programOrganizationID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const uploadProgramOrganizationStructureImage = async (programID, params) => {
	const data = {
		base64_datas: params.picture || ''
	};

	try {
		const response = await http.post('/program/photo/upload/' + programID, data);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteProgramCategoryOrganizationStructureImage = async (programCategoryID) => {
	try {
		const response = await http.delete('/program/category/photo/upload/' + programCategoryID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const uploadProgramCategoryOrganizationStructureImage = async (programCategoryID, params) => {
	const data = {
		base64_datas: params.picture || ''
	};

	try {
		const response = await http.post('/program/category/photo/upload/' + programCategoryID, data);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProgramTimelineList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/program/timeline' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProgramTimeline = async (programTimelineID) => {
	try {
		const response = await http.get('/program/timeline/' + programTimelineID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createProgramTimeline = async (params) => {
	const request = {
		name: params?.name || '',
		start_date: params?.start_date || '',
		end_date: params?.end_date || '',
		program_id: params?.program_id || 0
	};

	try {
		const response = await http.post('/program/timeline', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateProgramTimeline = async (programID, params) => {
	const request = {
		name: params?.name || '',
		start_date: params?.start_date || '',
		end_date: params?.end_date || '',
		program_id: params?.program_id || 0
	};

	try {
		const response = await http.put('/program/timeline/' + programID, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteProgramTimeline = async (programTimelineID) => {
	try {
		const response = await http.delete(`/program/timeline/${programTimelineID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
