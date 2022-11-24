import { NegativeCaseView } from '@/components/molecules';
import { NEGATIVE_CASE_TYPES } from '@/utils/constants';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useTable } from 'react-table';

export const Table = ({ loading, columns, data, hiddenColumns }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
		initialState: { hiddenColumns: hiddenColumns || [] }
	});

	return (
		<table className="w-full" {...getTableProps()}>
			<thead className="bg-gray-100">
				{headerGroups.map((headerGroup) => (
					<tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th
								key={column.id}
								className="px-5 md:px-6 py-5 text-left text-xs font-medium uppercase text-gray-500"
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
						<tr key={array} className="hover:bg-gray-50 border-b last:border-b-0">
							{columns.map((column) => (
								<td key={column.Header} className="px-5 md:px-6 py-2 md:py-3">
									<Skeleton height={20} />
								</td>
							))}
						</tr>
					))}
				{!loading && rows.length === 0 && (
					<tr>
						<td colSpan={columns.length}>
							<NegativeCaseView type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />
						</td>
					</tr>
				)}
				{!loading &&
					rows.length > 0 &&
					rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr key={row.id} className="hover:bg-gray-50 border-b last:border-b-0" {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td
											key={cell.value}
											className="px-5 md:px-6 py-2 md:py-3 text-xs md:text-sm"
											{...cell.getCellProps()}
										>
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

Table.defaultProps = {
	loading: false,
	columns: [],
	data: [],
	hiddenColumns: []
};
