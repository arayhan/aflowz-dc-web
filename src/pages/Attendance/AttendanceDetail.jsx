import { useParams } from 'react-router-dom';
import { useAuthStore, useAttendanceStore } from '@/store';
import { BannerFeature } from '@/components/molecules';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ButtonAction } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { TableAttendanceDetail } from '@/components/molecules/TableDetail/TableAttendanceDetail/TableAttendanceDetail';

const AttendanceDetail = () => {
	const { isSystem, isAdmin } = useAuthStore();
	const params = useParams();
	const { attendance, fetchingAttendance, getAttendance } = useAttendanceStore();

	useEffect(() => {
		getAttendance(params.attendanceID);
	}, [params]);

	return (
		<div>
			<BannerFeature title={'Detail Absensi'} loading={fetchingAttendance} />
			<section className="bg-gray-100 py-12 md:py-12">
				<div className="container">
					{fetchingAttendance && <AttendanceDetailSkeleton />}
					{!fetchingAttendance && attendance && (
						<div className="space-y-6">
							<div className="col-span-12 bg-gray-100 p-5">
								<div className="bg-white shadow-lg rounded-md">
									<div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
										<div className="w-full space-y-2">
											<div className="font-light text-xl">
												Tanggal {`${new Date(attendance?.date).toLocaleDateString('es-CL')}`}
											</div>
											<div className="text-sm text-gray-400">
												Lorem ipsum dolor sit amet, consectetur adipisicing elit.
											</div>
										</div>
										<div className="w-full flex flex-col md:flex-row items-center justify-end gap-4">
											<ButtonAction
												action={ACTION_TYPES.UPDATE}
												linkTo={`/absensi/update/${params.attendanceID}`}
												className={'w-full md:w-auto text-base px-5 py-3 rounded-md'}
												text="Update"
											/>
										</div>
									</div>
									<hr />
								</div>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
									<div className="my-5 p-2 bg-white rounded-md shadow-lg max-h-[50vh] overflow-x-auto overflow-y-auto">
										<TableAttendanceDetail
											fetchData={attendance?.list_attendance}
											isReadonly={!isSystem}
											titleHeader={'Daftar Hadir'}
										/>
									</div>
									<div className="my-5 p-2 bg-white rounded-md shadow-lg max-h-[50vh] overflow-x-auto overflow-y-auto">
										<TableAttendanceDetail
											fetchData={attendance?.list_abscene}
											isReadonly={!isSystem}
											titleHeader={'Daftar Tidak Hadir'}
										/>
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

const AttendanceDetailSkeleton = () => {
	return (
		<div className="space-y-6 bg-white rounded-md p-5">
			<div className="col-span-12">
				<Skeleton height={250} />
			</div>
			<div className="col-span-12">
				<Skeleton height={250} />
			</div>
			<div className="col-span-12">
				<Skeleton height={250} />
			</div>
		</div>
	);
};

export default AttendanceDetail;
