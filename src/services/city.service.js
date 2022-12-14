import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getCityList = async (params) => {
	try {
		if (params === undefined) {
			const response = await http.get('/city');
			return { success: response.data.success, payload: response.data.data };
		} else if (params === 0) {
			return { success: true, payload: [] };
		} else {
			const queryParams = objectToQueryString({ province_id: params });
			const response = await http.get('/city' + queryParams);
			return { success: response.data.success, payload: response.data.data };
		}
	} catch (error) {
		return { success: false, payload: error };
	}
};
