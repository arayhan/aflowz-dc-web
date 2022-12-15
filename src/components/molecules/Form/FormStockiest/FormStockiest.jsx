import { Button, InputText } from '@/components/atoms';
import { useStockiestStore, useAuthStore } from '@/store';
import { formProductSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { InputSelectProductCategory } from '../../index';
import { MdAddAPhoto } from 'react-icons/md';

export const FormStockiest = () => {
	const { stockiestID } = useParams();
	const { isAdmin, isSystem } = useAuthStore();
	const navigate = useNavigate();

	const {
		product,
		fetchingProduct,
		processingCreateProduct,
		processingUpdateProduct,
		getProduct,
		createProduct,
		updateProduct,
		clearStateProduct,
		updatePicture
	} = useStockiestStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formProductSchema),
		defaultValues: {
			name: '',
			sku_code: '',
			product_category_id: undefined,
			description: '',
			quantity: ''
		}
	});

	const onSubmitProduct = (values) => {
		if (stockiestID) {
			updateProduct(stockiestID, values, ({ success }) => {
				if (success) navigate(`/stockiest/${stockiestID}`);
			});
		} else {
			createProduct(values, ({ payload, success }) => {
				if (success) navigate(`/stockiest/${payload.id}`);
			});
		}
	};

	useEffect(() => {
		if (stockiestID) getProduct(stockiestID);
	}, [stockiestID]);

	useEffect(() => {
		if (stockiestID && product) {
			setValue('name', product?.name || '');
			setValue('sku_code', product?.sku_code || '');
			setValue('product_category_id', product?.category?.id || null);
			setValue('description', product?.description || '');
			setValue('quantity', product?.quantity || 0);
		}
	}, [stockiestID, product]);

	useEffect(() => () => clearStateProduct(), []);

	const [editPicture, setEditPicture] = useState('');
	const [getFileSize, setGetFileSize] = useState('');
	const [showError, setShowError] = useState('');
	const [showButton, setShowButton] = useState(false);
	const fileRef = useRef();

	const uploadImage = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
		setEditPicture(base64);
	};

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const handleSavePicture = () => {
		if (product) {
			if (getFileSize.size < 524288) {
				let split = editPicture.split(',');
				updatePicture(stockiestID, { picture: split[1] }, ({ success }) => {
					if (success) {
						setShowButton(false);
					}
				});
			} else {
				setShowError(true);
				setTimeout(() => {
					setShowError(false);
					setShowButton(false);
					setEditPicture('');
				}, 1000);
			}
		}
	};

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{stockiestID ? 'Edit' : 'Tambah'} Barang</div>
				{/* <div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div> */}
			</div>
			<hr />
			{stockiestID && product && (
				<>
					<div className="w-full flex justify-center">
						{product?.image_url || editPicture !== '' ? (
							<img src={editPicture ? editPicture : product?.image_url} className="w-52" />
						) : (
							<img src={editPicture ? editPicture : require('@/images/dummy-product.webp')} className="w-52" />
						)}
					</div>
					<div className="w-full flex justify-center">
						{showError && <p className="w-full flex justify-center mb-5 text-red-500">Max. Photo Size 500kb</p>}
						{(isAdmin || isSystem) && editPicture !== '' && showButton ? (
							<div className="w-52 flex justify-center mb-5 mt-2">
								<div className="w-52 flex justify-evenly">
									<Button variant={'success'} type="button" onClick={handleSavePicture} className="px-5 py-2">
										Save
									</Button>
									<Button
										type="button"
										variant={'danger'}
										className="px-3 py-2"
										onClick={() => {
											setEditPicture('');
											setShowButton(false);
										}}
									>
										Cancel
									</Button>
								</div>
							</div>
						) : (
							<div className="w-52 flex justify-center mb-5 mt-2">
								<Button
									type="button"
									onClick={() => fileRef.current.click()}
									variant={'primary'}
									className="p-4 rounded-full"
								>
									<MdAddAPhoto />
									<input
										type="file"
										onChange={(e) => {
											setGetFileSize(e.target.files[0]);
											uploadImage(e);
											setShowButton(true);
										}}
										ref={fileRef}
										hidden
									/>
								</Button>
							</div>
						)}
					</div>
				</>
			)}
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama Barang"
							placeholder="Nama Barang"
							disabled={processingCreateProduct || processingUpdateProduct || fetchingProduct}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'sku_code'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="SKU Barang"
							placeholder="SKU Barang"
							disabled={processingCreateProduct || processingUpdateProduct || fetchingProduct}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'product_category_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectProductCategory
							{...field}
							disabled={processingCreateProduct || processingUpdateProduct || fetchingProduct}
							onChange={({ value }) => {
								setValue('product_category_id', value);
								setError('product_category_id', null);
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
							label="Deskripsi Barang"
							placeholder="Deskripsi Barang"
							disabled={processingCreateProduct || processingUpdateProduct || fetchingProduct}
							error={error}
						/>
					)}
				/>

				{!stockiestID && (
					<Controller
						name={'quantity'}
						control={control}
						render={({ field, fieldState: { error } }) => (
							<InputText
								{...field}
								label="Jumlah Barang"
								placeholder="Jumlah Barang"
								type="number"
								disabled={processingCreateProduct || processingUpdateProduct || fetchingProduct}
								error={error}
							/>
						)}
					/>
				)}
			</div>
			<hr />
			<div className="flex justify-end">
				<Button
					className={'px-7 py-3 rounded-sm mx-2'}
					variant="warning"
					disabled={processingCreateProduct || processingUpdateProduct || fetchingProduct}
					linkTo={stockiestID ? `/stockiest/${stockiestID}` : '/stockiest'}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateProduct || processingUpdateProduct || fetchingProduct}
					onClick={handleSubmit(onSubmitProduct)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
