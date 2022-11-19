import React from 'react';
import { useTable } from 'react-table';

export const Table = ({ columns, data }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data
	});

	return (
		<table className="w-full" {...getTableProps()}>
			<thead className="bg-gray-100">
				{headerGroups.map((headerGroup) => (
					<tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th
								key={column.id}
								className="px-3 py-2 text-left border"
								{...column.getHeaderProps({
									style: { minWidth: column.minWidth, width: column.width, maxWidth: column.maxWidth }
								})}
							>
								{column.render('Header')}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row, i) => {
					prepareRow(row);
					return (
						<tr key={row.id} {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return (
									<td key={cell.value} className="px-3 py-2 text-sm border" {...cell.getCellProps()}>
										{cell.render('Cell')}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
