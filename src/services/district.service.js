import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getDistrictList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/district' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
