import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ChartCampaignDemografi = ({ data }) => {
	return (
		<div className="flex flex-col items-center justify-center gap-3 text-center">
			<div className="space-y-2">
				<div className="p-2 text-sm bg-gray-100 rounded-md">
					Total : <span className="font-semibold">{data.total}</span>
				</div>
			</div>
			{data && (
				<Bar
					data={{
						labels: data?.items.map((item) => item.name),
						datasets: data?.items.map((item) => ({
							label: item.name,
							data: [10, 5],
							backgroundColor: ['rgba(40, 74, 245, 0.6)', 'rgba(255, 35, 138, 0.6)'],
							borderWidth: 1
						}))
					}}
				/>
			)}
		</div>
	);
};
