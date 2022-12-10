import { Fragment } from 'react';
import { BiChevronRight } from 'react-icons/bi';

export const Breadcrumb = ({ items, activeItem, completedItemCount, onClickItem }) => {
	const handleClickItem = (item, isCompleted, isActive) => {
		if (isCompleted || isActive) {
			if (onClickItem) onClickItem(item, isCompleted, isActive);
		}
	};

	return (
		<div className="flex items-center space-x-3 overflow-x-scroll">
			{items &&
				items.length > 0 &&
				items.map((item, index) => {
					const isActive = index === completedItemCount;
					const isCompleted = index < completedItemCount;

					return (
						<Fragment key={item.value}>
							<button
								className={`inline-flex items-center px-6 py-2 bg-white rounded-md space-x-3 whitespace-nowrap
									${!isCompleted && !isActive ? 'opacity-60 text-gray-500 cursor-default' : ''}
									${item.value === activeItem.value ? 'border-2 border-primary-500' : ''}
								`}
								onClick={() => handleClickItem(item, isCompleted, isActive)}
							>
								<span>{item.label}</span>
							</button>
							{index !== items.length - 1 && (
								<span className={isCompleted ? '' : 'text-gray-400'}>
									<BiChevronRight size={16} />
								</span>
							)}
						</Fragment>
					);
				})}
		</div>
	);
};

Breadcrumb.defaultProps = {
	items: [],
	completedItemCount: 0
};
