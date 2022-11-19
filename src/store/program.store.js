import { SERVICE_PROGRAM } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingProgramList: false,
	fetchingProgramCategoryList: false,
	programList: null,
	programCategoryList: null,

	getProgramList: async (params) => {
		set({ fetchingProgramList: true });

		const { success, payload } = await SERVICE_PROGRAM.getProgramList(params);

		set({ programList: success ? payload : null });
		set({ fetchingProgramList: false });
	},
	getProgramCategoryList: async () => {
		set({ fetchingProgramCategoryList: true });

		const { success, payload } = await SERVICE_PROGRAM.getProgramCategoryList();
		console.log({ payload });

		set({ programCategoryList: success ? payload : null });
		set({ fetchingProgramCategoryList: false });
	}
});

export const useProgramStore = create(devtools(states, { name: 'auth-store', getStorage: () => localStorage }));
