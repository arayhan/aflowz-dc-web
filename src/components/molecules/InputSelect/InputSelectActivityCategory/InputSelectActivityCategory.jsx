import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useActivityStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectActivityCategory = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, ...props }, ref) => {
		const { activityCategory, fetchingActivityCategory, getActivityCategory } = useActivityStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			if (params) getActivityCategory({ limit: 10, offset: 0, ...params });
			else getActivityCategory();
		}, [params]);

		useEffect(() => {
			if (activityCategory?.total > 0) {
				const mapActivityCategory = activityCategory.items.map((activityCategory) => ({
					label: activityCategory.name,
					value: activityCategory.id
				}));
				setOptions(mapActivityCategory);
			}
		}, [activityCategory]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Kategori Kegiatan" name={props.name} />}
				<InputSelect
					ref={ref}
					options={options}
					loading={fetchingActivityCategory}
					placeholder={placeholder || 'Pilih Kategori Kegiatan'}
					onChange={onChange}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectActivityCategory.displayName = 'InputSelectActivityCategory';
InputSelectActivityCategory.defaultProps = {
	name: 'promise',
	containerClassName: '',
	showLabel: true,
	showPeriodeOnLabel: false,
	multiple: false
};
