import { ACTION_TYPES } from '@/utils/constants';
import { ButtonAction } from '../Button/ButtonAction';

export const Card = ({ title, description, className, bodyClassName, children, isInDetail, linkRoute }) => {
	return (
		<div className={className}>
			<div className="md:flex items-center justify-between p-4">
				<div className="space-y-2">
					{title && <div className="font-light text-xl">{title}</div>}
					{/* {description && <div className="text-sm text-gray-400">{description}</div>} */}
				</div>
				{isInDetail && (
					<div>
						<ButtonAction
							action={ACTION_TYPES.UPDATE}
							linkTo={linkRoute}
							className={'w-full md:w-auto text-base px-5 py-3 rounded-md'}
							text="Update"
						/>
					</div>
				)}
			</div>
			<hr />
			<div className={bodyClassName}>{children}</div>
		</div>
	);
};
