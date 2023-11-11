import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartCampaignDemografi = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-3 text-center">
			<div className="space-y-2">
				<div className="p-2 text-sm bg-gray-100 rounded-md">
					Total : <span className="font-semibold">0</span>
				</div>
			</div>
			<Pie
				data={{
					labels: [`{DUMMY}`, `{DUMMY}`],
					datasets: [
						{
							label: 'Total',
							data: [0, 0],
							backgroundColor: ['rgba(40, 74, 245, 0.6)', 'rgba(255, 35, 138, 0.6)'],
							borderWidth: 1
						}
					]
				}}
			/>
		</div>
	);
};
