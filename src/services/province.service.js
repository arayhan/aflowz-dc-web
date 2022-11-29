import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getProvinceList = async () => {
	try {
		const queryParams = objectToQueryString({ country_id: 100 }); // Indonesia

		const response = await http.get('/province' + queryParams);

		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
