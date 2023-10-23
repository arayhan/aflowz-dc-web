import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getRealcountVillageDetail = async (villageID, params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get(`/page-detail/real-count/village/${villageID}` + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
