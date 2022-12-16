import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getActivityItem = async (activityID) => {
	try {
		const response = await http.get(`/activity/${activityID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getActivityList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/activity' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getPromiseList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('activity/promise' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getActivityDetailItem = async (activityID) => {
	try {
		const response = await http.get('/activity/detail/' + activityID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getActivityDetailList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/activity/detail/' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createActivity = async (params) => {
	const request = {
		description: params?.description || '',
		konstituen_id: params?.konstituen_id || 0,
		village_id: params?.village_id || 0,
		district_id: params?.district_id || 0,
		city_id: params?.city_id || 0,
		program_id: params?.program_id || 0
	};

	try {
		const response = await http.post('/activity', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateActivity = async (activityID, params) => {
	const request = {
		description: params?.description || '',
		konstituen_id: params?.konstituen_id || 0,
		village_id: params?.village_id || 0,
		district_id: params?.district_id || 0,
		city_id: params?.city_id || 0,
		program_id: params?.program_id || 0
	};

	try {
		const response = await http.put(`/activity/${activityID}`, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteActivity = async (activityID) => {
	try {
		const response = await http.delete(`/activity/${activityID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
