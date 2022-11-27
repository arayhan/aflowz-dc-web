import { SERVICE_CITY } from "@/services";
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
    fetchingCityList: false,
    cityList: null,

    getCityList: async () => {
        set({ fetchingCityList: true });

        const { success, payload } = await SERVICE_CITY.getCityList()
        
        set({ cityList: success ? payload : null });
        set({ fetchingCityList: false });
    }
});

export const useCityStore = create(devtools(states));