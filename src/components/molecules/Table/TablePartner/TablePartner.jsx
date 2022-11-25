import { Table, TableHeader } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { SiGooglesheets } from 'react-icons/si';
import { Link } from 'react-router-dom';

export const TablePartner = ({ programID, programName, isInDetail, isReadonly }) => {
	const { isAdmin } = useAuthStore();
	const { partnerList, fetchingPartnerList, getPartnerList } = usePartnerStore();

	const [data, setData] = useState([]);

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
				Header: 'NIK',
				accessor: 'nik_number',
				minWidth: 175
			},
			{
				Header: 'Name',
				accessor: 'name',
				minWidth: 175
			},
			{
				Header: 'Program',
				hidden: isInDetail,
				Cell: (row) => (
					<div>
						{row.row.original.programs.map((program) => (
							<Link
								key={program.id}
								className="inline-block text-center px-3 py-1 bg-purple-500 hover:bg-purple-400 text-white rounded-sm text-xs transition-all"
								to={`/program/${program.id}`}
							>
								{program.name}
							</Link>
						))}
					</div>
				)
			},
			{
				Header: 'Konstituen',
				minWidth: 200,
				Cell: (row) => {
					const konstituen = row.row.original.konstituen;
					return (
						<div>
							<Link
								key={konstituen.id}
								className="inline-block text-center px-3 py-1 bg-purple-500 hover:bg-purple-400 text-white rounded-sm text-xs transition-all"
								to={`/konstituen/${konstituen.id}`}
							>
								{konstituen.name}
							</Link>
						</div>
					);
				}
			},
			{
				Header: 'Detail',
				minWidth: 150,
				maxWidth: 150,
				Cell: (row) => {
					return (
						<Link
							to={`/partner/${row.row.original.id}`}
							className="inline-block text-center px-3 py-1 bg-blue-500 hover:bg-blue-400 text-white rounded-sm text-xs transition-all"
						>
							See Detail
						</Link>
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 180,
				hidden: isReadonly || !isAdmin,
				Cell: () => {
					return (
						<div className="grid grid-cols-2 gap-2">
							<Link className="inline-block text-center px-3 py-1 bg-green-500 hover:bg-green-400 text-white rounded-sm text-xs transition-all">
								Update
							</Link>
							<Link className="inline-block text-center px-3 py-1 bg-red-500 hover:bg-red-400 text-white rounded-sm text-xs transition-all">
								Delete
							</Link>
						</div>
					);
				}
			}
		],
		[]
	);

	useEffect(() => {
		const params = programID ? { program_id: programID } : null;
		getPartnerList(params);
	}, [programID]);

	useEffect(() => {
		if (partnerList) setData(partnerList.items);
	}, [partnerList]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					title={`Penerima ${`Program ${programName}` || 'Semua Program'}`}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
				/>
				<div>
					<div className="text-xl font-light"></div>
					<div className="text-sm text-gray-400"></div>
				</div>
				{isAdmin && !isReadonly && (
					<div className="w-full lg:w-1/4 flex flex-col sm:justify-end sm:flex-row gap-3">
						<button className="bg-green-500 hover:bg-green-600 space-x-1 text-white px-5 py-3 flex items-center justify-center rounded-md transition-all">
							<SiGooglesheets />
							<span className="text-sm">Upload XLS</span>
						</button>
						<Link
							to="/program/create"
							className="block bg-blue-500 hover:bg-blue-600 space-x-1 text-white px-5 py-3 rounded-md transition-all text-center text-sm"
						>
							<span>Create Program</span>
						</Link>
					</div>
				)}
			</div>
			<div className="overflow-x-scroll">
				<Table columns={columns} data={data} loading={fetchingPartnerList || partnerList === null} />
			</div>
		</div>
	);
};
