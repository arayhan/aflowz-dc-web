import { SERVICE_PARTNER } from "@/services";
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingPartnerList: false,
	partnerList: null,
	fetchingStaffList: false,
    staffList: null,

	getPartnerList: async (params) => {
		set({ fetchingPartnerList: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_PARTNER.getPartnerList(requestParams);

		set({ partnerList: success ? payload : null });
		set({ fetchingPartnerList: false });
	},
	getStaffList: async () => {
        set({ fetchingStaffList: true });

        const { success, payload } = await SERVICE_PARTNER.getStaffList();
        
        set({ staffList: success ? payload : null });
        set({ fetchingStaffList: false });
    }
});
export const usePartnerStore = create(devtools(states, { name: 'partner-store', getStorage: () => localStorage }));
