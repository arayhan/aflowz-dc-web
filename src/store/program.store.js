import { SERVICE_PROGRAM } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { useAppStore } from './app.store';

const { setPageLoading } = useAppStore.getState();

const states = (set) => ({
	fetchingProgramCategoryList: false,
	fetchingProgramCategoryDetail: false,
	fetchingProgramList: false,
	fetchingProgramDetail: false,

	processingCreateProgram: false,

	programCategoryList: null,
	programCategoryDetail: null,
	programList: null,
	programDetail: null,

	getProgramCategoryList: async () => {
		set({ fetchingProgramCategoryList: true });

		const { success, payload } = await SERVICE_PROGRAM.getProgramCategoryList();

		set({ programCategoryList: success ? payload : null });
		set({ fetchingProgramCategoryList: false });
	},
	getProgramList: async (params) => {
		set({ fetchingProgramList: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_PROGRAM.getProgramList(requestParams);

		set({ programList: success ? payload : null });
		set({ fetchingProgramList: false });
	},
	getProgramDetail: async (programID) => {
		set({ fetchingProgramDetail: true });

		const { success, payload } = await SERVICE_PROGRAM.getProgramDetail(programID);

		set({ programDetail: success ? payload : null });
		set({ fetchingProgramDetail: false });
	},
	getProgramCategoryDetail: async (mitraID) => {
		set({ fetchingProgramCategoryDetail: true });

		const { success, payload } = await SERVICE_PROGRAM.getProgramCategoryDetail(mitraID);

		set({ programCategoryDetail: success ? payload : null });
		set({ fetchingProgramCategoryDetail: false });
	},

	createProgram: async (params, callback) => {
		setPageLoading(true);
		set({ processingCreateProgram: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PROGRAM.createProgram(params);

		toastRequestResult(loader, success, 'Program created', payload?.odoo_error || payload?.message);
		set({ processingCreateProgram: false });
		setPageLoading(false);

		callback({ payload, success });
	}
});

export const useProgramStore = create(devtools(states, { name: 'program-store', getStorage: () => localStorage }));
