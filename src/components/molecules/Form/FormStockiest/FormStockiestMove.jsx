import { Button, Table, InputText } from '@/components/atoms';
import { useStockiestStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
	InputSelectCity,
	InputSelectDistrict,
	InputSelectInstitusi,
	InputSelectProduct,
	InputSelectProgram,
	InputSelectProvince,
	InputSelectVillage,
	InputSelectStaff,
	InputSelectProductMovement,
	InputSelectWarehouse
} from '../../index';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formProductMovementSchema } from '@/utils/validation-schema';

export const FormStockiestMove = () => {
	const [dataTable, setDataTable] = useState([]);
	const [product, setProduct] = useState(null);
	const [warehouse, setWarehouse] = useState(null);
	const [quantity, setQuantity] = useState('');
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [method, setMethod] = useState('');
	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				Cell: (row) => {
					return <div className="text-gray-400">{Number(row.row.id) + 1}</div>;
				}
			},
			{
				Header: 'Gambar Barang',
				minWidth: 125,
				Cell: (row) => (
					<div className="flex justify-center w-full">
						<img
							src={row.row.original?.image_url ? row.row.original?.image_url : require('@/images/dummy-product.webp')}
							className="w-24"
						/>
					</div>
				)
			},
			{
				Header: 'Kode Unik Barang',
				minWidth: 125,
				Cell: (row) => <div className="capitalize transform:">{row.row.original.sku_code}</div>
			},
			{
				Header: 'Nama Barang',
				minWidth: 125,
				Cell: (row) => <div className="capitalize transform:">{row.row.original.name}</div>
			},
			{
				Header: 'Gudang',
				minWidth: 125,
				Cell: (row) => <div className="capitalize transform:">{row.row.original?.warehouse?.name || '-'}</div>
			},
			{
				Header: 'Kode Gudang',
				minWidth: 125,
				Cell: (row) => <div className="capitalize transform:">{row.row.original?.warehouse?.code || '-'}</div>
			},
			{
				Header: 'Jumlah',
				minWidth: 150,
				Cell: (row) => <div className="capitalize transform:">{row.row.original.quantity}</div>
			},
			{
				Header: 'Hapus',
				minWidth: 150,
				Cell: (row) => {
					return (
						<button
							type="button"
							className="min-w-[100px] w-full bg-red-500 hover:bg-red-400 text-white px-3 py-2 rounded-sm text-xs"
							onClick={() => {
								onDelete(row.row.original);
							}}
						>
							Delete
						</button>
					);
				}
			}
		],
		[dataTable]
	);
	const { updateStockProduct, processingUpdateProduct } = useStockiestStore();
	const navigate = useNavigate();

	const onSubmitAttendance = (values) => {
		if (dataTable.length > 0) {
			updateStockProduct(values, dataTable, ({ success }) => {
				if (success) navigate(`/stockiest`);
			});
		} else {
			alert('Belum memasukkan barang');
		}
	};

	const onAdded = (prod, qty) => {
		if (method === 'out') {
			if (qty < prod.quantity) {
				let exist = dataTable.find((val) => val.id === prod.id);
				let data = {
					id: prod?.id,
					name: prod?.name,
					sku_code: prod?.sku_code,
					image_url: prod?.image_url,
					warehouse,
					quantity: qty
				};
				if (exist === undefined) {
					setDataTable([...dataTable, { ...data }]);
					reset();
				} else {
					reset('Barang sudah diterdaftar');
				}
			} else {
				reset('Barang tidak mencukupi');
			}
		} else if (method === 'in') {
			let exist = dataTable.find((val) => val.id === prod.id);
			let data = {
				id: prod?.id,
				name: prod?.name,
				sku_code: prod?.sku_code,
				warehouse,
				image_url: prod?.image_url,
				quantity: qty
			};
			if (exist === undefined) {
				setDataTable([...dataTable, { ...data }]);
				reset();
			} else {
				reset('Barang sudah diterdaftar');
			}
		} else {
			reset('Belum memilih metode');
		}
	};

	const reset = (message) => {
		setProduct(null);
		setWarehouse(null);
		setQuantity('');
		setErrorMessage(message);
		setShowError(true);
		setTimeout(() => {
			setShowError(false);
		}, 1000);
	};

	const onDelete = (val) => {
		let temp = [...dataTable];
		let index = temp.findIndex((value) => value.id === val.id);
		temp.splice(index, 1);
		setDataTable(temp);
	};

	const { watch, control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formProductMovementSchema),
		defaultValues: {
			province: undefined,
			city: undefined,
			district: undefined,
			village: undefined,
			konstituen: undefined,
			program: undefined,
			pic_staff_id: undefined,
			description: '',
			method: ''
		}
	});

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">Checkin / Checkout Barang</div>
				{/* <div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div> */}
			</div>
			<hr />
			<div>
				<Controller
					name={'method'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectProductMovement
							{...field}
							disabled={processingUpdateProduct}
							onChange={({ value }) => {
								setValue('method', value);
								setMethod(value);
								setError('method', null);
							}}
							error={error}
							isForm
						/>
					)}
				/>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'province'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectProvince
							{...field}
							disabled={processingUpdateProduct}
							onChange={({ value }) => {
								setValue('province', value);
								setValue('city', undefined);
								setValue('district', undefined);
								setValue('village', undefined);
								setError('province', null);
							}}
							error={error}
							countryID={100}
						/>
					)}
				/>
				<Controller
					name={'city'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectCity
							{...field}
							feature="Kota"
							disabled={processingUpdateProduct}
							onChange={({ value }) => {
								setValue('city', value);
								setValue('district', undefined);
								setValue('village', undefined);
								setError('city', null);
							}}
							error={error}
							params={
								watch('province')
									? { province_id: watch('province'), limit: 0, offset: 0 }
									: { province_id: 1000, limit: 0, offset: 0 }
							}
						/>
					)}
				/>

				<Controller
					name={'district'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectDistrict
							{...field}
							disabled={processingUpdateProduct}
							onChange={({ value }) => {
								setValue('district', value);
								setValue('village', undefined);
								setError('district', null);
							}}
							error={error}
							params={watch('city') ? { city_id: watch('city'), limit: 0, offset: 0 } : null}
						/>
					)}
				/>

				<Controller
					name={'village'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectVillage
							{...field}
							disabled={processingUpdateProduct}
							onChange={({ value }) => {
								setValue('village', value);
								setError('village', null);
							}}
							error={error}
							params={watch('district') ? { district_id: watch('district'), limit: 0, offset: 0 } : null}
						/>
					)}
				/>

				<Controller
					name={'program'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectProgram
							{...field}
							disabled={processingUpdateProduct}
							onChange={({ value }) => {
								setValue('program', value);
								setError('program', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'konstituen'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectInstitusi
							{...field}
							disabled={processingUpdateProduct}
							onChange={({ value }) => {
								setValue('konstituen', value);
								setError('konstituen', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'pic_staff_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectStaff
							{...field}
							disabled={processingUpdateProduct}
							onChange={({ value }) => {
								setValue('pic_staff_id', value);
								setError('pic_staff_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'description'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Deskripsi"
							placeholder="Deskripsi"
							disabled={processingUpdateProduct}
							error={error}
						/>
					)}
				/>
			</div>
			<hr />
			<div className="grid items-end grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-6">
				<div className="md:col-span-3">
					<InputSelectProduct
						disabled={processingUpdateProduct}
						value={product}
						onChange={({ value }) => {
							setProduct(value);
						}}
					/>
				</div>
				<div className="md:col-span-3">
					<InputSelectWarehouse
						disabled={processingUpdateProduct}
						value={warehouse}
						onChange={({ value }) => {
							setWarehouse(value);
						}}
					/>
				</div>
				<div className="md:col-span-3">
					<InputText
						disabled={true}
						label="Stok Tersedia"
						placeholder="Stok yang tersedia"
						value={product !== null ? product?.quantity : ''}
						type={'number'}
					/>
				</div>
				<div className="md:col-span-3">
					<InputText
						disabled={processingUpdateProduct}
						label="Jumlah Barang"
						placeholder={'Atur Jumlah Barang'}
						type={'number'}
						value={quantity}
						onChange={(e) => {
							setQuantity(e.target.value);
						}}
					/>
				</div>
				{showError && (
					<div className="md:col-span-2">
						<p className="text-red-500">{errorMessage}</p>
					</div>
				)}
				<div className="lg:col-end-7 lg:col-span-1">
					<Button
						className={'px-7 py-3 rounded-sm'}
						variant="primary"
						disabled={processingUpdateProduct}
						onClick={() => onAdded(product, Number(quantity))}
					>
						Tambah
					</Button>
				</div>
			</div>
			<hr />
			<div className="bg-white rounded-md shadow-md">
				<div className="overflow-x-auto">
					<Table columns={columns} data={dataTable} loading={null} />
				</div>
			</div>
			<hr />
			<div className="flex justify-end">
				<Button
					className={'px-7 py-3 rounded-sm mx-2'}
					variant="warning"
					disabled={processingUpdateProduct}
					linkTo={'/stockiest'}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingUpdateProduct}
					onClick={handleSubmit(onSubmitAttendance)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
