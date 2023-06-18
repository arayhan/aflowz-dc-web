import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { TIMELINE_STATUS_ARRAY } from '@/utils/constants';
import React, { forwardRef } from 'react';

export const InputSelectTimelineStatus = forwardRef(({ error, onChange, ...props }, ref) => {
	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Status" name={props.name} />
			<InputSelect ref={ref} options={TIMELINE_STATUS_ARRAY} loading={false} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectTimelineStatus.displayName = 'InputSelectTimelineStatus';
InputSelectTimelineStatus.defaultProps = {
	name: 'konstituen_type'
};
