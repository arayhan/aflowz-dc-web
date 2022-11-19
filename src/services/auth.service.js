import { http } from './http';

export const authLogin = async (params) => {
	try {
		const request = { ...params };
		const response = await http.post('/dewi-coryati/api/v1/user/login', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
