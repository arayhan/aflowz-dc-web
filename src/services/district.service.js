import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getDistrictList = async (params) => {
	try {
		if (params === undefined) {
			const response = await http.get('/district');
			return { success: response.data.success, payload: response.data.data };
		} else if (params === 0) {
			return { success: true, payload: [] };
		} else {
			const queryParams = objectToQueryString({ city_id: params });
			const response = await http.get('/district' + queryParams);
			return { success: response.data.success, payload: response.data.data };
		}
	} catch (error) {
		return { success: false, payload: error };
	}
};
