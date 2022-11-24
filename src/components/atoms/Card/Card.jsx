export const Card = ({ title, description, bodyClassName, children }) => {
	return (
		<div>
			<div className="p-4 space-y-2">
				{title && <div className="font-light text-xl">{title}</div>}
				{description && <div className="text-sm text-gray-400">{description}</div>}
			</div>
			<hr />
			<div className={bodyClassName}>{children}</div>
		</div>
	);
};
