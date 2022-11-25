import { SERVICE_PARTNER } from "@/services";
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
    fetchingStaffList: false,
    staffList: null,

    getStaffList: async () => {
        set({ fetchingStaffList: true });

        const { success, payload } = await SERVICE_PARTNER.getStaffList();
        
        set({ staffList: success ? payload : null });
        set({ fetchingStaffList: false });
    }
});

export const usePartnerStore = create(devtools(states, { name: 'auth-store', getStorage: () => localStorage }));