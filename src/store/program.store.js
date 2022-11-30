import { SERVICE_PROGRAM } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { useAppStore } from './app.store';

const { setPageLoading } = useAppStore.getState();

const states = (set, get) => ({
	fetchingProgram: false,
	fetchingProgramList: false,
	fetchingProgramDetail: false,
	fetchingProgramCategory: false,
	fetchingProgramCategoryList: false,
	fetchingProgramCategoryDetail: false,

	processingCreateProgram: false,
	processingUpdateProgram: false,
	processingDeleteProgram: false,
	processingCreateProgramCategory: false,
	processingUpdateProgramCategory: false,
	processingDeleteProgramCategory: false,

	program: null,
	programList: null,
	programDetail: null,
	programCategory: null,
	programCategoryList: null,
	programCategoryDetail: null,

	programCategoryErrors: null,

	getProgram: async (programID) => {
		set({ fetchingProgram: true });
		set({ program: null });

		const { success, payload } = await SERVICE_PROGRAM.getProgram(programID);

		set({ program: success ? payload : null });
		set({ fetchingProgram: false });
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
	createProgram: async (params, callback) => {
		setPageLoading(true);
		set({ processingCreateProgram: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PROGRAM.createProgram(params);

		toastRequestResult(loader, success, 'Program created', payload?.odoo_error || payload?.message);
		set({ processingCreateProgram: false });
		setPageLoading(false);

		callback({ payload, success });
	},
	updateProgram: async (programID, params, callback) => {
		setPageLoading(true);
		set({ processingUpdateProgram: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PROGRAM.updateProgram(programID, params);

		toastRequestResult(loader, success, 'Program updated', payload?.odoo_error || payload?.message);
		set({ processingUpdateProgram: false });
		setPageLoading(false);

		callback({ payload, success });
	},
	deleteProgram: async (programID) => {
		setPageLoading(true);
		set({ processingDeleteProgram: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PROGRAM.deleteProgram(programID);

		toastRequestResult(loader, success, 'Program deleted', payload?.odoo_error || payload?.message);
		get().getProgramList();
		set({ processingDeleteProgram: false });
		setPageLoading(false);
	},
	getProgramCategory: async (programCategoryID) => {
		if (get().programCategory === null) {
			set({ fetchingProgramCategory: true });

			const { success, payload } = await SERVICE_PROGRAM.getProgramCategory(programCategoryID);

			if (!success) set({ programCategoryErrors: payload });

			set({ programCategory: success ? payload : null });
			set({ fetchingProgramCategory: false });
		}
	},
	getProgramCategoryList: async () => {
		set({ fetchingProgramCategoryList: true });

		const { success, payload } = await SERVICE_PROGRAM.getProgramCategoryList();

		set({ programCategoryList: success ? payload : null });
		set({ fetchingProgramCategoryList: false });
	},
	getProgramCategoryDetail: async (programCategoryID) => {
		set({ fetchingProgramCategoryDetail: true });

		const { success, payload } = await SERVICE_PROGRAM.getProgramCategoryDetail(programCategoryID);

		set({ programCategoryDetail: success ? payload : null });
		set({ fetchingProgramCategoryDetail: false });
	},
	createProgramCategory: async (params, callback) => {
		setPageLoading(true);
		set({ processingCreateProgramCategory: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PROGRAM.createProgramCategory(params);

		toastRequestResult(loader, success, 'Program Category created', payload?.odoo_error || payload?.message);
		set({ processingCreateProgramCategory: false });
		setPageLoading(false);

		callback({ payload, success });
	},
	updateProgramCategory: async (programCategoryID, params, callback) => {
		setPageLoading(true);
		set({ processingUpdateProgramCategory: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PROGRAM.updateProgramCategory(programCategoryID, params);

		toastRequestResult(loader, success, 'Program Category updated', payload?.odoo_error || payload?.message);
		set({ processingUpdateProgramCategory: false });
		setPageLoading(false);

		callback({ payload, success });
	},
	deleteProgramCategory: async (programCategoryID) => {
		setPageLoading(true);
		set({ processingDeleteProgramCategory: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PROGRAM.deleteProgramCategory(programCategoryID);

		toastRequestResult(loader, success, 'Mitra deleted', payload?.odoo_error || payload?.message);
		get().getProgramList();
		set({ processingDeleteProgramCategory: false });
		setPageLoading(false);
	},
	clearStateProgramCategory: () => {
		set({ programCategory: null });
		set({ programCategoryErrors: null });
	}
});

export const useProgramStore = create(devtools(states, { name: 'program-store', getStorage: () => localStorage }));
