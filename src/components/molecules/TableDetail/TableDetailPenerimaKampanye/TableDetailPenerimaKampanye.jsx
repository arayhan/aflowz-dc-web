import { ButtonAction, Table, TableFooter } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableDetailPenerimaKampanye = ({ dataPenerima }) => {
	const navigate = useNavigate();

	const [paginatedData, setPaginatedData] = useState([]);
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);

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
				Header: 'Nama Penerima',
				minWidth: 100,
				Cell: (row) => <div className="capitalize">{row.row.original.name}</div>
			},
			{
				Header: 'NIK',
				minWidth: 100,
				Cell: (row) => <div className="capitalize">{row.row.original.nik_number}</div>
			},
			{
				Header: 'Alamat',
				minWidth: 100,
				Cell: (row) => <div className="capitalize">{row.row.original.address}</div>
			},
			{
				Header: 'Program',
				minWidth: 100,
				Cell: (row) => {
					const programs = row.row.original.programs;
					return (
						<div className="flex flex-wrap gap-1">
							{programs.length === 0 && '-'}
							{programs.length > 0 &&
								programs.map((program) => (
									<ButtonAction
										key={program.id}
										className="w-full bg-purple-500 hover:bg-purple-400"
										action={ACTION_TYPES.SEE_DETAIL}
										linkTo={`/program/${program.id}`}
										text={`${program.name} (${program.periode})`}
									/>
								))}
						</div>
					);
				}
			}
		],
		[dataPenerima]
	);

	useEffect(() => {
		if (dataPenerima) {
			const paginated = dataPenerima.slice((page - 1) * perPage, page * perPage);
			setPaginatedData(paginated);
			setPageCount(Math.ceil(dataPenerima.length / perPage));
		}
	}, [dataPenerima, page, perPage]);

	return (
		<div className="w-full">
			<Table columns={columns} data={paginatedData} onClickRow={(data) => navigate(`/penerima/${data.id}`)} />
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};
