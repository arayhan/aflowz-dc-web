import MOCK_JSON_AUTH from './json/auth.mock.json';

export const authLogin = (params) => {
	try {
		const response = MOCK_JSON_AUTH;
		console.log({ response });
		return { success: response.success, payload: response.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
