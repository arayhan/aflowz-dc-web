import { objectToQueryString } from '@/utils/helpers';
import { http } from './http';

const stockProduct = '/stock/product';

export const getProductList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get(stockProduct + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProduct = async (productID) => {
	try {
		const response = await http.get(stockProduct + `/${productID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProductCategoryList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get(stockProduct + '/category' + queryParams);

		const sort = response.data.data.items.sort((a, b) => (a.id < b.id ? -1 : Number(a.id > b.id)));
		sort.splice(0, 3);
		const dataResponse = {
			items: sort,
			total: sort.length
		};
		return { success: response.data.success, payload: dataResponse };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const createProduct = async (params) => {
	try {
		let data = {
			name: params?.name || '',
			sku_code: params?.sku_code || '',
			product_category_id: params?.product_category_id || 0,
			description: params?.description || '',
			quantity: Number(params?.quantity) || 0
		};

		const response = await http.post(stockProduct, data);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateProduct = async (stockiestID, params) => {
	try {
		let data = {
			name: params?.name || '',
			sku_code: params?.sku_code || '',
			product_category_id: params?.product_category_id || 0,
			description: params?.description || '',
			quantity: Number(params?.quantity) || 0
		};

		const response = await http.put(stockProduct + `/${stockiestID}`, data);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const deleteProduct = async (stockiestID) => {
	try {
		const response = await http.delete(stockProduct + `/${stockiestID}`);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updatePicture = async (stockiestID, params) => {
	const data = {
		base64_datas: params.picture || ''
	};

	try {
		const response = await http.post(stockProduct + `/photo/upload/${stockiestID}`, data);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const updateStockProduct = async (params, dataProduct) => {
	try {
		let prodArr = [];
		dataProduct.forEach((item) => {
			prodArr.push({ product_id: item.id, quantity: item.quantity });
		});

		let data = {
			village_id: params?.village || 0,
			district_id: params?.district || 0,
			city_id: params?.city || 0,
			konstituen_id: params?.konstituen || 0,
			program_id: params?.program || 0,
			pic_staff_id: params?.pic_staff_id || 0,
			description: params?.description || '',
			products: prodArr || [],
			warehouse_id: item?.warehouse?.id || 0
		};

		if (params.method === 'in') {
			const response = await http.post(stockProduct + `/in`, data);
			return { success: response.data.success, payload: response.data.data };
		} else if (params.method === 'out') {
			const response = await http.post(stockProduct + `/out`, data);
			return { success: response.data.success, payload: response.data.data };
		}
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getProductLogList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get(stockProduct + '/move' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};

export const getWarehouseList = async (params) => {
	try {
		const queryParams = objectToQueryString(params);
		const response = await http.get('/stock/warehouse' + queryParams);
		return { success: response.data.success, payload: response.data.data };
	} catch (error) {
		return { success: false, payload: error };
	}
};
