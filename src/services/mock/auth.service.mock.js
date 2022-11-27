import MOCK_JSON_AUTH from './json/auth.mock.json';

export const authLogin = () => {
	try {
		const response = MOCK_JSON_AUTH;
		return { success: response.success, payload: response.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
