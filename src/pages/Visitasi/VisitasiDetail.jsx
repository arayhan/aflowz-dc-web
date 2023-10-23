import { ButtonAction, Card } from '@/components/atoms';
import { BannerFeature, TableVisitasiPromise } from '@/components/molecules';
import { useVisitasiStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const VisitasiDetail = () => {
	const { visitasiID } = useParams();

	const { visitasiItem, fetchingVisitasiItem } = useVisitasiStore();
	const { getVisitasiItem } = useVisitasiStore();

	const [tableVisitasiPromiseListParams, setTableVisitasiPromiseListParams] = useState({ visitasi_id: visitasiID });

	useEffect(() => {
		if (visitasiID) getVisitasiItem(visitasiID);
	}, [visitasiID]);

	return (
		<div>
			<BannerFeature
				title={visitasiItem ? `Visitasi : ${visitasiItem.name}` : 'Detail Visitasi'}
				backButtonLinkTo="/visitasi"
				loading={fetchingVisitasiItem}
			/>

			<section className="py-12 bg-gray-100 md:py-20">
				<div className="container">
					{fetchingVisitasiItem && <VisitasiDetailSkeleton />}
					{!fetchingVisitasiItem && visitasiItem && (
						<div className="space-y-6">
							<Card
								title={'Details'}
								className={'bg-white rounded-md'}
								linkRoute={`/visitasi/update/${visitasiItem?.id}`}
								isInDetail
							>
								<div className="grid grid-cols-12 p-5 text-sm gap-y-1">
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Nama Mahasiswa
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{visitasiItem?.name}</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Tanggal Visitasi
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{visitasiItem?.date ? moment(visitasiItem?.date).format('DD MMMM YYYY') : '-'}
									</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Institusi
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!visitasiItem?.konstituen?.name && '-'}
										{visitasiItem?.konstituen?.name && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/institusi/${visitasiItem?.konstituen.id}`}
												text={visitasiItem?.konstituen.name}
											/>
										)}
									</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Nomor Handphone
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{visitasiItem?.phone}</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Program
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!visitasiItem?.program?.name && '-'}
										{visitasiItem?.program?.name && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/program/${visitasiItem?.program.id}`}
												text={visitasiItem?.program.name}
											/>
										)}
									</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Alamat Tinggal
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{visitasiItem?.address}</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Kota
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!visitasiItem?.city?.name && '-'}
										{visitasiItem?.city?.name && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/dapil/city/${visitasiItem?.city.id}`}
												text={visitasiItem?.city.name}
											/>
										)}
									</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Kecamatan
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!visitasiItem?.district?.name && '-'}
										{visitasiItem?.district?.name && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/district/${visitasiItem?.district.id}`}
												text={visitasiItem?.district.name}
											/>
										)}
									</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Desa / Kelurahan
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!visitasiItem?.village?.name && '-'}
										{visitasiItem?.village?.name && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/dapil/village/${visitasiItem?.village.id}`}
												text={visitasiItem?.village.name}
											/>
										)}
									</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Nama Ayah
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{visitasiItem?.father_name || '-'}
									</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Nomor Handphone Ayah
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{visitasiItem?.father_phone || '-'}
									</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Nama Ibu
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{visitasiItem?.mother_name || '-'}
									</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Nomor Handphone Ibu
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{visitasiItem?.mother_phone || '-'}
									</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Asal Daerah
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{visitasiItem?.origin}</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Berpotensi menjadi tim pemenangan Ibu Hj. Dewi Coryati M.Si?
									</div>
									<div className="col-span-8 px-3 py-2 font-bold lg:col-span-9 bg-gray-50">
										{visitasiItem?.is_potential ? (
											<span className="text-green-500">Ya, berpotensi</span>
										) : (
											<span className="text-red-500">Tidak berpotensi</span>
										)}
									</div>
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Catatan
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{visitasiItem?.note}</div>
								</div>
							</Card>

							<div className="flex flex-col items-center justify-center">
								<div className="px-8 py-6 mb-2 bg-white rounded-md shadow-lg md:px-10">
									<div className="flex flex-col items-center justify-center space-y-1 text-center">
										<span className="text-2xl md:text-4xl font-extralight">{visitasiItem?.total_visitasi || 0}</span>
										<div className="font-light text-gray-400">Total Visitasi </div>
									</div>
								</div>
							</div>

							<div className="grid w-full grid-cols-12 gap-4">
								<div className="col-span-12 bg-white rounded-md shadow-lg">
									<TableVisitasiPromise
										visitasiID={visitasiID}
										params={tableVisitasiPromiseListParams}
										setParams={setTableVisitasiPromiseListParams}
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

const VisitasiDetailSkeleton = () => (
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

export default VisitasiDetail;
