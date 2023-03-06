import { SERVICE_ACTIVITY } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set, get) => ({
	fetchingActivityItem: false,
	fetchingActivityCategory: false,
	fetchingActivityList: false,
	fetchingActivityDetailItem: false,
	fetchingActivityDetailCategory: false,
	fetchingActivityDetailList: false,
	fetchingActivityPromiseItem: false,
	fetchingActivityPromiseList: false,

	processingCreateActivity: false,
	processingUpdateActivity: false,
	processingDeleteActivity: false,
	processingCreateActivityDetail: false,
	processingUpdateActivityDetail: false,
	processingDeleteActivityDetail: false,
	processingCreateActivityPromise: false,
	processingUpdateActivityPromise: false,
	processingDeleteActivityPromise: false,

	activityItem: null,
	activityCategory: null,
	activityList: null,
	activityDetailItem: null,
	activityDetailCategory: null,
	activityDetailList: null,
	activityPromiseItem: null,
	activityPromiseList: null,

	errorsActivity: null,
	errorsActivityDetail: null,
	errorsActivityPromise: null,

	// ==================================
	// Activity
	// ==================================
	getActivityItem: async (activityID) => {
		set({ fetchingActivityItem: true });
		set({ activityItem: null });

		const { success, payload } = await SERVICE_ACTIVITY.getActivityItem(activityID);

		if (!success) set({ errorsActivity: payload });

		set({ activityItem: success ? payload : null });
		set({ fetchingActivityItem: false });
	},

	getActivityCategory: async () => {
		set({ fetchingActivityCategory: true });
		set({ activityCategory: null });

		const { success, payload } = await SERVICE_ACTIVITY.getActivityCategory();

		if (!success) set({ errorsActivity: payload });

		set({ activityCategory: success ? payload : null });
		set({ fetchingActivityCategory: false });
	},

	getActivityList: async (params = {}) => {
		set({ fetchingActivityList: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_ACTIVITY.getActivityList(requestParams);

		set({ activityList: success ? payload : null });
		set({ fetchingActivityList: false });
	},

	createActivity: async (params, callback) => {
		set({ processingCreateActivity: true });

		const loader = toast.loading('Processing...');
		const { payload: payloadActivity, success: successActivitiy } = await SERVICE_ACTIVITY.createActivity(params);
		const { payload: payloadDetail, success: successDetail } = await SERVICE_ACTIVITY.createActivityDetail(
			payloadActivity?.id,
			params
		);

		if (!successActivitiy || !successDetail) {
			set({ errorsActivity: payloadActivity, errorsActivityDetail: payloadDetail });
		}

		toastRequestResult(
			loader,
			successActivitiy && successDetail,
			'Kegiatan created',
			payloadActivity?.odoo_error || payloadActivity?.message || payloadDetail?.odoo_error || payloadDetail?.message
		);
		set({ processingCreateActivity: false });

		callback({
			payload: { activity: payloadActivity, activity_detail: payloadDetail },
			success: successActivitiy && successDetail
		});
	},

	updateActivity: async (activityID, params, callback) => {
		set({ processingUpdateActivity: true });

		const loader = toast.loading('Processing...');
		const { payload: payloadActivity, success: successActivitiy } = await SERVICE_ACTIVITY.updateActivity(params);
		const { payload: payloadDetail, success: successDetail } = await SERVICE_ACTIVITY.updateActivityDetail(
			activityID,
			params
		);

		if (!successActivitiy || !successDetail) {
			set({ errorsActivity: payloadActivity, errorsActivityDetail: payloadDetail });
		}

		toastRequestResult(
			loader,
			successActivitiy && successDetail,
			'Kegiatan updated',
			payloadActivity?.odoo_error || payloadActivity?.message || payloadDetail?.odoo_error || payloadDetail?.message
		);
		set({ processingUpdateActivity: false });

		callback({
			payload: { activity: payloadActivity, activity_detail: payloadDetail },
			success: successActivitiy && successDetail
		});
	},

	deleteActivity: async (activityID) => {
		set({ processingDeleteActivity: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_ACTIVITY.deleteActivity(activityID);

		toastRequestResult(loader, success, 'Kegiatan deleted', payload?.odoo_error || payload?.message);
		get().getActivityList();
		set({ processingDeleteActivity: false });
	},

	// ==================================
	// Activity Detail
	// ==================================
	getActivityDetailItem: async (activityID) => {
		set({ fetchingActivityDetailItem: true });

		const { success, payload } = await SERVICE_ACTIVITY.getActivityDetailItem(activityID);

		set({ activityDetailItem: success ? payload : null });
		set({ fetchingActivityDetailItem: false });
	},

	getActivityDetailList: async (params = {}) => {
		set({ fetchingActivityDetailList: true });

		const defaultParams = {};
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_ACTIVITY.getActivityDetailList(requestParams);

		set({ activityDetailList: success ? payload : null });
		set({ fetchingActivityDetailList: false });
	},

	createActivityDetail: async (params, callback) => {
		set({ processingCreateActivity: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_ACTIVITY.createActivityDetail(params?.activity_id, params);

		if (!success) set({ errorsActivityDetail: payload });

		toastRequestResult(loader, success, 'Detail Kegiatan created', payload?.odoo_error || payload?.message);
		set({ processingCreateActivityDetail: false });

		callback({ payload, success });
	},

	updateActivityDetail: async (activityDetailID, params, callback) => {
		set({ processingUpdateActivityDetail: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_ACTIVITY.updateActivityDetail(activityDetailID, params);

		if (!success) set({ errorsActivityDetail: payload });

		toastRequestResult(loader, success, 'Kegiatan Detail updated', payload?.odoo_error || payload?.message);
		set({ processingUpdateActivityDetail: false });

		callback({ payload, success });
	},

	deleteActivityDetail: async (activityDetailID) => {
		set({ processingDeleteActivityDetail: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_ACTIVITY.deleteActivityDetail(activityDetailID);

		toastRequestResult(
			loader,
			success,
			'Kegiatan Detail deleted',
			payload?.odoo_error || payload?.status || payload?.message
		);
		get().getActivityDetailList();
		set({ processingDeleteActivityDetail: false });
	},

	// ==================================
	// ActivityPromise
	// ==================================
	getActivityPromiseItem: async (activityPromiseID) => {
		set({ fetchingActivityPromiseItem: true });

		const { success, payload } = await SERVICE_ACTIVITY.getActivityPromiseItem(activityPromiseID);

		set({ activityPromiseItem: success ? payload : null });
		set({ fetchingActivityPromiseItem: false });
	},

	getActivityPromiseList: async (params = {}, isSetLoading = true) => {
		if (isSetLoading) set({ fetchingActivityPromiseList: true });

		const defaultParams = { limit: 0, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_ACTIVITY.getActivityPromiseList(requestParams);

		set({ activityPromiseList: success ? payload : null });
		set({ fetchingActivityPromiseList: false });
	},

	createActivityPromise: async (params, callback) => {
		set({ processingCreateActivity: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_ACTIVITY.createActivityPromise(params);

		if (!success) set({ errorsActivityPromise: payload });

		toastRequestResult(loader, success, 'Janji Kegiatan created', payload?.odoo_error || payload?.message);
		set({ processingCreateActivityPromise: false });

		callback({ payload, success });
	},

	updateActivityPromise: async (activityPromiseID, params, callback) => {
		set({ processingUpdateActivityPromise: true });

		const loader = toast.loading(`Updating Janji : ${params.name}`);
		const { payload, success } = await SERVICE_ACTIVITY.updateActivityPromise(activityPromiseID, params);

		if (!success) set({ errorsActivityPromise: payload });

		toastRequestResult(loader, success, `Janji ${params.name} updated`, payload?.odoo_error || payload?.message);
		set({ processingUpdateActivityPromise: false });

		callback({ payload, success });
	},

	deleteActivityPromise: async (activityPromiseID, callback) => {
		set({ processingDeleteActivityPromise: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_ACTIVITY.deleteActivityPromise(activityPromiseID);

		toastRequestResult(
			loader,
			success,
			'Janji Kegiatan deleted',
			payload?.status || payload?.odoo_error || payload?.message
		);
		callback({ payload, success });
		set({ processingDeleteActivityPromise: false });
	},

	// ==================================
	// Clear State
	// ==================================
	clearStateActivity: () => {
		set({ fetchingActivityList: null });
		set({ errorsActivity: null });
	},

	clearStateActivityDetail: () => {
		set({ activityDetailList: null });
		set({ errorsActivityDetail: null });
	},

	clearStateActivityPromise: () => {
		set({ activityPromiseList: null });
		set({ errorsActivityPromise: null });
	}
});

export const useActivityStore = create(devtools(states, { name: 'activity-store', getStorage: () => localStorage }));
