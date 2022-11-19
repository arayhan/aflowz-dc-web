import React from 'react';
import { ImFileEmpty } from 'react-icons/im';
import Skeleton from 'react-loading-skeleton';
import { useTable } from 'react-table';

export const Table = ({ loading, columns, data }) => {
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
								className="px-6 py-5 text-left text-xs font-medium uppercase text-gray-500"
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
				{loading &&
					[1, 2, 3].map((array) => (
						<tr key={array} className="border-b last:border-b-0">
							{columns.map((column) => (
								<td key={column.Header} className="px-6 py-3">
									<Skeleton height={20} />
								</td>
							))}
						</tr>
					))}
				{!loading && rows.length === 0 && (
					<tr>
						<td colSpan={columns.length}>
							<div className="w-full flex flex-col items-center p-10 rounded-md text-gray-300">
								<img className="w-40 opacity-70" src={require('@/images/icons/state-empty.jpg')} alt="" />
								<div>There is no data yet</div>
							</div>
						</td>
					</tr>
				)}
				{!loading &&
					rows.length > 0 &&
					rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr key={row.id} className="border-b last:border-b-0" {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td key={cell.value} className="px-6 py-3 text-sm" {...cell.getCellProps()}>
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
