import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getCampaignDetail = async (provinceID, params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get(`/page-detail/campaign/${provinceID}` + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
