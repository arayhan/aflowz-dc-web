import { SERVICE_PROGRAM } from '@/services';
import { slugify } from '@/utils/helpers';
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

		if (success) payload.items.map((item) => Object.assign(item, { slug: slugify(item.name) }));

		set({ programList: success ? payload : null });
		set({ fetchingProgramList: false });
	},
	getProgramCategoryList: async () => {
		set({ fetchingProgramCategoryList: true });

		const { success, payload } = await SERVICE_PROGRAM.getProgramCategoryList();

		if (success) payload.items.map((item) => Object.assign(item, { slug: slugify(item.name) }));

		set({ programCategoryList: success ? payload : null });
		set({ fetchingProgramCategoryList: false });
	}
});

export const useProgramStore = create(devtools(states, { name: 'auth-store', getStorage: () => localStorage }));
