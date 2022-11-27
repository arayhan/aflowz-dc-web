import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectPeriode = forwardRef(({ error, value, disabled, onChange, ...props }, ref) => {
	const [options, setOptions] = useState([]);

	useEffect(() => {
		const date = new Date();
		const limitPeriode = 15;
		const periode = [];

		let year = date.getFullYear();
		let limitYear = year - limitPeriode;

		while (year >= limitYear) {
			periode.push({ label: year, value: year });
			year = year - 1;
		}

		setOptions(periode);
	}, []);

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Periode" name={props.name} />
			<InputSelect
				ref={ref}
				value={value ? Number(value) : value}
				options={options}
				onChange={onChange}
				disabled={disabled}
				{...props}
			/>
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectPeriode.displayName = 'InputSelectPeriode';
