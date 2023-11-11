import { useAuthStore } from '@/store';
import { http } from './http';

export const getSurvey = async () => {
	try {
		const response = await http.get('/survey');
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const bulkCreateSurvey = async (params) => {
	const { username } = useAuthStore.getState().profile;
	const request = {
		created_by: username,
		datas: params
	};

	try {
		const response = await http.post('/survey', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
