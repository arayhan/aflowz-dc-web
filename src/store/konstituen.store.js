import { SERVICE_KONSTITUEN } from "@/services";
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
    fetchingKonstituenList: false,
    konstituenList: null,

    getKonstituenList: async (params) => {
        set({ fetchingKonstituenList: true });

        const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

        const { success, payload } = await SERVICE_KONSTITUEN.getKonstituenList(requestParams);
        
        set({ konstituenList: success ? payload : null })
        set({ fetchingKonstituenList: false });
    }
});

export const useKonstituenStore = create(devtools(states, { name: 'auth-store', getStorage: () => localStorage }));