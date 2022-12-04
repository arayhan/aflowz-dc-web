import { useParams } from 'react-router-dom';
import { useAuthStore, usePartnerStore } from '@/store';
import { BannerFeature, TableStaffDetailInstitusi, TableStaffDetailProgram } from '@/components/molecules';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ButtonAction, InputTextInfo } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';

const StaffDetail = () => {
	const { isSystem } = useAuthStore();
	const params = useParams();
	const { staff, fetchingStaff, getStaff } = usePartnerStore();

	useEffect(() => {
		getStaff(params.staffID);
	}, [params]);

	return (
		<div>
			<BannerFeature
				title={staff ? `${staff.name}` : 'Detail Tim Internal'}
				loading={fetchingStaff}
				backButtonLinkTo={'/staff'}
				backButtonText="Kembali ke List Staff"
			/>
			<section className="bg-gray-100 py-12 md:py-12">
				<div className="container">
					{fetchingStaff && <StaffDetailSkeleton />}
					{!fetchingStaff && staff && (
						<div className="space-y-6">
							<div className="col-span-12 bg-gray-100 p-5">
								<div className="bg-white shadow-lg rounded-md">
									<div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
										<div className="w-full space-y-2">
											<div className="font-light text-xl">Detail Tim Internal</div>
											<div className="text-sm text-gray-400">
												Lorem ipsum dolor sit amet, consectetur adipisicing elit.
											</div>
										</div>
										<div className="w-full flex flex-col md:flex-row items-center justify-end gap-4">
											<ButtonAction
												action={ACTION_TYPES.UPDATE}
												linkTo={`/staff/update/${params.staffID}`}
												className={'w-full md:w-auto text-base px-5 py-3 rounded-md'}
												text="Update"
											/>
										</div>
									</div>
									<hr />
									<div className="p-5 rounded-md my-2 flex-col">
										<div className="w-full flex justify-center mb-5">
											<img src={staff?.image_url || require('@/images/dummy-profile.webp')} className="w-52" />
										</div>
										<div className="overflow-x-auto">
											<div className="grid grid-cols-12 w-full gap-y-1 text-sm">
												<InputTextInfo tag={'NIK'} value={staff?.nik_number || 'Belum Tercantum'} />
												<InputTextInfo tag={'Nama Tim Internal'} value={staff?.name || 'Belum Tercantum'} />
												<InputTextInfo tag={'Alamat Domisili'} value={staff?.address || 'Belum Mencantumkan'} />
												<InputTextInfo tag={'No. HP/Telp'} value={staff?.mobile || 'Belum Mencantumkan'} />
												<InputTextInfo tag={'Email'} value={staff?.email || 'Belum Mencantumkan'} />
												<InputTextInfo tag={'Role'} value={staff?.staff_title.name || 'Belum Mencantumkan'} />
											</div>
										</div>
									</div>
								</div>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
									<div className="my-5 p-2 bg-white rounded-md shadow-lg max-h-[50vh] overflow-x-auto">
										<TableStaffDetailProgram
											fetchData={staff?.programs}
											isReadonly={!isSystem}
											titleHeader={'List Program'}
										/>
									</div>
									<div className="my-5 p-2 bg-white rounded-md shadow-lg max-h-[50vh] overflow-x-auto overflow-y-auto">
										<TableStaffDetailInstitusi
											fetchData={staff?.konstituens_pic}
											isReadonly={!isSystem}
											titleHeader={'List Institusi'}
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
