import { ACTION_TYPES } from '@/utils/constants';
import { ButtonAction } from '../Button/ButtonAction';

export const Card = ({ title, description, className, bodyClassName, children, isInDetail, linkRoute }) => {
	return (
		<div className={className}>
			<div className="flex items-center justify-between">
				<div className="p-4 space-y-2">
					{title && <div className="font-light text-xl">{title}</div>}
					{description && <div className="text-sm text-gray-400">{description}</div>}
				</div>
				{isInDetail && (
					<div className="p-4 space-y-2">
						<ButtonAction linkTo={linkRoute} text={'Update'} action={ACTION_TYPES.UPDATE} className={'px-7 py-4'} />
					</div>
				)}
			</div>
			<hr />
			<div className={bodyClassName}>{children}</div>
		</div>
	);
};
