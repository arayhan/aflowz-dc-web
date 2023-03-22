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

export const postKonstituenCreate = async (params) => {
	const request = {
		name: params?.name || '',
		konstituen_type: params?.konstituen_type || '',
		address: params?.address || '',
		city_id: params?.city_id || 0,
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

// PROPOSAL

export const getProposalList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);

		const response = await http.get('/konstituen/proposal' + queryParams);

		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProposal = async (proposalID) => {
	try {
		const response = await http.get(`/konstituen/proposal/${proposalID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const postProposalCreate = async (params) => {
	const request = {
		name: params?.name || '',
		konstituen_id: params?.konstituen_id || 0
	};

	try {
		const response = await http.post('/konstituen/proposal', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteProposal = async (proposalID) => {
	try {
		const response = await http.delete(`/konstituen/proposal/${proposalID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateProposal = async (proposalID, params) => {
	const request = {
		name: params?.name || '',
		konstituen_id: params?.konstituen_id || 0
	};

	try {
		const response = await http.put('/konstituen/proposal' + `/${proposalID}`, request);

		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
