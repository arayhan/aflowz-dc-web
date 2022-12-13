import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useStockiestStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectProduct = forwardRef(
	({ containerClassName, error, onChange, placeholder, showLabel, ...props }, ref) => {
		const { productList, fetchingProductList, getProductList } = useStockiestStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			const defaultParams = { limit: 0, offset: 0 };
			getProductList(defaultParams);
		}, []);

		useEffect(() => {
			if (productList?.total > 0) {
				const mapProduct = productList.items.map((product) => ({
					label: product.sku_code + ' - ' + product.name,
					value: product
				}));

				setOptions(mapProduct);
			}
		}, [productList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Barang" name={props.name} />}
				<InputSelect
					ref={ref}
					options={options}
					placeholder="Pilih Barang"
					loading={fetchingProductList}
					onChange={onChange}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectProduct.displayName = 'InputSelectProduct';
InputSelectProduct.defaultProps = {
	containerClassName: '',
	name: 'product',
	showLabel: true
};
