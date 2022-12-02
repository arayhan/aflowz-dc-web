import { Card } from '@/components/atoms';
import {
	BannerFeature,
	CardPenerimaProgramByGender,
	TableDetailPenerimaProgram,
	TablePenerima
} from '@/components/molecules';
import { useProgramStore } from '@/store';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

const ProgramDetail = () => {
	const params = useParams();
	const { programDetail, fetchingProgramDetail, getProgramDetail } = useProgramStore();

	useEffect(() => {
		getProgramDetail(params.programID);
	}, [params]);

	return (
		<div>
			<BannerFeature
				title={programDetail ? `Program ${programDetail.program_name}` : 'Program'}
				loading={fetchingProgramDetail}
			/>

			<section className="bg-gray-100 py-12 md:py-12">
				<div className="container">
					{fetchingProgramDetail && <ProgramDetailSkeleton />}
					{!fetchingProgramDetail && programDetail && (
						<div className="space-y-6">
							<Card
								title={'Details'}
								description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
								className={'bg-white rounded-md'}
							>
								<div className="grid grid-cols-12 gap-y-1 text-sm p-5">
									<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">Nama Program</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{programDetail?.program_name}</div>

									<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">Periode</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{programDetail?.program_periode}</div>

									<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">Program PIC</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
										{programDetail?.program_pic}{' '}
										{programDetail?.program_pic_mobile && `(${programDetail?.program_pic_mobile})`}
									</div>

									<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">PIC Staff</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
										<Link
											to={`/staff/${programDetail?.pic_staff.id}`}
											className="text-primary underline hover:text-primary-400"
										>
											{programDetail?.pic_staff.name}{' '}
											{programDetail?.pic_staff.mobile && `(${programDetail?.pic_staff.mobile})`}
										</Link>
									</div>
								</div>
							</Card>

							<div className="flex items-center justify-center gap-4">
								<div className="bg-white rounded-md px-10 md:px-16 py-6">
									<Link to={`/program/penerima/${programDetail?.program_id}`}>
										<div className="flex flex-col items-center justify-center space-y-1 text-center">
											<span className="text-2xl md:text-4xl font-extralight">
												{programDetail?.total_penerima_program || 0}
											</span>
											<div className="font-light text-gray-400">Total Penerima</div>
										</div>
									</Link>
								</div>
							</div>

							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-12 md:col-span-6">
									<TablePenerima
										programID={programDetail?.program_id}
										programName={programDetail?.program_name}
										isReadonly
										isInDetail
									/>
								</div>
								<div className="col-span-12 md:col-span-6">
									<CardPenerimaProgramByGender
										total={programDetail?.total_penerima_program || 0}
										totalPria={programDetail?.total_pria}
										totalWanita={programDetail?.total_wanita}
									/>
								</div>
								<div className="col-span-12 md:col-span-6">
									<Card
										title={'Penerima Program PerVillage'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										className={'bg-white rounded-md'}
									>
										<div className="flex p-4 overflow-scroll max-h-96">
											<TableDetailPenerimaProgram
												dataPenerimaPerArea={programDetail?.total_penerima_program_per_village}
												isPerVillage
											/>
										</div>
									</Card>
								</div>
								<div className="col-span-12 md:col-span-6">
									<Card
										title={'Penerima Program PerCity'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										className={'bg-white rounded-md'}
									>
										<div className="flex p-4 overflow-scroll max-h-96">
											<TableDetailPenerimaProgram
												dataPenerimaPerArea={programDetail?.total_penerima_program_per_city}
												isPerCity
											/>
										</div>
									</Card>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const ProgramDetailSkeleton = () => (
	<div className="grid grid-cols-12 gap-6">
		{[1, 2, 3].map((item) => (
			<div key={item} className="col-span-12 md:col-span-4 bg-white p-4 rounded-md">
				<div className="space-y-3 flex flex-col">
					<Skeleton width={200} height={20} />
					<hr />
					<div className="flex items-center justify-center">
						<Skeleton className="w-48 h-48 md:w-52 md:h-52 rounded-full" />
					</div>
				</div>
			</div>
		))}
		<div className="col-span-12 bg-white p-5 md:p-8 rounded-md">
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

export default ProgramDetail;
