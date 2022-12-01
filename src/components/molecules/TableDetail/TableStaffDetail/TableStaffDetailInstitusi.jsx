import { ButtonAction, Table, TableHeader } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { useMemo } from 'react';

export const TableStaffDetailInstitusi = ({ fetchData, isSystem, titleHeader }) => {
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
							linkTo={`/institusi/${row.row.original.institusi_id}`}
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
				<TableHeader
					title={titleHeader}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem}
					showButtonCreate={false}
				/>
			</div>
			<div className="h-fit overflow-y-auto">
				<Table columns={columns} data={fetchData} loading={null} />
			</div>
		</>
	);
};
