import { NegativeCase } from '@/components/atoms';
import { NEGATIVE_CASE_TYPES } from '@/utils/constants';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useTable } from 'react-table';

export const Table = ({ loading, columns, data, hiddenColumns, onClickRow }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
		initialState: { hiddenColumns: hiddenColumns || [] }
	});

	const handleClickRow = (row) => {
		if (onClickRow) onClickRow(row.original);
	};

	return (
		<table className="w-full" {...getTableProps()}>
			<thead className="bg-[#e9edf6]">
				{headerGroups.map((headerGroup) => (
					<tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => {
							return (
								!column.hidden && (
									<th
										key={column.id}
										className="px-5 md:px-6 py-5 text-left text-xs font-medium uppercase text-gray-500"
										{...column.getHeaderProps({
											style: data.length > 0 && {
												minWidth: column.minWidth,
												width: column.width,
												maxWidth: column.maxWidth
											}
										})}
									>
										{column.render('Header')}
									</th>
								)
							);
						})}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{loading && <Table.Skeleton columns={columns} />}
				{!loading && rows.length === 0 && (
					<tr>
						<td colSpan={columns.length}>
							<NegativeCase type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />
						</td>
					</tr>
				)}
				{!loading &&
					rows.length > 0 &&
					rows.map((row) => {
						prepareRow(row);
						return (
							<tr
								key={row.id}
								className={`hover:bg-gray-50 border-b last:border-b-0 ${onClickRow ? 'cursor-pointer' : ''}`}
								{...row.getRowProps()}
								onClick={() => handleClickRow(row)}
							>
								{row.cells.map((cell) => {
									return (
										!cell.column.hidden && (
											<td
												key={cell.value}
												className="px-5 md:px-6 py-2 md:py-3 text-xs md:text-sm"
												{...cell.getCellProps()}
											>
												{cell.render('Cell')}
											</td>
										)
									);
								})}
							</tr>
						);
					})}
			</tbody>
		</table>
	);
};

Table.Skeleton = ({ columns }) => {
	return [1, 2, 3].map((array) => (
		<tr key={array} className="hover:bg-gray-50 border-b last:border-b-0">
			{columns.map((column) => (
				<td key={column.Header} className="px-5 md:px-6 py-2 md:py-3">
					<Skeleton height={20} />
				</td>
			))}
		</tr>
	));
};

Table.defaultProps = {
	loading: false,
	columns: [],
	data: [],
	hiddenColumns: []
};
