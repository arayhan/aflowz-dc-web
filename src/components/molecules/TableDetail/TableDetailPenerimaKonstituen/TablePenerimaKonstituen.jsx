import { ButtonAction, Table } from '@/components/atoms';
import { NegativeCase } from '@/components/atoms';
import { NEGATIVE_CASE_TYPES } from '@/utils/constants';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ACTION_TYPES } from '@/utils/constants';

export const TablePenerimaKonstituenDetail = ({ dataPenerima, setLoading, konstituenID }) => {
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
				Cell: (row) => <div className="transform: capitalize">{row.row.original.name}</div>
			},
			{
				Header: 'NIK',
				minWidth: 50,
				maxWidth: 50,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.nik_number}</div>
			},
			{
				Header: 'Alamat',
				minWidth: 300,
				maxWidth: 300,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.address}</div>
			},
			{
				Header: 'Program',
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
										className="w-full bg-purple-500 hover:bg-purple-400"
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
				Header: 'Detail Penerima',
				minWidth: 50,
				maxWidth: 50,
				Cell: (row) => {
					return (
						<ButtonAction
							className="min-w-[100px] w-full"
							action={ACTION_TYPES.SEE_DETAIL}
							linkTo={`/partner/${row.row.original.id}`}
						/>
					);
				}
			}
		],
		[]
	);

	return (
		<div>
			<div className="p-4 space-y-2">
				<div className="flex justify-between">
					<div className="font-light text-xl">Tabel Penerima</div>
					<Link to={`/konstituen/${konstituenID}/partner`} className="text-primary underline hover:text-primary-400">
						Lihat Semua
					</Link>
				</div>
				<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
			</div>
			<hr />
			{dataPenerima.length === 0 && <NegativeCase type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />}
			{dataPenerima.length > 0 && (
				<div className="overflow-x-auto">
					<Table columns={columns} data={dataPenerima} loading={setLoading} />
				</div>
			)}
		</div>
	);
};
