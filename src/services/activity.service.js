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

export const getActivityDetailItem = async (activityID) => {
	try {
		const response = await http.get('/activity/detail/' + activityID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createActivity = async (params) => {
	const request = {
		name: params?.name || '',
		province_id: params?.province_id || 0,
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0
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
		name: params?.name || '',
		province_id: params?.province_id || 0,
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0
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
