import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import React, { forwardRef } from 'react';

export const InputSelectKonstituen = forwardRef(({ error, onChange, ...props }, ref) => {
	const options = [
		{ label: 'Sekolah', value: 'sekolah' },
		{ label: 'Kampus', value: 'kampus' }
	];

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Tipe Konstituen" name={props.name} />
			<InputSelect ref={ref} options={options} loading={false} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectKonstituen.displayName = 'InputSelectKonstituen';
InputSelectKonstituen.defaultProps = {
	name: 'konstituen_type'
};
