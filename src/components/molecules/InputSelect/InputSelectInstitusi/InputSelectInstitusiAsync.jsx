import { InputError, InputLabel, InputSelectAsync } from '@/components/atoms';
import { useKonstituenStore } from '@/store';
import React, { useState, forwardRef, useEffect } from 'react';

export const InputSelectInstitusiAsync = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, ...props }, ref) => {
		const { konstituenList, getKonstituenList } = useKonstituenStore();

		const [options, setOptions] = useState([]);

		const handleLoadOptions = (search, callback) => {
			getKonstituenList({ limit: 10, offset: 0, ...(search && { keyword: search }), ...params }, ({ payload }) => {
				const mapKonstituen = payload.items.map((konstituen) => ({
					label: konstituen.name,
					value: konstituen.id
				}));

				callback(mapKonstituen);
			});
		};

		useEffect(() => {
			if (konstituenList?.total > 0) {
				const mapKonstituen = konstituenList.items.map((konstituen) => ({
					label: konstituen.name,
					value: konstituen.id
				}));
				setOptions(mapKonstituen);
			}
		}, [konstituenList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Institusi" name={props.name} />}
				<InputSelectAsync
					innerRef={ref}
					options={options}
					loadOptions={handleLoadOptions}
					onChange={onChange}
					placeholder={placeholder || 'Pilih Institusi'}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectInstitusiAsync.displayName = 'InputSelectInstitusiAsync';
InputSelectInstitusiAsync.defaultProps = {
	name: 'institusi',
	containerClassName: '',
	showLabel: true
};
