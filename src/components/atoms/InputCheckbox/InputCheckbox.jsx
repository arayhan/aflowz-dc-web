import { forwardRef } from 'react';
import { InputError } from '../InputError/InputError';
import { InputLabel } from '../InputLabel/InputLabel';

export const InputCheckbox = forwardRef(({ label, placeholder, error, ...props }, ref) => {
	return (
		<div className="flex items-center justify-start space-x-2">
			<input
				{...props}
				type="checkbox"
				ref={ref}
				checked={props.value}
				className={`border ${
					error ? 'border-red-500' : 'border-gray-300'
				} rounded-[4px] p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400`}
				placeholder={placeholder}
				id={props.name}
			/>
			<InputLabel text={label} name={props.name} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputCheckbox.displayName = 'InputCheckbox';
