import MOCK_JSON_PROGRAM_DETAIL from './json/program-detail.mock.json';

export const getProgramDetail = () => {
	try {
		const response = MOCK_JSON_PROGRAM_DETAIL;
		return { success: response.success, payload: response.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
