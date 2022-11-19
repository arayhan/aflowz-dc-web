import { SERVICE_PROGRAM } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingProgramList: false,
	programList: null,

	getProgramList: async (params) => {
		set({ fetchingProgramList: true });

		const { success, payload } = await SERVICE_PROGRAM.getProgramList(params);

		set({ programList: success ? payload : null });
		set({ fetchingProgramList: false });
	}
});

export const useProgramStore = create(devtools(states, { name: 'auth-store', getStorage: () => localStorage }));
