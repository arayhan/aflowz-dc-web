export const InputTextInfo = ({ tag, value, extraValue, tagClassName, valueClassName }) => {
	return (
		<>
			<div
				className={`${tagClassName} col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2 transform: capitalize`}
			>
				{tag}
			</div>
			<div className={`${valueClassName} col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50`}>
				{value} {extraValue}
			</div>
		</>
	);
};
