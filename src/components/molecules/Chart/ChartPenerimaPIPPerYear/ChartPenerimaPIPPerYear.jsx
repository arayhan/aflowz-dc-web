import { NegativeCase } from '@/components/atoms';
import { NEGATIVE_CASE_TYPES } from '@/utils/constants';
import { getRandomColor } from '@/utils/helpers';
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ChartPenerimaPIPPerYear = ({ data }) => {
	const total = data.length;

	return (
		<>
			{total === 0 && <NegativeCase type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />}
			{total > 0 && (
				<Bar
					data={{
						labels: data.map((item) => item.periode),
						datasets: [
							{
								label: 'Total Penerima PIP',
								data: data.map((item) => item.total_program),
								backgroundColor: getRandomColor(),
								borderWidth: 1
							}
						]
					}}
					options={{
						scales: {
							x: {
								title: {
									display: true,
									text: 'Periode',
									color: '#aaa'
								}
							},
							y: {
								title: {
									display: true,
									text: 'Jumlah Penerima',
									color: '#aaa'
								},
								ticks: {
									stepSize: 1
								}
							}
						}
					}}
				/>
			)}
		</>
	);
};

ChartPenerimaPIPPerYear.defaultProps = {
	data: [{ periode: '2020', total_penerima: 0 }]
};
