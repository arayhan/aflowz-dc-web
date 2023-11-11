import { SERVICE_SURVEY } from '@/services';
import { toastRequestResult } from '@/utils/helpers';
import { toast } from 'react-toastify';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	survey: null,

	fetchingSurvey: null,

	processingBulkCreateSurvey: false,

	bulkCreateSurvey: async (params, callback) => {
		set({ processingBulkCreateSurvey: true });

		const loader = toast.loading('Processing...');
		const { payload, success } = await SERVICE_SURVEY.bulkCreateSurvey(params);

		toastRequestResult(loader, success, 'Survey Created', payload?.odoo_error || payload?.message);
		set({ processingBulkCreateSurvey: false });

		callback({ payload, success });
	}
});

export const useSurveyStore = create(devtools(states, { name: 'survey-store', getStorage: () => localStorage }));
