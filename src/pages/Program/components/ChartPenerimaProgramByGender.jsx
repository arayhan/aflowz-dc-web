import { NegativeCaseView } from '@/components/molecules/NegativeCaseView/NegativeCaseView';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartPenerimaProgramByGender = ({ totalPria, totalWanita }) => {
	return (
		<div>
			{totalPria === 0 && totalWanita && <NegativeCaseView type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />}
			{(totalPria > 0 || totalWanita > 0) && (
				<Pie
					data={{
						labels: ['Pria', 'Wanita'],
						datasets: [
							{
								label: 'Total',
								data: [totalPria || 0, totalWanita || 0],
								backgroundColor: ['rgba(40, 74, 245, 0.6)', 'rgba(255, 35, 138, 0.6)'],
								borderWidth: 1
							}
						]
					}}
				/>
			)}
		</div>
	);
};

ChartPenerimaProgramByGender.defaultProps = {
	totalPria: 0,
	totalWanita: 0
};
