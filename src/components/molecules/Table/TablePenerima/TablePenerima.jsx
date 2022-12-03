import { ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState, useMemo } from 'react';
import { ModalFilterPenerima } from '../../Modal/ModalFilterPenerima/ModalFilterPenerima';

export const TablePenerima = ({ programID, programName, isInDetail, isReadonly }) => {
	const { isSystem } = useAuthStore();
	const { penerimaList, fetchingPenerimaList, getPenerimaList, deletePenerima } = usePartnerStore();

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);
	const [showModalFilterPenerima, setShowModalFilterPenerima] = useState(false);

	const handleSubmitFilter = (values) => {
		console.log({ values });
	};

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
				Header: 'Nama Penerima',
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
						<div>
							{!konstituen.id && '-'}
							{konstituen.id && (
								<ButtonAction
									key={konstituen.id}
									className="bg-purple-500 hover:bg-purple-400"
									action={ACTION_TYPES.SEE_DETAIL}
									linkTo={`/institusi/${konstituen.id}`}
									text={konstituen.name}
								/>
							)}
						</div>
					);
				}
			},
			{
				Header: 'Detail',
				minWidth: 150,
				maxWidth: 150,
				Cell: (row) => {
					return <ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/penerima/${row.row.original.id}`} />;
				}
			},
			{
				Header: 'Actions',
				minWidth: 180,
				hidden: isReadonly || !isSystem,
				Cell: (row) => {
					return (
						<div className="grid grid-cols-2 gap-2">
							<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/penerima/update/${row.row.original.id}`} />
							<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deletePenerima(row.row.original.id)} />
						</div>
					);
				}
			}
		],
		[]
	);

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const params = { limit: perPage, offset: offsetResult };

		if (programID) Object.assign(params, { program_id: programID });

		if (page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getPenerimaList(params);
		}
	}, [programID, page, perPage, pageCount]);

	useEffect(() => {
		if (penerimaList) {
			setData(penerimaList.items);
			setPageCount(Math.ceil(penerimaList.total / perPage));
		}
	}, [penerimaList, pageCount]);

	return (
		<div className="bg-white rounded-md shadow-md">
			{showModalFilterPenerima && (
				<ModalFilterPenerima onClose={() => setShowModalFilterPenerima(false)} onSubmit={handleSubmitFilter} />
			)}
			<div className="p-6">
				<TableHeader
					feature="Penerima"
					title={`Penerima Program ${programName ? programName : ''}`}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem || isReadonly}
					showButtonUploadSheetPenerima
					showButtonCreate={false}
					showButtonFilter
					onClickFilter={() => setShowModalFilterPenerima(true)}
					mainRoute={`/program/penerima/${programID}`}
				/>
			</div>
			<div className="overflow-x-scroll">
				<Table columns={columns} data={data} loading={fetchingPenerimaList || penerimaList === null} />
			</div>
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};
