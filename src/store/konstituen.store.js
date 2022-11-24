import { SERVICE_KONSTITUEN } from "@/services";
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
    fetchingKonstituenList: false,
    fetchingKonstituenDetail: false,
    fetchingPenerimaKonstituenDetail: false,
    konstituenList: null,
    konstituenDetail: null,
    penerimaKonstituenDetail: null,

    getKonstituenList: async (params) => {
        set({ fetchingKonstituenList: true });

        const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

        const { success, payload } = await SERVICE_KONSTITUEN.getKonstituenList(requestParams);
        
        set({ konstituenList: success ? payload : null })
        set({ fetchingKonstituenList: false });
    },
    getKonstituenDetail: async (konstituenID) => {
        set({ fetchingKonstituenDetail: true });

        const { success, payload } = await SERVICE_KONSTITUEN.getKonstituenDetail(konstituenID)
        
        set({ konstituenDetail: success ? payload : null })
        set({ fetchingKonstituenDetail: false });
    },
    getPenerimaKonstituenDetail: async (params) => {
        set({ fetchingPenerimaKonstituenDetail: true });

        const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

        const { success, payload } = await SERVICE_KONSTITUEN.getPenerimaKonstituenDetail(requestParams);

        set({ penerimaKonstituenDetail: success ? payload : null })
        set({ fetchingPenerimaKonstituenDetail: false });
    }
});

export const useKonstituenStore = create(devtools(states, { name: 'auth-store', getStorage: () => localStorage }));