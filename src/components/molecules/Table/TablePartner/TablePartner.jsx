import { ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState, useMemo } from 'react';

export const TablePartner = ({ programID, programName, isInDetail, isReadonly }) => {
	const { isAdmin } = useAuthStore();
	const { partnerList, fetchingPartnerList, getPartnerList } = usePartnerStore();

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [offset, setOffset] = useState(0);
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
				minWidth: 70
			},
			{
				Header: 'Name',
				accessor: 'name',
				minWidth: 175
			},
			{
				Header: 'Program',
				hidden: isInDetail,
				minWidth: 150,
				Cell: (row) => {
					const programs = row.row.original.programs;
					return (
						<div className="flex flex-wrap gap-1">
							{programs.length === 0 && '-'}
							{programs.length > 0 &&
								programs.map((program) => (
									<ButtonAction
										key={program.id}
										className="bg-purple-500 hover:bg-purple-400"
										action={ACTION_TYPES.SEE_DETAIL}
										linkTo={`/program/${program.id}`}
										text={program.name}
									/>
								))}
						</div>
					);
				}
			},
			{
				Header: 'Konstituen',
				minWidth: 200,
				Cell: (row) => {
					const konstituen = row.row.original.konstituen;
					return (
						konstituen && (
							<div>
								<ButtonAction
									key={konstituen.id}
									className="bg-purple-500 hover:bg-purple-400"
									action={ACTION_TYPES.SEE_DETAIL}
									linkTo={`/konstituen/${konstituen.id}`}
									text={konstituen.name}
								/>
							</div>
						)
					);
				}
			},
			{
				Header: 'Detail',
				minWidth: 150,
				maxWidth: 150,
				Cell: (row) => {
					return <ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/partner/${row.row.original.id}`} />;
				}
			},
			{
				Header: 'Actions',
				minWidth: 180,
				hidden: isReadonly || !isAdmin,
				Cell: (row) => {
					return (
						<div className="grid grid-cols-2 gap-2">
							<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/partner/update/${row.row.original.id}`} />
							<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => handleDeletePartner(row.row.original.id)} />
						</div>
					);
				}
			}
		],
		[]
	);

	const handleDeletePartner = (partnerID) => {
		console.log({ partnerID });
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const params = { limit: perPage, offset: offsetResult };

		if (programID) Object.assign(params, { program_id: programID });

		if (page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getPartnerList(params);
		}
	}, [programID, page, perPage, pageCount]);

	useEffect(() => {
		if (partnerList) {
			setData(partnerList.items);
			setPageCount(Math.ceil(partnerList.total / perPage));
		}
	}, [partnerList, pageCount]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					feature="Partner"
					title={`Penerima Program ${programName ? programName : ''}`}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isAdmin || isReadonly}
					showButtonUploadPartnerSheet
					showButtonCreate={false}
				/>
			</div>
			<div className="overflow-x-scroll">
				<Table columns={columns} data={data} loading={fetchingPartnerList || partnerList === null} />
			</div>
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};
