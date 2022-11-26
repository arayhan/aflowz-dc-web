import { forwardRef } from 'react';
import { InputError } from '../InputError/InputError';
import { InputLabel } from '../InputLabel/InputLabel';

export const InputText = forwardRef(({ label, placeholder, error, ...props }, ref) => {
	return (
		<div className="space-y-2 flex flex-col justify-start">
			<InputLabel text={label} name={props.name} />
			<input
				{...props}
				ref={ref}
				className={`border ${
					error ? 'border-red-500' : 'border-gray-300'
				} rounded-[4px] px-3 py-[6px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
				placeholder={placeholder}
				id={props.name}
				name={props.name}
			/>
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputText.displayName = 'InputText';
