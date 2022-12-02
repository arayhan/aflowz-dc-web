import { SERVICE_CITY } from '@/services';
import { getDistrictList } from '@/services/district.service';
import { toastRequestResult } from '@/utils/helpers';
import { get } from 'react-hook-form';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

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

	errorsCity: null,

	getCityItem: async (cityID) => {
		set({ fetchingCity: true });
		set({ city: null });

		const { success, payload } = await SERVICE_CITY.getCityItem(cityID);

		if (!success) set({ errorsCity: payload });

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
		set({ processingCreateCity: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_CITY.createCity(params);

		if (!success) set({ errorsCity: payload });

		toastRequestResult(loader, success, 'City created', payload?.odoo_error || payload?.message);
		set({ processingCreateCity: false });

		callback({ payload, success });
	},

	updateCity: async (cityID, params, callback) => {
		set({ processingUpdateCity: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_CITY.updateCity(cityID, params);

		if (!success) set({ errorsCity: payload });

		toastRequestResult(loader, success, 'City updated', payload?.odoo_error || payload?.message);
		set({ processingUpdateCity: false });

		callback({ payload, success });
	},

	deleteCity: async (cityID) => {
		set({ processingDeleteCity: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_CITY.deleteCity(cityID);

		toastRequestResult(loader, success, 'Kota deleted', payload?.odoo_error || payload?.message);
		get().getCityList();
		set({ processingDeleteCity: false });
	},

	clearStateCity: () => {
		set({ city: null });
		set({ errorsCity: null });
	}
});

export const useCityStore = create(devtools(states, { name: 'city-store', getStorage: () => localStorage }));
