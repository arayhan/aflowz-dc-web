import { SERVICE_ACTIVITY } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set, get) => ({
	fetchingActivityItem: false,
	fetchingActivityList: false,
	fetchingActivityDetailItem: false,
	fetchingActivityDetailList: false,

	processingCreateActivity: false,
	processingUpdateActivity: false,
	processingDeleteActivity: false,

	activityItem: null,
	activityList: null,
	activityDetailItem: null,
	activityDetailList: null,

	errorsActivity: null,
	errorsActivityDetail: null,

	getActivityItem: async (activityID) => {
		set({ fetchingActivityItem: true });
		set({ activityItem: null });

		const { success, payload } = await SERVICE_ACTIVITY.getActivityItem(activityID);

		if (!success) set({ errorsActivity: payload });

		set({ activityItem: success ? payload : null });
		set({ fetchingActivityItem: false });
	},

	getActivityList: async (params = {}) => {
		set({ fetchingActivityList: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_ACTIVITY.getActivityList(requestParams);

		set({ activityList: success ? payload : null });
		set({ fetchingActivityList: false });
	},

	getActivityDetailItem: async (activityID) => {
		set({ fetchingActivityDetailItem: true });

		const { success, payload } = await SERVICE_ACTIVITY.getActivityDetailItem(activityID);

		set({ activityDetailItem: success ? payload : null });
		set({ fetchingActivityDetailItem: false });
	},

	getActivityDetailList: async (params = {}) => {
		set({ fetchingActivityDetailList: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_ACTIVITY.getActivityDetailList(requestParams);

		set({ activityDetailList: success ? payload : null });
		set({ fetchingActivityDetailList: false });
	},

	createActivity: async (params, callback) => {
		set({ processingCreateActivity: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_ACTIVITY.createActivity(params);

		if (!success) set({ errorsActivity: payload });

		toastRequestResult(loader, success, 'Kegiatan created', payload?.odoo_error || payload?.message);
		set({ processingCreateActivity: false });

		callback({ payload, success });
	},

	updateActivity: async (activityID, params, callback) => {
		set({ processingUpdateActivity: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_ACTIVITY.updateActivity(activityID, params);

		if (!success) set({ errorsActivity: payload });

		toastRequestResult(loader, success, 'Kegiatan updated', payload?.odoo_error || payload?.message);
		set({ processingUpdateActivity: false });

		callback({ payload, success });
	},

	deleteActivity: async (activityID) => {
		set({ processingDeleteActivity: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_ACTIVITY.deleteActivity(activityID);

		toastRequestResult(loader, success, 'Kegiatan deleted', payload?.odoo_error || payload?.message);
		get().getActivityList();
		set({ processingDeleteActivity: false });
	},

	clearStateActivity: () => {
		set({ activity: null });
		set({ errorsActivity: null });
	},

	clearStateActivityDetail: () => {
		set({ activity: null });
		set({ errorsActivityDetail: null });
	}
});

export const useActivityStore = create(devtools(states, { name: 'activity-store', getStorage: () => localStorage }));
