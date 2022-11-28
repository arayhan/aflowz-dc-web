import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import React, { forwardRef } from 'react';

export const InputSelectGender = forwardRef(({ error, onChange, ...props }, ref) => {
	const options = [
		{ label: 'Wanita', value: 'Wanita' },
		{ label: 'Pria', value: 'Pria' }
	];

	return (
		<div className="space-y-1">
			<InputLabel text="Jenis Kelamin" name={props.name} />
			<InputSelect ref={ref} options={options} loading={false} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectGender.displayName = 'InputSelectGender';
InputSelectGender.defaultProps = {
	name: 'gender'
};
