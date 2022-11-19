import { Table } from '@/components/atoms';
import React from 'react';

export const TableProgram = () => {
	const columns = React.useMemo(
		() => [
			{
				Header: 'No',
				accessor: '',
				Cell: (row) => {
					return <div>{Number(row.row.id) + 1}</div>;
				},
				width: 50,
				maxWidth: 50,
				disableSortBy: true,
				disableFilters: true
			},
			{
				Header: 'First Name',
				accessor: 'firstName'
			},
			{
				Header: 'Last Name',
				accessor: 'lastName'
			}
		],
		[]
	);

	const data = [
		{
			firstName: 'John',
			lastName: 'Doe'
		}
	];

	return (
		<div>
			<Table columns={columns} data={data} />
		</div>
	);
};
