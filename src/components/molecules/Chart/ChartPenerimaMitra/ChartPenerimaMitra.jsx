import { NegativeCase } from '@/components/atoms';
import { NEGATIVE_CASE_TYPES } from '@/utils/constants';
import { getRandomColor } from '@/utils/helpers';
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ChartPenerimaMitra = ({ total, penerima }) => {
	return (
		<>
			{total === 0 && <NegativeCase type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />}
			{total > 0 && (
				<Bar
					data={{
						labels: penerima.map((item) => item.program_name),
						datasets: [
							{
								label: 'Total',
								data: penerima.map((item) => item.total_penerima_program),
								backgroundColor: penerima.map(() => getRandomColor()),
								borderWidth: 1
							}
						]
					}}
				/>
			)}
		</>
	);
};
