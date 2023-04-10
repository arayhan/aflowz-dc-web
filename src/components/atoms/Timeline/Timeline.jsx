import moment from 'moment';
import { Button } from '../Button/Button';
import { ButtonAction } from '../Button/ButtonAction';
import { ACTION_TYPES } from '@/utils/constants';

export const Timeline = ({ programCategoryID, dataTimeline, onDelete }) => {
	return (
		<div>
			{dataTimeline.length === 0 && (
				<div className="w-full p-8 text-center text-gray-400 bg-gray-100 rounded-md">
					There is no timeline created yet
				</div>
			)}
			{dataTimeline.length > 0 && (
				<div className="relative flex items-start w-full">
					<div className="absolute left-0 w-full h-1 bg-gray-200 top-10" />
					{dataTimeline.map((timeline) => (
						<div key={timeline.id} className="min-w-[200px] md:min-w-[250px] space-y-3 max-w-[300px] text-center">
							<div className="text-base font-semibold md:text-lg">{moment(timeline.date_plan).format('YYYY')}</div>
							<div className="relative w-full h-1 bg-primary">
								<div className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-primary" />
							</div>
							<div className="text-sm text-gray-400">{moment(timeline.date_plan).format('DD MMMM YYYY')}</div>
							<div className="p-4 mx-3 rounded-md shadow-md">
								<div className="text-xs md:text-sm">{timeline.program_name}</div>
							</div>
							<div className="flex items-center gap-2 px-3">
								<Button
									className={'w-full px-4 py-2 rounded-sm text-xs md:text-sm'}
									variant="success"
									linkTo={`/mitra/${programCategoryID}/timeline/update/${timeline.id}`}
								>
									Update
								</Button>
								<ButtonAction
									action={ACTION_TYPES.DELETE}
									className={'w-full px-4 py-2 rounded-sm text-xs md:text-sm'}
									onClick={() => onDelete(timeline.id)}
								>
									Delete
								</ButtonAction>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
