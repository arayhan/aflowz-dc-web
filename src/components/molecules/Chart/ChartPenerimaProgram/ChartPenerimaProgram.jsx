import { NegativeCase } from '@/components/atoms';
import { NEGATIVE_CASE_TYPES } from '@/utils/constants';
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ChartPenerimaProgram = ({ totalPenerima, penerimaPerArea, isPerVillage, isPerCity }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top'
			}
		}
	};

	const labels = penerimaPerArea.map((program) => {
		if (isPerVillage) return program.village_name;
		if (isPerCity) return program.city_name;
		return null;
	});

	return (
		<>
			{totalPenerima === 0 && <NegativeCase type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />}
			{totalPenerima > 0 && (
				<Bar
					options={options}
					data={{
						labels,
						datasets: [
							{
								label: 'Total',
								data: penerimaPerArea.map((program) => program.total_penerima),
								backgroundColor: ['rgba(40, 74, 245, 0.6)', 'rgba(255, 35, 138, 0.6)'],
								borderWidth: 1
							}
						]
					}}
				/>
			)}
		</>
	);
};
