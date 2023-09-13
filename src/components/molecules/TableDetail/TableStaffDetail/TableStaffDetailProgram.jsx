import { ButtonAction, Table, TableHeader } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { useMemo } from 'react';

export const TableStaffDetailProgram = ({ fetchData, isReadonly, titleHeader }) => {
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
					return <div className="capitalize transform:">{row.row.original.name}</div>;
				}
			},
			{
				Header: 'Mitra',
				minWidth: 200,
				Cell: (row) => {
					return <div className="capitalize transform:">{row.row.original.program_category.name}</div>;
				}
			},
			{
				Header: 'Periode',
				minWidth: 20,
				Cell: (row) => {
					return <div className="capitalize transform:">{row.row.original.periode}</div>;
				}
			},
			{
				Header: 'Program PIC',
				minWidth: 20,
				Cell: (row) => {
					const data = row.row.original;
					return (
						<div className="flex flex-wrap gap-1">
							{data.programs_pic.length === 0 && '-'}
							{data.programs_pic.length > 0 &&
								data.map((program_pic) => (
									<ButtonAction
										key={program_pic.id}
										className="w-full bg-purple-500 hover:bg-purple-400"
										action={ACTION_TYPES.SEE_DETAIL}
										linkTo={`/staff/${program_pic.id}`}
										text={program_pic.name}
									/>
								))}
						</div>
					);
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
			<div className="overflow-y-auto h-fit">
				<Table columns={columns} data={fetchData} loading={null} />
			</div>
		</>
	);
};
