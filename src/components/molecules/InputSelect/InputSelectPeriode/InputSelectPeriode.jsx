import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectPeriode = forwardRef(
	({ containerClassName, error, onChange, placeholder, showLabel, disabled, ...props }, ref) => {
		const [options, setOptions] = useState([]);

		useEffect(() => {
			const date = new Date();
			const limitBawahPeriode = 15;
			const limitAtasPeriode = 10;
			const periode = [];

			let year = date.getFullYear();
			let limitBawahYear = year - limitBawahPeriode;
			let limitAtasYear = year + limitAtasPeriode;

			for (let i = year; i < limitAtasYear; limitAtasYear--) {
				periode.push({ label: limitAtasYear.toString(), value: limitAtasYear });
			}

			for (let i = limitBawahYear; i <= year; year--) {
				periode.push({ label: year.toString(), value: year });
			}

			setOptions(periode);
		}, []);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Periode" name={props.name} />}
				<InputSelect
					ref={ref}
					placeholder="Pilih Periode"
					options={options}
					onChange={onChange}
					disabled={disabled}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectPeriode.displayName = 'InputSelectPeriode';
InputSelectPeriode.defaultProps = {
	containerClassName: '',
	showLabel: true
};
