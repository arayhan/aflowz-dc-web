import { Card } from '@/components/atoms';
import { ChartPenerimaProgramByGender } from '../../Chart/ChartPenerimaProgramByGender/ChartPenerimaProgramByGender';

export const CardPenerimaProgramByGender = ({ total, totalPria, totalWanita }) => {
	return (
		<Card
			title={'Penerima Program by Gender'}
			description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
			className={'bg-white rounded-md'}
		>
			<div className="flex items-center justify-center px-4 md:px-8 xl:px-12 py-4">
				<ChartPenerimaProgramByGender total={total} totalPria={totalPria} totalWanita={totalWanita} />
			</div>
		</Card>
	);
};
