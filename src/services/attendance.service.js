import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getAttendanceList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/attendance' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getAttendance = async (attendanceID) => {
	try {
		const response = await http.get(`/attendance/${attendanceID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createAttendance = async (params) => {
	try {
		let att = [];
		let abs = [];
		params?.data.forEach((val) => {
			if (val.desc === 2) {
				att.push(val.id);
			} else {
				abs.push(val.id);
			}
		});

		let convert = params?.date.toLocaleDateString('fr-CA');
		const request = {
			date: convert || '', // "2022-12-2"
			attendance_staff_ids: att || [], // [19, 8]
			abscene_staff_ids: abs || [] // [19, 8]
		};
		const response = await http.post('/attendance', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateAttendance = async (attendanceID, params) => {
	try {
		let att = [];
		let abs = [];
		params?.data.forEach((val) => {
			if (val.desc === 2) {
				att.push(val.id);
			} else {
				abs.push(val.id);
			}
		});

		const request = {
			attendance_staff_ids: att || [], // [19, 8]
			abscene_staff_ids: abs || [] // [19, 8]
		};

		const response = await http.put(`/attendance/${attendanceID}`, request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteAttendance = async (attendanceID) => {
	try {
		const response = await http.delete(`/attendance/${attendanceID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
