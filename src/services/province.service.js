import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getProvinceList = async (params) => {
	try {
		const reqQuery = params ? { country_id: params } : { country_id: 100 };
		const queryParams = objectToQueryString(reqQuery); // Indonesia

		const response = await http.get('/province' + queryParams);

		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
