import { SERVICE_ATTENDANCE } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { toastRequestResult } from '@/utils/helpers';
import { useAppStore } from './app.store';
import { toast } from 'react-toastify';

const { setPageLoading } = useAppStore.getState();

const states = (set, get) => ({
	fetchingAttendanceList: false,
	fetchingAttendance: false,

	processingCreateAttendance: false,
	processingEditAttendance: false,
	processingDeleteAttendance: false,

	attendanceList: null,
	attendance: null,

	getAttendanceList: async (params) => {
		set({ fetchingAttendanceList: true });

		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_ATTENDANCE.getAttendanceList(requestParams);

		set({ attendanceList: success ? payload : null });
		set({ fetchingAttendanceList: false });
	},

	getAttendance: async (attendanceID) => {
		set({ fetchingAttendance: true });

		const { success, payload } = await SERVICE_ATTENDANCE.getAttendance(attendanceID);

		set({ attendance: success ? payload : null });
		set({ fetchingAttendance: false });
	},

	createAttendance: async (params, callback) => {
		setPageLoading(true);
		set({ processingCreateAttendance: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_ATTENDANCE.createAttendance(params);

		toastRequestResult(loader, success, 'Absensi created', payload?.odoo_error || payload?.message);
		set({ processingCreateAttendance: false });
		setPageLoading(false);

		callback({ payload, success });
	},

	updateAttendance: async (attendanceID, data, callback) => {
		setPageLoading(true);
		set({ processingEditAttendance: true });

		const loader = toast.loading('Updating...');
		const { payload, success } = await SERVICE_ATTENDANCE.updateAttendance(attendanceID, data);

		toastRequestResult(loader, success, 'Absensi updated', payload?.odoo_error || payload?.message);
		set({ processingEditAttendance: false });
		setPageLoading(false);

		callback({ payload, success });
	},

	deleteAttendance: async (attendanceID) => {
		setPageLoading(true);
		set({ processingDeleteAttendance: true });

		const loader = toast.loading('Processing...');
		const { success, payload } = await SERVICE_ATTENDANCE.deleteAttendance(attendanceID);

		toastRequestResult(loader, success, 'Absensi deleted', payload?.odoo_error || payload?.message);
		get().getAttendanceList();
		set({ processingDeleteAttendance: false });
		setPageLoading(false);
	},

	clearStateAttendance: () => {
		set({ attendance: null });
	}
});

export const useAttendanceStore = create(
	devtools(states, { name: 'attendance-store', getStorage: () => localStorage })
);
