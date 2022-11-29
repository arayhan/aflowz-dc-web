import { Link, useParams } from 'react-router-dom';
import { useKonstituenStore } from '@/store';
import {
	BannerFeature,
	BarChartPenerimaKonstituenPerTahun,
	PieChartPenerimaKonstituenByGender,
	TablePenerimaKonstituenDetail
} from '@/components/molecules';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const KonstituenDetail = () => {
	const params = useParams();
	const {
		konstituenDetail,
		fetchingKonstituenDetail,
		getKonstituenDetail,
		fetchingPenerimaKonstituenDetail,
		penerimaKonstituenDetail,
		getPenerimaKonstituenDetail
	} = useKonstituenStore();
	const [konstituenType, setKonstituenType] = useState('');

	useEffect(() => {
		getKonstituenDetail(params.konstituenID);
		if (konstituenDetail) setKonstituenType(konstituenDetail.konstituen_type);
		getPenerimaKonstituenDetail({ konstituen_id: params.konstituenID });
	}, [params]);

	return (
		<div>
			<BannerFeature
				title={konstituenDetail ? `${konstituenDetail.konstituen_name}` : 'Konstitusi'}
				loading={fetchingKonstituenDetail}
			/>
			<section className="bg-gray-100 py-12 md:py-12">
				<div className="container">
					{fetchingKonstituenDetail && <KonstituenDetailSkeleton />}
					{!fetchingKonstituenDetail && konstituenDetail && (
						<div className="space-y-6">
							<div className="col-span-12 bg-gray-100 p-5">
								<div className="bg-white shadow-lg rounded-md">
									<div className="p-4">
										<div className="font-light text-xl">Details</div>
										<div className="text-sm text-gray-400">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										</div>
									</div>
									<hr />
									<div className="p-5 rounded-md my-2">
										<div className="grid grid-cols-12 gap-y-1 text-sm">
											<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2 transform: capitalize">
												Nama {konstituenType || 'institusi'}
											</div>
											<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
												{konstituenDetail?.konstituen_name || 'Belum Tercantum'}
											</div>

											<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2 transform: capitalize">
												Alamat {konstituenType || 'institusi'}
											</div>
											<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
												{konstituenDetail.alamat_konstituen ? konstituenDetail.alamat_konstituen : 'Belum Ada Alamat'}
											</div>

											<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2 transform: capitalize">
												PIC {konstituenType || 'institusi'}
											</div>
											<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
												{konstituenDetail?.konstituen_pic || 'Belum Ada Nama PIC'}{' '}
												{konstituenDetail?.konstituen_pic_mobile
													? `(${konstituenDetail?.konstituen_pic_mobile})`
													: '(Belum Ada No. Kontak)'}
											</div>

											<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2">PIC Staff</div>
											<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
												<Link
													to={`/staff/${konstituenDetail?.pic_staff.id}`}
													className="text-primary underline hover:text-primary-400"
												>
													{konstituenDetail?.pic_staff.name || 'Belum Ada Nama PIC'}{' '}
													{konstituenDetail?.pic_staff.mobile
														? `(${konstituenDetail?.pic_staff.mobile})`
														: '(Belum Ada No. Kontak)'}
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col items-center justify-center">
									<div className="bg-white rounded-md px-10 md:px-16 py-6 mb-2 shadow-lg cursor-pointer">
										<Link to={`/institusi/${konstituenDetail?.konstituen_id}/partner`}>
											<div className="flex flex-col items-center justify-center space-y-1 text-center">
												<span className="text-2xl md:text-4xl font-extralight">
													{konstituenDetail?.total_penerima_program_konstituen_per_orang || 0}
												</span>
												<div className="font-light text-gray-400">Total Penerima</div>
											</div>
										</Link>
									</div>
									<div className="grid grid-cols-12 gap-4 w-full">
										<div className="col-span-12 md:col-span-6 bg-white rounded-md shadow-lg">
											<BarChartPenerimaKonstituenPerTahun
												totalPenerima={konstituenDetail?.total_penerima_program_konstituen_by_periode_per_orang || 0}
											/>
										</div>
										<div className="col-span-12 md:col-span-6 bg-white rounded-md shadow-lg">
											<PieChartPenerimaKonstituenByGender
												totalPria={konstituenDetail?.total_pria || 0}
												totalWanita={konstituenDetail?.total_wanita || 0}
											/>
										</div>
										<div className="col-span-12 bg-white rounded-md shadow-lg">
											<TablePenerimaKonstituenDetail konstituenID={konstituenDetail?.konstituen_id} isInDetail />
										</div>
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

const KonstituenDetailSkeleton = () => {
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

export default KonstituenDetail;
