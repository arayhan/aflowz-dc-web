import { NEGATIVE_CASE_TYPES } from '@/utils/constants';

export const NegativeCase = ({ type, title }) => {
	const renderIcon = () => {
		switch (type) {
			case NEGATIVE_CASE_TYPES.EMPTY_RESULT:
				return <img className="w-36 opacity-70" src={require('@/images/icons/state-empty.jpg')} alt="" />;
			default:
				return null;
		}
	};
	return (
		<div className="w-full flex flex-col items-center p-10 rounded-md text-gray-300">
			{renderIcon()}
			<div>{title || 'There is no data yet'}</div>
		</div>
	);
};
