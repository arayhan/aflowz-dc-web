import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { PRODUCT_MOVEMENT_TYPE } from '@/utils/constants';
import React, { forwardRef } from 'react';

export const InputSelectProductMovement = forwardRef(({ error, onChange, isForm, ...props }, ref) => {
	const options = [
		{ label: `${isForm ? 'Menambah Stock (Check-in)' : 'Produk Masuk'}`, value: PRODUCT_MOVEMENT_TYPE.IN },
		{ label: `${isForm ? 'Mengambil Stock (Check-out)' : 'Produk Keluar'}`, value: PRODUCT_MOVEMENT_TYPE.OUT },
		{ label: `${isForm ? 'Pengembalian (Return)' : 'Pengembalian'}`, value: PRODUCT_MOVEMENT_TYPE.RETURN },
		{
			label: `${isForm ? 'Koreksi data masuk (Correction In)' : 'Koreksi Data Masuk'}`,
			value: PRODUCT_MOVEMENT_TYPE.CORRECTION_IN
		},
		{
			label: `${isForm ? 'Koreksi data keluar (Correction Out)' : 'Koreksi Data Keluar'}`,
			value: PRODUCT_MOVEMENT_TYPE.CORRECTION_OUT
		}
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
