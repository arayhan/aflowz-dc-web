import { NegativeCase } from '@/components/atoms';
import { NEGATIVE_CASE_TYPES } from '@/utils/constants';
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChartPenerimaKonstituenPerTahun = ({ totalPenerima }) => {
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
		<div>
			<div className="p-4 space-y-2">
				<div className="text-xl font-light">Penerima Program per Periode</div>
			</div>
			<hr />
			{totalPenerima.length === 0 && <NegativeCase type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />}
			{totalPenerima.length > 0 && (
				<div className="flex items-center justify-center w-auto px-4 py-4 md:px-8 xl:px-12 h-96">
					<Bar
						options={options}
						data={{
							labels: totalPenerima.map((data) => `${data.periode}\n(${data.total_penerima_program} Orang)`),
							datasets: [
								{
									label: 'Total Penerima',
									data: totalPenerima.map((data) => data.total_penerima_program),
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
