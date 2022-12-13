import { SERVICE_STOCKIEST } from '@/services/index';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { toastRequestResult } from '@/utils/helpers';
import { useAppStore } from './app.store';
import { toast } from 'react-toastify';

const { setPageLoading } = useAppStore.getState();

const states = (set, get) => ({
	fetchingProductList: false,
	fetchingProduct: false,
	fetchingProductCategoryList: false,
	fetchingProductLogList: false,

	processingCreateProduct: false,
	processingUpdateProduct: false,
	processingDeleteProduct: false,

	productList: null,
	product: null,
	productCategoryList: null,
	productLogList: null,

	getProductList: async (params) => {
		set({ fetchingProductList: true });
		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_STOCKIEST.getProductList(requestParams);

		set({ productList: success ? payload : null });
		set({ fetchingProductList: false });
	},

	getProduct: async (productID) => {
		set({ fetchingProduct: true });

		const { success, payload } = await SERVICE_STOCKIEST.getProduct(productID);

		set({ product: success ? payload : null });
		set({ fetchingProduct: false });
	},

	getProductCategoryList: async (params) => {
		set({ fetchingProductCategoryList: true });
		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_STOCKIEST.getProductCategoryList(requestParams);

		set({ productCategoryList: success ? payload : null });
		set({ fetchingProductCategoryList: false });
	},

	createProduct: async (params, callback) => {
		setPageLoading(true);
		set({ processingCreateProduct: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_STOCKIEST.createProduct(params);

		toastRequestResult(loader, success, 'Product created', payload?.odoo_error || payload?.message);

		set({ processingCreateProduct: false });
		setPageLoading(false);

		callback({ payload, success });
	},

	updateProduct: async (stockiestID, params, callback) => {
		setPageLoading(true);
		set({ processingUpdateProduct: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_STOCKIEST.updateProduct(stockiestID, params);

		toastRequestResult(loader, success, 'Product updated', payload?.odoo_error || payload?.message);

		set({ processingUpdateProduct: false });
		setPageLoading(false);

		callback({ payload, success });
	},

	deleteProduct: async (stockiestID) => {
		setPageLoading(true);
		set({ processingDeleteProduct: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_STOCKIEST.deleteProduct(stockiestID);

		toastRequestResult(loader, success, 'Product deleted', payload?.odoo_error || payload?.message);

		set({ processingDeleteProduct: false });
		get().getProductList();
		setPageLoading(false);
	},

	updatePicture: async (stockiestID, params, callback) => {
		set({ processingEditProduct: true });

		const loader = toast.loading('Updating...');
		const { payload, success } = await SERVICE_STOCKIEST.updatePicture(stockiestID, params);

		toastRequestResult(loader, success, 'Picture updated', payload?.odoo_error || payload?.message);
		set({ processingEditProduct: false });

		callback({ payload, success });
	},

	updateStockProduct: async (params, dataProduct, callback) => {
		setPageLoading(true);
		set({ processingUpdateProduct: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_STOCKIEST.updateStockProduct(params, dataProduct);

		toastRequestResult(loader, success, 'Product updated', payload?.odoo_error || payload?.message);

		set({ processingUpdateProduct: false });
		setPageLoading(false);

		callback({ payload, success });
	},

	getProductLogList: async (params) => {
		set({ fetchingProductLogList: true });
		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_STOCKIEST.getProductLogList(requestParams);

		set({ productLogList: success ? payload : null });
		set({ fetchingProductLogList: false });
	},

	clearStateProduct: async () => {
		set({ product: null });
	}
});

export const useStockiestStore = create(devtools(states, { name: 'stockiest-store', getStorage: () => localStorage }));
