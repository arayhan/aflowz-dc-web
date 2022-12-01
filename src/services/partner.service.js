import { useAuthStore } from '@/store';
import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getStaffList = async (params) => {
	try {
		const defaultParams = { is_staff: true };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;
		const queryParams = objectToQueryString(requestParams);

		const response = await http.get('/partner' + queryParams);

		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getPartnerList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/partner' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getPartnerDetail = async (partnerID) => {
	try {
		const response = await http.get('/partner/' + partnerID);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const bulkCreatePartner = async (params) => {
	const { username } = useAuthStore.getState().profile;
	const request = {
		created_by: username,
		datas: params
	};

	try {
		const response = await http.post('/partner', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getStaffTitleList = async () => {
	try {
		const response = await http.get('/partner/staff-title');
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getPartner = async (partnerID) => {
	try {
		const response = await http.get(`/partner/${partnerID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const postStaffCreate = async (params) => {
	const splitDate = params?.birth_date.toString().split(' ');
	const setMonth = new Date(Date.parse(params?.birth_date)).getMonth() + 1;
	const formatDate = `${splitDate[3]}-${setMonth}-${splitDate[2]}`;

	const provinceDom = await http.get(`/province/${params.province}`);
	const cityDom = await http.get(`/city/${params.city}`);
	const districtDom = await http.get(`/village/${params.district}`);

	const data = [
		{
			nik_number: params?.nik_number || 0,
			name: params?.name || '',
			birth_place: params?.birth_place || '',
			birth_date: formatDate || '',
			gender: params?.gender || '',
			address: params?.address || '',
			country: 'Indonesia',
			province: provinceDom.data.data.name || '',
			city: cityDom.data.data.name || '',
			district: districtDom.data.data.name || '',
			mobile: params?.mobile || '',
			email: params?.email || '',
			religion: params?.religion || '',
			staff_title: params?.staff_title || '',
			is_staff: true
		}
	];

	const { username } = useAuthStore.getState().profile;
	const request = {
		created_by: username,
		datas: data
	};

	try {
		const response = await http.post('/partner', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateStaff = async (staffID, params) => {
	const splitDate = params?.birth_date.toString().split(' ');
	const setMonth = new Date(Date.parse(params?.birth_date)).getMonth() + 1;
	const formatDate = `${splitDate[3]}-${setMonth}-${splitDate[2]}`;

	const provinceDom = await http.get(`/province/${params.province}`);
	const cityDom = await http.get(`/city/${params.city}`);
	const districtDom = await http.get(`/village/${params.district}`);

	const data = {
		nik_number: params?.nik_number || 0,
		name: params?.name || '',
		birth_place: params?.birth_place || '',
		birth_date: formatDate || '',
		gender: params?.gender || '',
		address: params?.address || '',
		country: 'Indonesia',
		province: provinceDom.data.data.name || '',
		city: cityDom.data.data.name || '',
		district: districtDom.data.data.name || '',
		mobile: params?.mobile || '',
		email: params?.email || '',
		religion: params?.religion || '',
		staff_title: params?.staff_title || '',
		is_staff: true
	};
	try {
		const response = await http.put(`/partner/${staffID}`, data);
		console.log(response);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteStaff = async (staffID) => {
	try {
		const response = await http.delete(`/partner/${staffID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
