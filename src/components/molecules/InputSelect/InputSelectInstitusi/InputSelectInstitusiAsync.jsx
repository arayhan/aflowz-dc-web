import { InputError, InputLabel, InputSelectAsync } from '@/components/atoms';
import { useKonstituenStore } from '@/store';
import React, { useState, forwardRef, useEffect } from 'react';

export const InputSelectInstitusiAsync = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, label, ...props }, ref) => {
		const { konstituenList, fetchingKonstituenList, getKonstituenList } = useKonstituenStore();

		const [options, setOptions] = useState([]);

		const handleLoadOptions = async (search, prevOptions) => {
			const { success, payload } = await getKonstituenList({
				limit: 10,
				offset: prevOptions.length,
				...(search && { keyword: search }),
				...params
			});

			const mapKonstituen = success
				? payload.items.map((konstituen) => ({
						label: konstituen.name,
						value: konstituen.id
				  }))
				: [];

			return {
				options: mapKonstituen,
				hasMore: prevOptions.length + mapKonstituen.length < payload.total
			};
		};

		useEffect(() => {
			if (konstituenList?.total > 0) {
				const mapKonstituen = konstituenList.items.map((konstituen) => ({
					label: konstituen.name,
					value: konstituen.id
				}));
				const newOptions = options.filter(
					(option) => !mapKonstituen.find((konstituen) => konstituen.value === option.value)
				);
				setOptions([...mapKonstituen, ...newOptions]);
			}
		}, [konstituenList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text={label || 'Pilih Institusi'} name={props.name} />}
				<InputSelectAsync
					innerRef={ref}
					options={options}
					loadOptions={handleLoadOptions}
					onChange={onChange}
					loading={fetchingKonstituenList}
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
