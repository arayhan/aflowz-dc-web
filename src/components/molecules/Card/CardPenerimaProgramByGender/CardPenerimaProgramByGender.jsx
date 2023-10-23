import { Card } from '@/components/atoms';
import { ChartPenerimaProgramByGender } from '../../Chart/ChartPenerimaProgramByGender/ChartPenerimaProgramByGender';

export const CardPenerimaProgramByGender = ({ total, totalPria, totalWanita }) => {
	return (
		<Card title={'Penerima Program by Gender'} className={'bg-white rounded-md'}>
			<div className="flex items-center justify-center px-4 py-4 md:px-8 xl:px-12">
				<ChartPenerimaProgramByGender total={total} totalPria={totalPria} totalWanita={totalWanita} />
			</div>
		</Card>
	);
};
