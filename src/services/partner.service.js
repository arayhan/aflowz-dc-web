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
	const getStaffTitle = await http.get('partner/staff-title');
	const findTitle = getStaffTitle.data.data.items.find((val) => val.id === Number(params.staff_title));

	const data = [
		{
			nik_number: params?.nik_number || '',
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
			staff_title: findTitle?.name || '',
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
	const splitDate = params?.birth_date.toString().split(' ');
	const setMonth = new Date(Date.parse(params?.birth_date)).getMonth() + 1;
	const formatDate = `${splitDate[3]}-${setMonth}-${splitDate[2]}`;

	const data = {
		nik_number: params?.nik_number || '',
		name: params?.name || '',
		birth_place: params?.birth_place || '',
		birth_date: formatDate || '',
		gender: params?.gender || '',
		address: params?.address || '',
		country_id: 100,
		province_id: params?.province || 0,
		city_id: params?.city || 0,
		district_id: params?.district || 0,
		village_id: params?.village || 0,
		mobile: params?.mobile || '',
		email: params?.email || '',
		religion: params?.religion || '',
		staff_title_id: Number(params?.staff_title) || 0,
		is_staff: true
	};
	try {
		const response = await http.put(`/partner/${staffID}`, data);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updatePicture = async (partnerID, params) => {
	const data = {
		base64_datas: params.picture || ''
	};

	try {
		const response = await http.post(`/partner/photo/upload/${partnerID}`, data);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
