import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ChartCampaignUsia = ({ data }) => {
	const labels = ['Dibawah 22', '22-30', '31-40', '41-52', '53-71', 'Diatas 71'];

	const arrayColor = [
		'rgba(40, 74, 245, 0.6)',
		'rgba(255, 35, 138, 0.6)',
		'rgba(0, 149, 168, 0.6)',
		'rgba(17, 46, 81, 0.6)'
	];

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
						labels: labels,
						datasets: data?.items.map((item) => ({
							label: item.name,
							data: [item.u22, item.u22_30, item.u31_40, item.u41_52, item.u53_71, item.u71],
							backgroundColor: arrayColor[item.id % 4],
							borderWidth: 1
						}))
					}}
				/>
			)}
		</div>
	);
};
