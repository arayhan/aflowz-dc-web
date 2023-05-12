import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useStockiestStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectWarehouse = forwardRef(
	({ containerClassName, error, onChange, label, placeholder, showLabel, ...props }, ref) => {
		const { warehouseList, fetchingWarehouseList, getWarehouseList } = useStockiestStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			const defaultParams = { limit: 0, offset: 0 };
			getWarehouseList(defaultParams);
		}, []);

		useEffect(() => {
			if (warehouseList?.total > 0) {
				const mapWarehouse = warehouseList.items.map((warehouse) => ({
					label: warehouse.name,
					value: warehouse
				}));

				setOptions(mapWarehouse);
			}
		}, [warehouseList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text={label || 'Pilih Gudang'} name={props.name} />}
				<InputSelect
					ref={ref}
					options={options}
					placeholder={placeholder || 'Pilih Gudang'}
					loading={fetchingWarehouseList}
					onChange={onChange}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectWarehouse.displayName = 'InputSelectWarehouse';
InputSelectWarehouse.defaultProps = {
	containerClassName: '',
	name: 'warehouse',
	showLabel: true
};
