import { Table, TableHeader } from '@/components/atoms';
import { useMemo } from 'react';

export const TableFollowers = ({ data }) => {
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
				width: '100%',
				minWidth: 200
			},
			{
				Header: 'Nama',
				accessor: 'name',
				minWidth: 250
			},
			{
				Header: 'Email',
				accessor: 'email',
				minWidth: 300
			},
			{
				Header: 'Nomor Telepon',
				accessor: 'mobile',
				minWidth: 250
			}
		],
		[]
	);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6 flex items-center justify-between">
				<TableHeader
					feature="Followers"
					title={'List Followers'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly
				/>
			</div>
			<div className="overflow-x-scroll">
				<Table columns={columns} data={data} />
			</div>
		</div>
	);
};

TableFollowers.defaultProps = {
	params: {},
	isShowFooter: true
};
