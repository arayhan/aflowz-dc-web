import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import React, { forwardRef } from 'react';

export const InputSelectReligion = forwardRef(({ error, onChange, ...props }, ref) => {
	const options = [
		{ label: 'Islam', value: 'Islam' },
		{ label: 'Kristen Protestan', value: 'Kristen Protestan' },
		{ label: 'Kristen Katolik', value: 'Kristen Katolik' },
		{ label: 'Hindu', value: 'Hindu' },
		{ label: 'Buddha', value: 'Buddha' },
		{ label: 'Kong Hu Cu', value: 'Kon Hu Cu' }
	];

	return (
		<div className="space-y-1">
			<InputLabel text="Agama" name={props.name} />
			<InputSelect ref={ref} options={options} loading={false} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectReligion.displayName = 'InputSelectReligion';
InputSelectReligion.defaultProps = {
	name: 'religion'
};
