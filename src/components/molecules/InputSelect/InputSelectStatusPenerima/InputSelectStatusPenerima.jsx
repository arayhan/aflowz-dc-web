import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { STATUS_PENERIMA_TYPES_ARRAY } from '@/utils/constants';
import React, { forwardRef } from 'react';

export const InputSelectStatusPenerima = forwardRef(({ showLabel, placeholder, error, onChange, ...props }, ref) => {
	return (
		<div className="space-y-1">
			{showLabel && <InputLabel text="Pilih Tipe Institusi" name={props.name} />}
			<InputSelect
				ref={ref}
				options={STATUS_PENERIMA_TYPES_ARRAY}
				placeholder={placeholder || 'Pilih Status'}
				loading={false}
				onChange={onChange}
				{...props}
			/>
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectStatusPenerima.displayName = 'InputSelectStatusPenerima';
InputSelectStatusPenerima.defaultProps = {
	name: 'candidate_status',
	showLabel: true
};
