import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getPartnerList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/partner' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getStaffList = async () => {
    try {
        const queryParams = objectToQueryString({ is_staff: true });

        const response = await http.get('/partner' + queryParams);
        
        return { success: response.data.success, payload: response.data.data };
    } catch (error) {
        return { success: false, payload: error };
    }
};
