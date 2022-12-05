import { ButtonAction, Table, TableHeader } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { useMemo } from 'react';

export const TableStaffDetailVillage = ({ fetchData, isReadonly, titleHeader }) => {
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
				Header: 'Nama Kelurahan/Desa',
				minWidth: 150,
				Cell: (row) => {
					return <div>{row.row.original.village_name}</div>;
				}
			},
			{
				Header: 'PIC Kelurahan/Desa',
				minWidth: 20,
				Cell: (row) => {
					return <div className="transform: capitalize">{row.row.original.village_pic_external}</div>;
				}
			},
			{
				Header: 'Detail Kelurahan/Desa',
				minWidth: 100,
				Cell: (row) => {
					return (
						<ButtonAction
							className="bg-purple-500 hover:bg-purple-400 px-9"
							action={ACTION_TYPES.SEE_DETAIL}
							linkTo={`/village/${row.row.original.village_id}`}
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
					isReadonly={isReadonly}
					showButtonCreate={false}
				/>
			</div>
			<div className="h-fit overflow-y-auto">
				<Table columns={columns} data={fetchData} loading={null} />
			</div>
		</>
	);
};
