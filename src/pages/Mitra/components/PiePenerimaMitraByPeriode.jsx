import { NegativeCaseView } from '@/components/molecules';
import { NEGATIVE_CASE_TYPES } from '@/utils/constants';
import { getRandomColor } from '@/utils/helpers';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PiePenerimaMitraByPeriode = ({ total, penerima }) => {
	return (
		<div>
			<div className="p-4 space-y-2">
				<div className="font-light text-xl">Penerima Mitra by Periode</div>
				<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
			</div>
			<hr />
			{total === 0 && <NegativeCaseView type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />}
			{total > 0 && (
				<div className="flex items-center justify-center px-4 md:px-8 xl:px-12 py-4">
					<Pie
						data={{
							labels: penerima.map((item) => item.periode),
							datasets: [
								{
									label: 'Total',
									data: penerima.map((item) => item.total_program),
									backgroundColor: penerima.map(() => getRandomColor()),
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
