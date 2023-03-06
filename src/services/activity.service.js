import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

// ==================================
// Activity
// ==================================
export const getActivityItem = async (activityID) => {
	try {
		const response = await http.get(`/activity/${activityID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getActivityCategory = async () => {
	try {
		const response = await http.get(`/activity/category`);
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

export const createActivity = async (params) => {
	const request = {
		description: params?.description_activity || params?.description || '',
		konstituen_id: params?.konstituen_id || 0,
		village_id: params?.village_id || 0,
		district_id: params?.district_id || 0,
		city_id: params?.city_id || 0,
		program_id: params?.program_id || 0,
		category_id: params?.category_id || 0
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

// ==================================
// Activity Detail
// ==================================

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
		const response = await http.get('/activity/detail' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createActivityDetail = async (activityID, params) => {
	const request = {
		activity_id: activityID || 0,
		description: params?.description_activity_detail || params?.description || '',
		activity_date: params?.activity_date || '',
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0,
		promise_datas: params?.promise_datas || []
	};

	try {
		const response = await http.post('/activity/detail', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateActivityDetail = async (activityDetailID, params) => {
	const request = {
		description: params?.description_activity_detail || '',
		activity_date: params?.activity_date || '',
		pic: params?.pic || '',
		pic_mobile: params?.pic_mobile || '',
		pic_staff_id: params?.pic_staff_id || 0
	};

	try {
		const response = await http.put(`/activity/detail/${activityDetailID}`, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteActivityDetail = async (activityDetailID) => {
	try {
		const response = await http.delete(`/activity/detail/${activityDetailID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

// ==================================
// Activity Promise
// ==================================
export const getActivityPromiseItem = async (activityPromiseID) => {
	try {
		const response = await http.get('/activity/promise/' + activityPromiseID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getActivityPromiseList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('activity/promise' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createActivityPromise = async (params) => {
	const request = {
		activity_detail_id: params?.activity_detail_id || 0,
		name: params?.name || '',
		realization: params?.realization || false
	};

	try {
		const response = await http.post('/activity/promise', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateActivityPromise = async (activityPromiseID, params) => {
	const request = {
		realization: params?.realization || false
	};

	try {
		const response = await http.put(`/activity/promise/${activityPromiseID}`, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteActivityPromise = async (activityPromiseID) => {
	try {
		const response = await http.delete(`/activity/promise/${activityPromiseID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
