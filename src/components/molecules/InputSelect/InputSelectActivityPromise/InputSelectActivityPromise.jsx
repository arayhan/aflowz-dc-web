import { InputError, InputLabel, InputSelectCreatable } from '@/components/atoms';
import { useActivityStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectActivityPromise = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, disabled, showLabel, ...props }, ref) => {
		const { activityPromiseList, fetchingActivityPromiseList, getActivityPromiseList } = useActivityStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			if (params) getActivityPromiseList({ limit: 10, offset: 0, ...params });
			else getActivityPromiseList();
		}, [params]);

		useEffect(() => {
			if (activityPromiseList?.total > 0) {
				const mapPromise = activityPromiseList.items.map((promise) => ({
					label: promise.name,
					value: promise.name
				}));
				setOptions(mapPromise);
			}
		}, [activityPromiseList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Janji" name={props.name} />}
				<InputSelectCreatable
					ref={ref}
					options={options}
					loading={fetchingActivityPromiseList}
					disabled={disabled || fetchingActivityPromiseList}
					placeholder={placeholder || 'Pilih Janji'}
					onChange={onChange}
					multi={true}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectActivityPromise.displayName = 'InputSelectActivityPromise';
InputSelectActivityPromise.defaultProps = {
	name: 'promise',
	containerClassName: '',
	showLabel: true,
	showPeriodeOnLabel: false,
	multiple: false
};
