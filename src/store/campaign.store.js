import { SERVICE_CAMPAIGN } from '@/services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const states = (set) => ({
	fetchingCampaignDetail: false,

	campaignDetail: null,

	getCampaignDetail: async (provinceID, params) => {
		set({ fetchingCampaignDetail: true });

		const defaultParams = {};
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;

		const { success, payload } = await SERVICE_CAMPAIGN.getCampaignDetail(provinceID, requestParams);

		set({ campaignDetail: success ? payload : null });
		set({ fetchingCampaignDetail: false });
	}
});

export const useCampaignStore = create(devtools(states));
