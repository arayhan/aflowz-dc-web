import { http } from './http';

export const authLogin = async (params) => {
	try {
		const request = { jsonrpc: '2.0', params };
		const response = await http.post('/web/session/authenticate', request);
		return { success: true, payload: response.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
