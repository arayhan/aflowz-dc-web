import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useStockiestStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectProductCategory = forwardRef(
	({ containerClassName, error, onChange, placeholder, showLabel, ...props }, ref) => {
		const { productCategoryList, fetchingProductCategoryList, getProductCategoryList } = useStockiestStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			getProductCategoryList();
		}, []);

		useEffect(() => {
			if (productCategoryList?.total > 0) {
				const mapCategory = productCategoryList.items.map((category) => ({
					label: category.name,
					value: category.id
				}));

				setOptions(mapCategory);
			}
		}, [productCategoryList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Kategori Barang" name={props.name} />}
				<InputSelect
					ref={ref}
					options={options}
					placeholder="Pilih Kategori"
					loading={fetchingProductCategoryList}
					onChange={onChange}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectProductCategory.displayName = 'InputSelectProductCategory';
InputSelectProductCategory.defaultProps = {
	containerClassName: '',
	name: 'stockiest',
	showLabel: true
};
