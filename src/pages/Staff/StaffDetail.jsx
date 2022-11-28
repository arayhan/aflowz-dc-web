import { useParams } from 'react-router-dom';
import { usePartnerStore } from '@/store';
import { BannerFeature } from '@/components/molecules';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import man from '../../images/icons/man.jpg';
import woman from '../../images/icons/woman.jpg';
import { ButtonAction } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';

const StaffDetail = () => {
	const params = useParams();
	const { staff, fetchingStaff, getStaff } = usePartnerStore();

	useEffect(() => {
		getStaff(params.staffID);
	}, [params]);

	console.log(staff);

	return (
		<div>
			<BannerFeature title={staff ? `${staff.name}` : 'Staff'} loading={fetchingStaff} />
			<section className="bg-gray-100 py-12 md:py-12">
				<div className="container">
					{fetchingStaff && <StaffDetailSkeleton />}
					{!fetchingStaff && staff && (
						<div className="space-y-6">
							<div className="col-span-12 bg-gray-100 p-5">
								<div className="bg-white shadow-lg rounded-md">
									<div className="p-4">
										<div className="font-light text-xl">Staff Details</div>
										<div className="text-sm text-gray-400">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										</div>
									</div>
									<hr />
									<div className="p-5 rounded-md my-2 flex-col">
										<div className="w-full flex justify-center mb-5">
											<img src={staff?.gender === 'Wanita' ? woman : man} className="w-52" />
										</div>
										<div className="overflow-x-auto">
											<div className="grid grid-cols-12 w-full gap-y-1 text-sm">
												<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2 transform: capitalize">
													NIK
												</div>
												<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
													{staff?.nik_number || 'Belum Tercantum'}
												</div>

												<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2 transform: capitalize">
													Nama Staff
												</div>
												<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
													{staff?.name || 'Belum Tercantum'}
												</div>

												<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2 transform: capitalize">
													Alamat Domisili
												</div>
												<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
													{staff?.address || 'Belum Mencantumkan'}
												</div>

												<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2 transform: capitalize">
													No. HP/Telp
												</div>
												<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
													{staff?.mobile || 'Belum Mencantumkan'}
												</div>
												<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2 transform: capitalize">
													Email
												</div>
												<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
													{staff?.email || 'Belum Mencantumkan'}
												</div>
												<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2 transform: capitalize">
													Role
												</div>
												<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
													{staff?.staff_title.name || 'Belum Mencantumkan'}
												</div>
												<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2 transform: capitalize">
													Konstituen
												</div>
												<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
													<ButtonAction
														key={staff?.konstituen.id}
														className="bg-purple-500 hover:bg-purple-400"
														action={ACTION_TYPES.SEE_DETAIL}
														linkTo={`/konstituen/${staff?.konstituen.id}`}
														text={staff?.konstituen.name}
													/>
												</div>
												<div className="col-span-4 lg:col-span-3 text-gray-500 bg-[#e9edf6] px-3 py-2 transform: capitalize">
													Program
												</div>
												<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
													{staff?.programs.map((program) => {
														return (
															<ButtonAction
																key={program.id}
																className="bg-purple-500 hover:bg-purple-400 mx-0.5"
																action={ACTION_TYPES.SEE_DETAIL}
																linkTo={`/program/${program.id}`}
																text={program.name}
															/>
														);
													})}
												</div>
											</div>
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

const StaffDetailSkeleton = () => {
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

export default StaffDetail;
