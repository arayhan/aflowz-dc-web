import { useParams } from 'react-router-dom';
import { useAuthStore, usePartnerStore } from '@/store';
import { BannerFeature } from '@/components/molecules';
import { useEffect, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import man from '../../images/icons/man.jpg';
import woman from '../../images/icons/woman.jpg';
import { Button, ButtonAction, Table, TableHeader } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';

const StaffDetail = () => {
	const { isSystem } = useAuthStore();
	const params = useParams();
	const { staff, fetchingStaff, getStaff } = usePartnerStore();

	useEffect(() => {
		getStaff(params.staffID);
	}, [params]);

	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				Cell: (row) => {
					return <div className="text-gray-400">{Number(row.row.id) + 1}</div>;
				}
			},
			{
				Header: 'Nama Program',
				minWidth: 150,
				Cell: (row) => {
					return <div>{row.row.original.name}</div>;
				}
			},
			{
				Header: 'Mitra',
				minWidth: 200,
				Cell: (row) => {
					return <div>{row.row.original.program_category.name}</div>;
				}
			},
			{
				Header: 'Periode',
				minWidth: 20,
				Cell: (row) => {
					return <div>{row.row.original.periode}</div>;
				}
			},
			{
				Header: 'Detail Program',
				minWidth: 100,
				Cell: (row) => {
					return (
						<ButtonAction
							className="bg-purple-500 hover:bg-purple-400 px-9"
							action={ACTION_TYPES.SEE_DETAIL}
							linkTo={`/program/${row.row.original.id}`}
						/>
					);
				}
			}
		],
		[]
	);

	const columns2 = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				Cell: (row) => {
					return <div className="text-gray-400">{Number(row.row.id) + 1}</div>;
				}
			},
			{
				Header: 'Nama Institusi',
				minWidth: 150,
				Cell: (row) => {
					return <div>{row.row.original.institusi_name}</div>;
				}
			},
			{
				Header: 'Jenis Institusi',
				minWidth: 100,
				Cell: (row) => {
					return <div className="transform: capitalize">{row.row.original.institusi_type}</div>;
				}
			},
			{
				Header: 'PIC Institusi',
				minWidth: 20,
				Cell: (row) => {
					return <div className="transform: capitalize">{row.row.original.institusi_pic_external}</div>;
				}
			},
			{
				Header: 'Detail Institusi',
				minWidth: 100,
				Cell: (row) => {
					return (
						<ButtonAction
							className="bg-purple-500 hover:bg-purple-400 px-9"
							action={ACTION_TYPES.SEE_DETAIL}
							linkTo={`/institusi/${row.row.original.id}`}
						/>
					);
				}
			}
		],
		[]
	);

	return (
		<div>
			<BannerFeature title={staff ? `${staff.name}` : 'Detail Tim Internal'} loading={fetchingStaff} />
			<section className="bg-gray-100 py-12 md:py-12">
				<div className="container">
					{fetchingStaff && <StaffDetailSkeleton />}
					{!fetchingStaff && staff && (
						<div className="space-y-6">
							<div className="col-span-12 bg-gray-100 p-5">
								<div className="bg-white shadow-lg rounded-md">
									<div className="p-4">
										<div className="font-light text-xl">Detail Tim Internal</div>
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
													Nama Tim Internal
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
											</div>
										</div>
									</div>
								</div>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
									<div className="my-5 p-2 bg-white rounded-md shadow-lg max-h-[50vh] overflow-x-auto">
										<div className="p-6">
											<TableHeader
												title={'Daftar Program'}
												description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
												isReadonly={!isSystem}
												showButtonCreate={false}
											/>
										</div>
										<div className="h-fit overflow-y-auto">
											<Table columns={columns} data={staff?.programs} loading={null} />
										</div>
									</div>
									<div className="my-5 p-2 bg-white rounded-md shadow-lg max-h-[50vh] overflow-x-auto overflow-y-auto">
										<div className="p-6">
											<TableHeader
												title={'Daftar Institusi'}
												description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
												isReadonly={!isSystem}
												showButtonCreate={false}
											/>
										</div>
										<div className="h-fit">
											<Table columns={columns2} data={staff?.konstituens_pic} loading={null} />
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
