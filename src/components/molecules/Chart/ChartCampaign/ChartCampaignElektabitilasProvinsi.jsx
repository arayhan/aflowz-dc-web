import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ChartCampaignElektabitilasProvinsi = ({ data }) => {
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top'
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center gap-3 text-center">
			<div className="space-y-2">
				<div className="p-2 text-sm bg-gray-100 rounded-md">
					Total : <span className="font-semibold">{data?.total}</span>
				</div>
			</div>

			{data && (
				<div className="flex items-center justify-center w-auto px-4 py-4 md:px-8 xl:px-12 h-96">
					<Bar
						options={options}
						data={{
							labels: data.items.map((data) => data.name),
							datasets: [
								{
									label: 'Provinsi',
									data: data.items.map((data) => data.provinsi),
									backgroundColor: ['rgba(40, 74, 245, 0.6)'],
									borderWidth: 1
								}
							]
						}}
					/>
				</div>
			)}
		</div>
	);
};
