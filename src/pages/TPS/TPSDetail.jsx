import { Card } from '@/components/atoms';
import {
	BannerFeature,
	CardDetailTotal,
	TableActivity,
	TableDetailRealCount,
	TableDetailRelawan,
	TableDetailSaksi,
	TablePenerima,
	TableStockiestMovementLog
} from '@/components/molecules';
import { useRealCountStore, useTPSStore } from '@/store';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const TPSDetail = () => {
	const params = useParams();
	const TPSID = params.TPSID;

	const { TPSItem, getTPSItem, fetchingTPSItem } = useTPSStore();
	const { realcountVillageDetail, getRealCountVillageDetail, fetchingRealCountVillageDetail } = useRealCountStore();

	const [tablePenerimaParams, setTablePenerimaParams] = useState({});

	const title = TPSItem ? `${TPSItem.name} - ${TPSItem.village.name}` : 'TPS';

	useEffect(() => {
		getTPSItem(TPSID);
	}, [params]);

	useEffect(() => {
		if (TPSItem) {
			getRealCountVillageDetail(TPSItem?.village?.id, { periode: TPSItem?.periode });
			setTablePenerimaParams({ village_id: TPSItem?.village?.id, is_receiver: true });
		}
	}, [TPSItem]);

	return (
		<div>
			<BannerFeature title={TPSItem ? `Detail ${TPSItem.name}` : 'TPS'} loading={fetchingTPSItem} />

			<section className="py-12 bg-gray-100 md:py-12">
				<div className="container">
					{fetchingTPSItem && <TPSDetailSkeleton />}
					{!fetchingTPSItem && TPSItem && (
						<div className="space-y-6">
							<Card title={title} className={'bg-white rounded-md'} linkRoute={`/tps/update/${TPSItem?.id}`} isInDetail>
								<div className="grid grid-cols-12 p-5 text-sm gap-y-1">
									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Nomor TPS</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{TPSItem?.name || '-'}</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Nama Desa</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{TPSItem?.village?.name || '-'}</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Koordinator Desa</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{TPSItem?.village?.pic_staff?.name || '-'}
									</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Kontak</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{TPSItem?.village?.pic_staff?.mobile || '-'}
									</div>
								</div>
							</Card>

							<div className="grid items-start justify-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
								<CardDetailTotal title={'Jumlah DPT'} value={TPSItem?.total_dpt || 0} linkTo={`/dpt?tps_id=${TPSID}`} />
								<CardDetailTotal title={'Jumlah Target Suara'} value={TPSItem?.total_target_voters || 0} />
								<CardDetailTotal title={'Jumlah Potensi Pemilih'} value={TPSItem?.total_potensi_suara || 0} />
								<CardDetailTotal
									title={`Perolehan Suara DC ${Number(TPSItem?.periode) - 5}`}
									value={TPSItem?.total_dc_voters || 0}
								/>
								<CardDetailTotal
									title={`Perolehan Suara PAN ${Number(TPSItem?.periode) - 5}`}
									value={TPSItem?.total_pan_voters || 0}
								/>
							</div>

							<div className="grid items-start grid-cols-12 gap-4">
								<div className="col-span-12">
									<Card title={'Informasi Real Count'} description={title} className={'bg-white rounded-md'}>
										<div className="flex p-4 overflow-scroll max-h-96">
											<TableDetailRealCount
												isLoading={fetchingRealCountVillageDetail}
												realcountData={realcountVillageDetail}
											/>
										</div>
									</Card>
								</div>

								<div className="col-span-12">
									<Card title={'List Saksi'} description={title} className={'bg-white rounded-md'}>
										<div className="flex p-4 overflow-scroll max-h-96">
											<TableDetailSaksi isLoading={fetchingRealCountVillageDetail} saksiData={TPSItem?.witnesses} />
										</div>
									</Card>
								</div>

								<div className="col-span-12 bg-white rounded-md">
									<TablePenerima
										title={`Penerima Program Desa ${TPSItem.village.name}`}
										displayedColumns={['#', 'Nama Penerima', 'NIK', 'Alamat']}
										isShowButtonSeeAll
										isShowFooter={false}
										isShowFilter={false}
										isReadonly
										params={tablePenerimaParams}
										enableClickRow
									/>
								</div>

								<div className="col-span-12">
									<Card title={'List Relawan'} description={title} className={'bg-white rounded-md'}>
										<div className="flex p-4 overflow-scroll max-h-96">
											<TableDetailRelawan
												isLoading={fetchingRealCountVillageDetail}
												relawanData={TPSItem?.volunteers}
											/>
										</div>
									</Card>
								</div>

								<div className="col-span-12 bg-white rounded-md">
									<TableStockiestMovementLog
										params={{ village_id: TPSItem.village.id }}
										isShowFooter
										isReadonly={true}
									/>
								</div>
								<div className="col-span-12 bg-white rounded-md">
									<TableActivity
										displayedColumns={[
											'#',
											'Nama Kegiatan',
											'Kategori Kegiatan',
											'Program Terkait',
											'Institusi Terkait',
											'Tanggal Kunjungan/Kegiatan',
											'PIC Tim Internal',
											'Partner yang Dikunjungi',
											'Kontak PIC'
										]}
										params={{ activity_village_id: TPSItem.village.id }}
									/>
								</div>
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
