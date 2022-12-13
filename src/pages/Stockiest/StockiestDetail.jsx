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
			<section className="bg-gray-100 py-12 md:py-12">
				<div className="container">
					{fetchingProduct && <StockiestDetailSkeleton />}
					{!fetchingProduct && product && (
						<div className="space-y-6">
							<div className="col-span-12 bg-gray-100 p-5">
								<div className="bg-white shadow-lg rounded-md">
									<div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
										<div className="w-full space-y-2">
											<div className="font-light text-xl tranform: capitalize">Detail {product?.name}</div>
											<div className="text-sm text-gray-400">
												Lorem ipsum dolor sit amet, consectetur adipisicing elit.
											</div>
										</div>
										<div className="w-full flex flex-col md:flex-row items-center justify-end gap-4">
											<ButtonAction
												action={ACTION_TYPES.UPDATE}
												linkTo={`/stockiest/update/${params.stockiestID}`}
												className={'w-full md:w-auto text-base px-5 py-3 rounded-md'}
												text="Update"
											/>
										</div>
									</div>
									<hr />
									<div className="p-5 rounded-md my-2 flex-col">
										<div className="overflow-x-auto">
											<div className="w-full flex justify-center">
												<img
													src={product?.image_url ? product?.image_url : require('@/images/dummy-product.webp')}
													className="w-52"
												/>
											</div>
											<div className="grid grid-cols-12 w-full gap-y-1 text-sm">
												<InputTextInfo tag={'Kode Unik Barang'} value={product?.sku_code || 'Belum Tercantum'} />
												<InputTextInfo tag={'Nama Barang'} value={product?.name || 'Belum Tercantum'} />
												<InputTextInfo tag={'Deskripsi Barang'} value={product?.description || 'Belum Mencantumkan'} />
												<InputTextInfo tag={'Kategori Barang'} value={product?.category.name || 'Belum Mencantumkan'} />
												<InputTextInfo tag={'Jumlah Tersedia'} value={product?.quantity || 'Belum Mencantumkan'} />
											</div>
										</div>
									</div>
								</div>
								<div className="grid grid-cols-1 gap-5">
									<div className="my-5 p-2 bg-white rounded-md shadow-lg overflow-x-auto overflow-y-auto">
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
		<div className="space-y-6 bg-white rounded-md p-5">
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
