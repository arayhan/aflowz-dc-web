import MOCK_JSON_PROGRAM_DETAIL from './json/program-detail.mock.json';
import MOCK_JSON_PROGRAM_CATEGORY_DETAIL from './json/program-category-detail.mock';

export const getProgramDetail = () => {
	try {
		const response = MOCK_JSON_PROGRAM_DETAIL;
		return { success: response.success, payload: response.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProgramCategoryDetail = async () => {
	try {
		const response = MOCK_JSON_PROGRAM_CATEGORY_DETAIL;
		return { success: response.success, payload: response.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
