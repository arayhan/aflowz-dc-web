import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useActivityStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectActivityDetail = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, ...props }, ref) => {
		const { activityDetailList, fetchingActivityDetailList, getActivityDetailList } = useActivityStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			if (params) getActivityDetailList({ limit: 10, offset: 0, ...params });
			else getActivityDetailList();
		}, [params]);

		useEffect(() => {
			if (activityDetailList?.total > 0) {
				const mapPromise = activityDetailList.items.map((promise) => ({
					label: promise.description,
					value: promise.id
				}));
				setOptions(mapPromise);
			}
		}, [activityDetailList]);

		console.log({ props });

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Detail Kegiatan" name={props.name} />}
				<InputSelect
					ref={ref}
					options={options}
					loading={fetchingActivityDetailList}
					placeholder={placeholder || 'Pilih Detail Kegiatan'}
					onChange={onChange}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectActivityDetail.displayName = 'InputSelectActivityDetail';
InputSelectActivityDetail.defaultProps = {
	name: 'promise',
	containerClassName: '',
	showLabel: true,
	showPeriodeOnLabel: false,
	multiple: false
};
