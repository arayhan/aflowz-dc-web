import { Link, useParams } from 'react-router-dom';
import { useAuthStore, useKonstituenStore } from '@/store';
import {
	BannerFeature,
	BarChartPenerimaKonstituenPerTahun,
	PieChartPenerimaKonstituenByGender,
	TablePenerimaKonstituenDetail
} from '@/components/molecules';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ButtonAction, InputTextInfo } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';

const KonstituenDetail = () => {
	const { isAdmin, isSystem } = useAuthStore();
	const params = useParams();
	const { konstituenDetail, fetchingKonstituenDetail, getKonstituenDetail, getPenerimaKonstituenDetail } =
		useKonstituenStore();

	useEffect(() => {
		getKonstituenDetail(params.konstituenID);
		getPenerimaKonstituenDetail({ konstituen_id: params.konstituenID });
	}, [params]);

	return (
		<div>
			<BannerFeature
				title={konstituenDetail ? `${konstituenDetail.konstituen_name}` : 'Institusi'}
				loading={fetchingKonstituenDetail}
			/>
			<section className="bg-gray-100 py-12 md:py-12">
				<div className="container">
					{fetchingKonstituenDetail && <KonstituenDetailSkeleton />}
					{!fetchingKonstituenDetail && konstituenDetail && (
						<div className="space-y-6">
							<div className="col-span-12 bg-gray-100 p-5">
								<div className="bg-white shadow-lg rounded-md">
									<div className="grid grid-cols-1 sm:grid-cols-2 justify-between items-center">
										<div className="p-4">
											<div className="font-light text-xl">Details</div>
											<div className="text-sm text-gray-400">
												Lorem ipsum dolor sit amet, consectetur adipisicing elit.
											</div>
										</div>
										{(isAdmin || isSystem) && (
											<div className="p-4 h-full flex justify-start sm:justify-end">
												<ButtonAction
													action={ACTION_TYPES.UPDATE}
													linkTo={`/institusi/update/${konstituenDetail?.konstituen_id}`}
													className={'px-7 py-3'}
												/>
											</div>
										)}
									</div>
									<hr />
									<div className="p-5 rounded-md my-2">
										<div className="grid grid-cols-12 gap-y-1 text-sm">
											<InputTextInfo
												tag={`Nama ${konstituenDetail?.konstituen_type || 'institusi'}`}
												value={konstituenDetail?.konstituen_name || 'Belum Tercantum'}
											/>
											<InputTextInfo
												tag={`Alamat ${konstituenDetail?.konstituen_type || 'institusi'}`}
												value={konstituenDetail?.alamat_konstituen || 'Belum Ada Alamat'}
											/>
											<InputTextInfo
												tag={`PIC ${konstituenDetail?.konstituen_type || 'institusi'}`}
												value={konstituenDetail?.konstituen_pic || 'Belum Ada Nama PIC Institusi'}
												extraValue={konstituenDetail?.konstituen_pic_mobile || '(Belum Ada No. Kontak)'}
											/>
											<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2">
												PIC Tim Internal
											</div>
											<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
												<Link
													to={`/staff/${konstituenDetail?.pic_staff.id}`}
													className="text-primary underline hover:text-primary-400"
												>
													{konstituenDetail?.pic_staff.name || 'Belum Ada Nama PIC Tim Internal'}{' '}
													{konstituenDetail?.pic_staff.mobile
														? `(${konstituenDetail?.pic_staff.mobile})`
														: '(Belum Ada No. Kontak)'}
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col items-center justify-center">
									<div className="bg-white rounded-md px-8 md:px-10 py-6 mb-2 shadow-lg cursor-pointer">
										<Link to={`/institusi/penerima/${konstituenDetail?.konstituen_id}`}>
											<div className="flex flex-col items-center justify-center space-y-1 text-center">
												<span className="text-2xl md:text-4xl font-extralight">
													{konstituenDetail?.total_penerima_program_konstituen_per_orang || 0}
												</span>
												<div className="font-light text-gray-400">Total Penerima Program </div>
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
