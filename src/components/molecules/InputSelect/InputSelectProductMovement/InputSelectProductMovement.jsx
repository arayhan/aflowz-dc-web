import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import React, { forwardRef } from 'react';

export const InputSelectProductMovement = forwardRef(({ error, onChange, isForm, ...props }, ref) => {
	const options = [
		{ label: `${isForm ? 'Menambah Stock (Check-in)' : 'Produk Masuk'}`, value: 'in' },
		{ label: `${isForm ? 'Mengambil Stock (Check-out)' : 'Produk Keluar'}`, value: 'out' }
	];

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Metode" name={props.name} />
			<InputSelect ref={ref} options={options} loading={false} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectProductMovement.displayName = 'InputSelectProductMovement';
InputSelectProductMovement.defaultProps = {
	name: 'move_log'
};
