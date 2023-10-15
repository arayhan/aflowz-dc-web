import { Card } from '@/components/atoms';
import { BannerFeature, CardDetailTotal } from '@/components/molecules';
import { useTPSStore } from '@/store';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const TPSDetail = () => {
	const params = useParams();
	const TPSID = params.TPSID;

	const { TPSItem, getTPSItem, fetchingTPSItem } = useTPSStore();

	useEffect(() => {
		getTPSItem(TPSID);
	}, [params]);

	return (
		<div>
			<BannerFeature title={TPSItem ? `Detail ${TPSItem.name}` : 'TPS'} loading={fetchingTPSItem} />

			<section className="py-12 bg-gray-100 md:py-12">
				<div className="container">
					{fetchingTPSItem && <TPSDetailSkeleton />}
					{!fetchingTPSItem && TPSItem && (
						<div className="space-y-6">
							<Card
								title={`${TPSItem.name} - ${TPSItem.village.name}`}
								description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
								className={'bg-white rounded-md'}
								linkRoute={`/tps/update/${TPSItem?.id}`}
								isInDetail
							>
								<div className="grid grid-cols-12 p-5 text-sm gap-y-1">
									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Nomor TPS</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{TPSItem?.name || '-'}</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Nama Desa</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{TPSItem?.village?.name || '-'}</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Koordinator Desa</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">-</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Kontak</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{TPSItem?.contact || '-'}</div>
								</div>
							</Card>

							<div className="grid items-start justify-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
								<CardDetailTotal title={'Jumlah DPT'} value={0} linkTo={`/dpt?tps_id=${TPSID}`} />
								<CardDetailTotal title={'Jumlah Target Suara'} value={0} linkTo={`/dpt?tps_id=${TPSID}`} />
								<CardDetailTotal title={'Jumlah Potensi Pemilih'} value={0} linkTo={`/dpt?tps_id=${TPSID}`} />
								<CardDetailTotal title={'Perolehan Suara DC 2019'} value={0} linkTo={`/dpt?tps_id=${TPSID}`} />
								<CardDetailTotal title={'Perolehan Suara PAN 2019'} value={0} linkTo={`/dpt?tps_id=${TPSID}`} />
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const TPSDetailSkeleton = () => (
	<div className="grid grid-cols-12 gap-6">
		{[1, 2, 3].map((item) => (
			<div key={item} className="col-span-12 p-4 bg-white rounded-md md:col-span-4">
				<div className="flex flex-col space-y-3">
					<Skeleton width={200} height={20} />
					<hr />
					<div className="flex items-center justify-center">
						<Skeleton className="w-48 h-48 rounded-full md:w-52 md:h-52" />
					</div>
				</div>
			</div>
		))}
		<div className="col-span-12 p-5 bg-white rounded-md md:p-8">
			<div className="grid grid-cols-12 gap-x-4 gap-y-2">
				<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
				<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
				<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
				<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
				<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
				<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
			</div>
		</div>
	</div>
);

export default TPSDetail;
