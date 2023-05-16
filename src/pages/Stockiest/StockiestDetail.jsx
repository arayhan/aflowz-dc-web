import { useParams } from 'react-router-dom';
import { useAuthStore, useStockiestStore } from '@/store';
import { BannerFeature } from '@/components/molecules';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Button, ButtonAction, InputTextInfo } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { TableStockiestMovementLog } from '@/components/molecules/index';

const StockiestDetail = () => {
	const { isSystem, isAdmin } = useAuthStore();
	const params = useParams();
	const { product, fetchingProduct, getProduct } = useStockiestStore();

	useEffect(() => {
		getProduct(params.stockiestID);
	}, [params]);

	return (
		<div>
			<BannerFeature
				title={product ? `${product?.sku_code} - ${product.name}` : 'Detail Barang'}
				loading={fetchingProduct}
				backButtonLinkTo={'/stockiest'}
				backButtonText="Kembali ke Daftar Barang"
			/>
			<section className="py-12 bg-gray-100 md:py-12">
				<div className="container">
					{fetchingProduct && <StockiestDetailSkeleton />}
					{!fetchingProduct && product && (
						<div className="space-y-6">
							<div className="col-span-12 p-5 bg-gray-100">
								<div className="bg-white rounded-md shadow-lg">
									<div className="flex flex-col items-start justify-between gap-4 p-4 md:flex-row md:items-center">
										<div className="w-full space-y-2">
											<div className="text-xl font-light capitalize tranform:">Detail {product?.name}</div>
											{/* <div className="text-sm text-gray-400">
												Lorem ipsum dolor sit amet, consectetur adipisicing elit.
											</div> */}
										</div>
										<div className="flex flex-col items-center justify-end w-full gap-4 md:flex-row">
											<ButtonAction
												action={ACTION_TYPES.UPDATE}
												linkTo={`/stockiest/update/${params.stockiestID}`}
												className={'w-full md:w-auto text-base px-5 py-3 rounded-md'}
												text="Update"
											/>
										</div>
									</div>
									<hr />
									<div className="flex-col p-5 my-2 rounded-md">
										<div className="overflow-x-auto">
											<div className="flex justify-center w-full">
												<img
													src={product?.image_url ? product?.image_url : require('@/images/dummy-product.webp')}
													className="w-52"
												/>
											</div>
											<div className="grid w-full grid-cols-12 text-sm gap-y-1">
												<InputTextInfo tag={'Kode Unik Barang'} value={product?.sku_code || 'Belum Tercantum'} />
												<InputTextInfo tag={'Nama Barang'} value={product?.name || 'Belum Tercantum'} />
												<InputTextInfo tag={'Deskripsi Barang'} value={product?.description || 'Belum Mencantumkan'} />
												<InputTextInfo tag={'Kategori Barang'} value={product?.category.name || 'Belum Mencantumkan'} />
												<InputTextInfo tag={'Jumlah Tersedia'} value={product?.quantity || 'Belum Mencantumkan'} />
												{product?.quantity_stock_locations?.map((location) => (
													<InputTextInfo
														key={location.location_id}
														tag={`Gudang ${location?.location_name}`}
														value={location?.quantity || 'Belum Mencantumkan'}
													/>
												))}
											</div>
										</div>
									</div>
								</div>
								<div className="grid grid-cols-1 gap-5">
									<div className="p-2 my-5 overflow-x-auto overflow-y-auto bg-white rounded-md shadow-lg">
										<TableStockiestMovementLog params={params.stockiestID} isShowFooter isReadonly={true} />
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const StockiestDetailSkeleton = () => {
	return (
		<div className="p-5 space-y-6 bg-white rounded-md">
			<div className="col-span-12">
				<Skeleton height={250} />
			</div>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-12 md:col-span-6">
					<Skeleton height={300} />
				</div>
				<div className="col-span-12 md:col-span-6">
					<Skeleton height={300} />
				</div>
				<div className="col-span-12">
					<Skeleton height={250} />
				</div>
			</div>
		</div>
	);
};

export default StockiestDetail;
