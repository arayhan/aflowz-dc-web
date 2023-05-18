import { useAuthStore } from '@/store';
import { objectToQueryString } from '@/utils/helpers';
import { http, baseURL } from './http';

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

export const bulkCreatePartnerCandidate = async (params) => {
	const { username } = useAuthStore.getState().profile;
	const request = {
		created_by: username,
		datas: params
	};

	try {
		const response = await http.post('/partner/candidate', request);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const bulkCreatePartnerConfirm = async (params) => {
	const { username } = useAuthStore.getState().profile;
	const request = {
		created_by: username,
		datas: params
	};

	try {
		const response = await http.post('/partner/candidate/confirm', request);
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

	const provinceDom = http.get(`/province/${params.province}`);
	const cityDom = http.get(`/city/${params.city}`);
	const districtDom = http.get(`/district/${params.district}`);
	const villageDom = http.get(`/village/${params.village}`);
	const getData = await Promise.all([provinceDom, cityDom, districtDom, villageDom]);

	const data = [
		{
			nik_number: params?.nik_number || '',
			name: params?.name || '',
			birth_place: params?.birth_place || '',
			birth_date: formatDate || '',
			gender: params?.gender || '',
			address: params?.address || '',
			country: 'Indonesia',
			province: getData[0].data.data.name || '',
			city: getData[1].data.data.name || '',
			district: getData[2].data.data.name || '',
			mobile: params?.mobile || '',
			email: params?.email || '',
			religion: params?.religion || '',
			is_staff: true,
			staff_titles: params?.staff_titles || [],
			village: getData[3].data.data.name || ''
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
		staff_title_ids: params?.staff_titles || [],
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

export const getStaffOrganizationStructureImage = async () => {
	try {
		const response = await http.get('/user/upload/structure');
		const failed = response.data.code === 400;
		return { success: !failed, payload: failed ? null : baseURL + '/user/upload/structure' };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteStaffOrganizationStructureImage = async () => {
	try {
		const response = await http.delete('/user/upload/structure');
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const uploadStaffOrganizationStructureImage = async (params) => {
	const data = {
		base64_datas: params.picture || ''
	};

	try {
		const response = await http.post('/user/upload/structure', data);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getPartnerAllCity = async () => {
	try {
		const reqQueryParams = objectToQueryString({ province_id: 617 }); // kota bengkulu
		const getCity = await http.get(`/city${reqQueryParams}`);

		// let city = [
		// 	{ id: 567, name: 'Kab. Bengkulu Selatan' },
		// 	{ id: 568, name: 'Kab. Bengkulu Tengah' },
		// 	{ id: 569, name: 'Kab. Bengkulu Utara' },
		// 	{ id: 659, name: 'Kab. Kaur' },
		// 	{ id: 665, name: 'Kab. Kepahiang' },
		// 	{ id: 715, name: 'Kab. Lebong' },
		// 	{ id: 770, name: 'Kab. Muko Muko' },
		// 	{ id: 839, name: 'Kab. Rejang Lebong' },
		// 	{ id: 852, name: 'Kab. Seluma' },
		// 	{ id: 945, name: 'Kota Bengkulu' }
		// ];

		let result = getCity.data.data.items.map(async (val) => {
			let total = await http.get(`/partner?is_receiver=true&city_id=${val.id}`);
			return {
				id: val.id,
				name: val.name,
				total_penerima: total.data.data.total
			};
		});

		const response = await Promise.all(result);

		const sort = response.sort((a, b) =>
			a.total_penerima > b.total_penerima ? -1 : Number(a.total_penerima < b.total_penerima)
		);

		return { success: getCity.data.success, payload: sort };
	} catch (error) {
		return { success: false, payload: error };
	}
};
