import { InputError, InputLabel, InputSelectAsync } from '@/components/atoms';
import { useKonstituenStore } from '@/store';
import React, { useState, forwardRef, useEffect } from 'react';

export const InputSelectInstitusiAsync = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, label, value, ...props }, ref) => {
		const { konstituen, konstituenList, fetchingKonstituenList } = useKonstituenStore();
		const { getKonstituenList, getKonstituen, clearKonstituenList, clearKonstituen } = useKonstituenStore();

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
			console.log({ value, konstituen, konstituenList });
			if (konstituenList?.total > 0) {
				const mapKonstituen = konstituenList.items.map((konstituen) => ({
					label: konstituen.name,
					value: konstituen.id
				}));
				const newOptions = options.filter(
					(option) => !mapKonstituen.find((konstituen) => konstituen.value === option.value)
				);
				setOptions([...mapKonstituen, ...newOptions]);
			} else if (value && !konstituenList && !konstituen) {
				getKonstituen(value);
			} else if (value && konstituen) {
				setOptions([{ label: konstituen.name, value: konstituen.id }]);
			}
		}, [value, konstituenList, konstituen]);

		useEffect(() => {
			return () => {
				clearKonstituenList();
				clearKonstituen();
				setOptions([]);
			};
		}, []);

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
					value={value}
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
