import { ButtonAction, Table, TableHeader } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { useMemo } from 'react';

export const TableStaffDetailTotalUsulanPerProgram = ({ fetchData, isReadonly, titleHeader }) => {
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
					return <div className="capitalize transform:">{row.row.original.program?.name || '-'}</div>;
				}
			},
			{
				Header: 'Periode',
				minWidth: 200,
				Cell: (row) => {
					return <div className="capitalize transform:">{row.row.original.program?.periode || '-'}</div>;
				}
			},
			{
				Header: 'Total Usulan',
				minWidth: 200,
				Cell: (row) => {
					return <div className="capitalize transform:">{row.row.original?.total_candidate || '-'}</div>;
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
							linkTo={`/program/${row.row.original.program.id}`}
						/>
					);
				}
			}
		],
		[]
	);

	return (
		<>
			<div className="p-6">
				<TableHeader title={titleHeader} isReadonly={isReadonly} showButtonCreate={false} />
			</div>
			<div className="overflow-y-auto h-fit">
				<Table columns={columns} data={fetchData} loading={null} />
			</div>
		</>
	);
};
