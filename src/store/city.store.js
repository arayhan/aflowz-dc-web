import { SERVICE_CITY } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { useAppStore } from './app.store';

const { setPageLoading } = useAppStore.getState();

const states = (set) => ({
	fetchingCityItem: false,
	fetchingCityList: false,
	fetchingCityDetail: false,

	processingCreateCity: false,
	processingUpdateCity: false,
	processingDeleteCity: false,

	cityItem: null,
	cityList: null,
	cityDetail: null,

	getCityItem: async (cityID) => {
		set({ fetchingCity: true });
		set({ city: null });

		const { success, payload } = await SERVICE_CITY.getCityItem(cityID);

		set({ city: success ? payload : null });
		set({ fetchingCity: false });
	},

	getCityList: async (params) => {
		set({ fetchingCityList: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_CITY.getCityList(requestParams);

		set({ cityList: success ? payload : null });
		set({ fetchingCityList: false });
	},

	getCityDetail: async (cityID) => {
		set({ fetchingCityDetail: true });

		const { success, payload } = await SERVICE_CITY.getCityDetail(cityID);

		set({ cityDetail: success ? payload : null });
		set({ fetchingCityDetail: false });
	},

	createCity: async (params, callback) => {
		setPageLoading(true);
		set({ processingCreateCity: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_CITY.createCity(params);

		toastRequestResult(loader, success, 'City created', payload?.odoo_error || payload?.message);
		set({ processingCreateCity: false });
		setPageLoading(false);

		callback({ payload, success });
	},

	updateCity: async (cityID, params, callback) => {
		setPageLoading(true);
		set({ processingUpdateCity: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_CITY.updateCity(cityID, params);

		toastRequestResult(loader, success, 'City updated', payload?.odoo_error || payload?.message);
		set({ processingUpdateCity: false });
		setPageLoading(false);

		callback({ payload, success });
	},

	deleteCity: async (cityID) => {
		setPageLoading(true);
		set({ processingDeleteCity: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_CITY.deleteCity(cityID);

		toastRequestResult(loader, success, 'Kota deleted', payload?.odoo_error || payload?.message);
		get().getCityList();
		set({ processingDeleteCity: false });
		setPageLoading(false);
	}
});

export const useCityStore = create(devtools(states));
