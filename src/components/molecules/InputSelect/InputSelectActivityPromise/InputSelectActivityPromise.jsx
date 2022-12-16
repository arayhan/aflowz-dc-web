import { InputError, InputLabel, InputSelect, InputSelectCreatable } from '@/components/atoms';
import { useActivityStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectActivityPromise = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, showPeriodeOnLabel, ...props }, ref) => {
		const { promiseList, fetchingPromiseList, getPromiseList } = useActivityStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			if (params) getPromiseList({ limit: 10, offset: 0, ...params });
			else getPromiseList();
		}, [params]);

		useEffect(() => {
			if (promiseList?.total > 0) {
				const mapPromise = promiseList.items.map((promise) => ({
					label: showPeriodeOnLabel ? `${promise.name} - ${promise.periode}` : promise.name,
					value: promise.id
				}));
				setOptions(mapPromise);
			}
		}, [promiseList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Promise" name={props.name} />}
				<InputSelectCreatable
					ref={ref}
					options={options}
					loading={fetchingPromiseList}
					placeholder={placeholder || 'Pilih Promise'}
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
