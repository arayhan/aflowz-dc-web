import { useAuthStore } from '@/store';
import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

export const getPartnerItem = async (partnerID) => {
	try {
		const response = await http.get(`/partner/${partnerID}`);
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

export const updatePartner = async (partnerID, params) => {
	try {
		const response = await http.put('/partner/' + partnerID, params);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deletePartner = async (partnerID) => {
	try {
		const response = await http.delete(`/partner/${partnerID}`);
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

export const postStaffCreate = async (params) => {
	const splitDate = params?.birth_date.toString().split(' ');
	const setMonth = new Date(Date.parse(params?.birth_date)).getMonth() + 1;
	const formatDate = `${splitDate[3]}-${setMonth}-${splitDate[2]}`;

	const provinceDom = await http.get(`/province/${params.province}`);
	const cityDom = await http.get(`/city/${params.city}`);
	const districtDom = await http.get(`/district/${params.district}`);
	const villageDom = await http.get(`/village/${params.village}`);

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
			is_staff: true,
			village: villageDom.data.data.name || ''
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
	if (params.picture) {
		const data = {
			base64_datas: params.picture || ''
		};

		try {
			const response = await http.post(`/partner/photo/upload/${staffID}`, data);
			return { success: response.data.success, payload: response.data.data };
		} catch (error) {
			return { success: false, payload: error };
		}
	} else {
		const splitDate = params?.birth_date.toString().split(' ');
		const setMonth = new Date(Date.parse(params?.birth_date)).getMonth() + 1;
		const formatDate = `${splitDate[3]}-${setMonth}-${splitDate[2]}`;

		const provinceDom = await http.get(`/province/${params.province}`);
		const cityDom = await http.get(`/city/${params.city}`);
		const districtDom = await http.get(`/district/${params.district}`);
		const villageDom = await http.get(`/village/${params.village}`);

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
			is_staff: true,
			village: villageDom.data.data.name || ''
		};

		try {
			const response = await http.put(`/partner/${staffID}`, data);
			return { success: response.data.success, payload: response.data.data };
		} catch (error) {
			return { success: false, payload: error };
		}
	}
};
