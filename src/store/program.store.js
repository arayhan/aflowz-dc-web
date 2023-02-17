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
	fetchingProgramCategoryTimeline: false,
	fetchingProgramCategoryOrganizationStructure: false,

	processingCreateProgram: false,
	processingUpdateProgram: false,
	processingDeleteProgram: false,
	processingCreateProgramCategory: false,
	processingUpdateProgramCategory: false,
	processingDeleteProgramCategory: false,
	processingCreateProgramCategoryTimeline: false,
	processingUpdateProgramCategoryTimeline: false,
	processingDeleteProgramCategoryTimeline: false,
	processingCreateProgramCategoryOrganizationStructure: false,
	processingUpdateProgramCategoryOrganizationStructure: false,
	processingDeleteProgramCategoryOrganizationStructure: false,

	program: null,
	programList: null,
	programDetail: null,
	programCategory: null,
	programCategoryList: null,
	programCategoryDetail: null,
	programCategoryTimeline: null,
	programCategoryOrganizationStructure: false,

	programCategoryErrors: null,
	programCategoryTimelineErrors: null,

	getProgram: async (programID) => {
		set({ fetchingProgram: true });
		set({ program: null });

		const { success, payload } = await SERVICE_PROGRAM.getProgram(programID);

		set({ program: success ? payload : null });
		set({ fetchingProgram: false });
	},
	getProgramList: async (params) => {
		set({ fetchingProgramList: true });

		const defaultParams = { limit: 1000, offset: 0 };
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
		set({ fetchingProgramCategory: true });

		const { success, payload } = await SERVICE_PROGRAM.getProgramCategory(programCategoryID);

		if (!success) set({ programCategoryErrors: payload });

		set({ programCategory: success ? payload : null });
		set({ fetchingProgramCategory: false });
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

		toastRequestResult(loader, success, 'Mitra created', payload?.odoo_error || payload?.message);
		set({ processingCreateProgramCategory: false });
		setPageLoading(false);

		callback({ payload, success });
	},
	updateProgramCategory: async (programCategoryID, params, callback) => {
		setPageLoading(true);
		set({ processingUpdateProgramCategory: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PROGRAM.updateProgramCategory(programCategoryID, params);

		toastRequestResult(loader, success, 'Mitra updated', payload?.odoo_error || payload?.message);
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

	getProgramCategoryOrganizationStructure: async (callback) => {
		set({ fetchingStaffOrganizationStructure: true });

		const { payload, success } = await SERVICE_PROGRAM.getProgramCategoryOrganizationStructure();
		set({ fetchingStaffOrganizationStructure: false });

		if (callback) callback({ payload, success });
	},

	createProgramCategoryOrganizationStructure: async (params, callback) => {
		set({ processingUploadStaffOrganizationStructure: true });

		const loader = toast.loading('Uploading...');
		const { payload, success } = await SERVICE_PROGRAM.createProgramCategoryOrganizationStructure(params);

		toastRequestResult(loader, success, 'Organization Structure created', payload?.odoo_error || payload?.message);
		set({ processingUploadStaffOrganizationStructure: false });

		callback({ payload, success });
	},

	updateProgramCategoryOrganizationStructure: async (params, callback) => {
		set({ processingUploadStaffOrganizationStructure: true });

		const loader = toast.loading('Uploading...');
		const { payload, success } = await SERVICE_PROGRAM.updateProgramCategoryOrganizationStructure(params);

		toastRequestResult(loader, success, 'Organization Structure updated', payload?.odoo_error || payload?.message);
		set({ processingUploadStaffOrganizationStructure: false });

		callback({ payload, success });
	},

	deleteProgramCategoryOrganizationStructure: async () => {
		set({ processingDeleteStaffOrganizationStructure: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PROGRAM.deleteProgramCategoryOrganizationStructure();

		toastRequestResult(loader, success, 'Organization Structure deleted', payload?.odoo_error || payload?.message);
		get().getStaffOrganizationStructure();
		set({ processingDeleteStaffOrganizationStructure: false });
	},

	getProgramCategoryTimeline: async (programCategoryTimelineID) => {
		set({ fetchingProgramCategoryTimeline: true });

		const { success, payload } = await SERVICE_PROGRAM.getProgramCategoryTimeline(programCategoryTimelineID);

		if (!success) set({ programCategoryTimelineErrors: payload });

		set({ programCategoryTimeline: success ? payload : null });
		set({ fetchingProgramCategoryTimeline: false });
	},
	createProgramCategoryTimeline: async (params, callback) => {
		setPageLoading(true);
		set({ processingCreateProgramCategoryTimeline: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PROGRAM.createProgramCategoryTimeline(params);

		toastRequestResult(loader, success, 'Timeline Mitra created', payload?.odoo_error || payload?.message);
		set({ processingCreateProgramCategoryTimeline: false });
		setPageLoading(false);

		callback({ payload, success });
	},
	updateProgramCategoryTimeline: async (programCategoryTimelineID, params, callback) => {
		setPageLoading(true);
		set({ processingUpdateProgramCategoryTimeline: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PROGRAM.updateProgramCategoryTimeline(programCategoryTimelineID, params);

		toastRequestResult(loader, success, 'Timeline Mitra updated', payload?.odoo_error || payload?.message);
		set({ processingUpdateProgramCategoryTimeline: false });
		setPageLoading(false);

		callback({ payload, success });
	},
	deleteProgramCategoryTimeline: async (programCategoryTimelineID) => {
		setPageLoading(true);
		set({ processingDeleteProgramCategoryTimeline: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_PROGRAM.deleteProgramCategoryTimeline(programCategoryTimelineID);

		toastRequestResult(loader, success, 'Timeline Mitra deleted', payload?.odoo_error || payload?.message);
		get().getProgramList();
		set({ processingDeleteProgramCategoryTimeline: false });
		setPageLoading(false);
	},

	clearStateProgramCategory: () => {
		set({ programCategory: null });
		set({ programCategoryErrors: null });
	},

	clearStateProgramCategoryTimeline: () => {
		set({ programCategoryTimeline: null });
		set({ programCategoryTimelineErrors: null });
	}
});

export const useProgramStore = create(devtools(states, { name: 'program-store', getStorage: () => localStorage }));
