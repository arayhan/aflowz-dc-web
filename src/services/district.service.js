import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getDistrictList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		console.log(queryParams);
		const response = await http.get('/district' + queryParams);
		console.log(response);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
