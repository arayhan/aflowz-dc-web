import { NegativeCaseView } from '@/components/molecules';
import { NEGATIVE_CASE_TYPES } from '@/utils/constants';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChartPenerimaProgram = ({ totalPenerima, penerimaPerArea, isPerVillage, isPerCity }) => {
	const labels = penerimaPerArea.map((program) => {
		if (isPerVillage) return program.village_name;
		if (isPerCity) return program.city_name;
		return null;
	});

	return (
		<div>
			<div className="p-4 space-y-2">
				<div className="font-light text-xl">
					Penerima Program {isPerVillage && 'PerVillage'} {isPerCity && 'PerCity'}
				</div>
				<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
			</div>
			<hr />
			{totalPenerima === 0 && <NegativeCaseView type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />}
			{totalPenerima > 0 && (
				<div className="flex items-center justify-center px-4 md:px-8 xl:px-12 py-4">
					<Pie
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
				</div>
			)}
		</div>
	);
};
