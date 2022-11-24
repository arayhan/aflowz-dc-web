import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getKonstituenList = async (params) => {
    try {
        const newParams = (Object.keys(params).length === 2) ? {...params, konstituen_type: 'sekolah,kampus'} : params;
        const queryParams = objectToQueryString(newParams);

        const response = await http.get('/konstituen' + queryParams);
        
        return { success: response.data.success, payload: response.data.data };
    } catch (error) {
        return { success: false, payload: error };
    }
};

export const getKonstituenDetail = async (konstituenID) => {
    try {
        const response = await http.get('/page-detail/konstituen/' + konstituenID);
        
        return { success: response.data.success, payload: response.data.data };
    } catch (error) {
        return { success: false, payload: error };
    }
};

export const getPenerimaKonstituenDetail = async (params) => {
    try {
        const queryParams = objectToQueryString(params);

        console.log('/partner' + queryParams)

        const response = await http.get('/partner' + queryParams);

        return { success: response.data.success, payload: response.data.data };
    } catch (error) {
        return { success: false, payload: error };
    }
}