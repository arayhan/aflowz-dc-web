import MOCK_AUTH from './mock/auth.mock';

export const authLogin = (params) => {
	try {
		const response = MOCK_AUTH;
		console.log({ response });
		return { success: response.success, payload: response.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
