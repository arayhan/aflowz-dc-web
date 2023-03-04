import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { INSTITUSI_TYPE_ARRAY } from '@/utils/constants';
import React, { forwardRef } from 'react';

export const InputSelectInstitusiType = forwardRef(({ error, onChange, ...props }, ref) => {
	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Tipe Institusi" name={props.name} />
			<InputSelect ref={ref} options={INSTITUSI_TYPE_ARRAY} loading={false} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectInstitusiType.displayName = 'InputSelectInstitusiType';
InputSelectInstitusiType.defaultProps = {
	name: 'konstituen_type'
};
