import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChartPriaWanita = ({ totalPria, totalWanita }) => {
	return (
		<div>
			<div className="p-4 space-y-2">
				<div className="font-light text-xl">Pria vs Wanita</div>
				<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
			</div>
			<hr />
			<div className="flex items-center justify-center px-4 md:px-8 py-4">
				<Pie
					data={{
						labels: ['Pria', 'Wanita'],
						datasets: [
							{
								label: 'Total',
								data: [totalPria, totalWanita],
								backgroundColor: ['rgba(40, 74, 245, 0.6)', 'rgba(255, 35, 138, 0.6)'],
								borderWidth: 1
							}
						]
					}}
				/>
			</div>
		</div>
	);
};
