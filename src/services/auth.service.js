const { http } = require('./http');

export const authLogin = async (request) => {
	try {
		const response = await http.post('/web/session/authenticate', request);
		return { success: true, payload: response.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
