import { http } from './http';
import MOCK_AUTH from './mock/auth.mock';

export const authLogin = (params) => {
	try {
		const request = { ...params };
		// const response = await http.post('/user/login', request);
		// return { success: response.data.success, payload: response.data.data };
		const response = MOCK_AUTH;
		console.log({ response });
		return { success: response.success, payload: response.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
