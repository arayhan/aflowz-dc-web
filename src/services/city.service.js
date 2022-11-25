import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getCityList = async () => {
    try {
        const newParams = ({ province_id: 617 });
        const queryParams = objectToQueryString(newParams);

        const response = await http.get('/city' + queryParams);

        return { success: response.data.success, payload: response.data.data };
    } catch (error) {
        return { success: false, payload: error };
    }
};