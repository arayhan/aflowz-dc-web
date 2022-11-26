import { forwardRef } from 'react';

export const InputText = forwardRef(({ label, name, placeholder, error, ...props }, ref) => {
	return (
		<div className="space-y-1 flex flex-col justify-between">
			<label className="text-sm text-gray-500" htmlFor={name}>
				{label}
			</label>
			<input
				{...props}
				ref={ref}
				className={`border ${
					error ? 'border-red-500' : 'border-gray-300'
				} rounded-[4px] px-3 py-[6px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
				placeholder={placeholder}
				id={name}
				name={name}
			/>
			{error && <div className="text-xs text-red-500">{error.message}</div>}
		</div>
	);
});

InputText.displayName = 'InputText';
