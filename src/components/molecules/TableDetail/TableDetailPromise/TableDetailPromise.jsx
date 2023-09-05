import { ButtonAction, Table } from '@/components/atoms';
import { useActivityStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import React, { useMemo } from 'react';

export const TableDetailPromise = ({ promiseData, displayedColumns, onChangeRealtization, onDeletePromise }) => {
	const { updateActivityPromise, deleteActivityPromise } = useActivityStore();

	const handleChangeRealization = (rowData) => {
		updateActivityPromise(rowData.id, { ...rowData, realization: !rowData.realization }, ({ success }) => {
			if (success) onChangeRealtization();
		});
	};

	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				hidden: displayedColumns && !displayedColumns.includes('#'),
				Cell: (row) => <div className="text-gray-400">{Number(row.row.id) + 1}</div>
			},
			{
				Header: 'Terealisasi',
				width: 200,
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Terealisasi'),
				Cell: (row) => {
					const isRealized = row.row.original.realization;
					return (
						<input
							className="p-3 rounded-md hover:cursor-pointer"
							type="checkbox"
							checked={isRealized}
							onChange={() => handleChangeRealization(row.row.original)}
						/>
					);
				}
			},
			{
				Header: 'Janji',
				accessor: 'name',
				width: '100%',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Janji')
			},
			{
				Header: 'Actions',
				minWidth: 220,
				Cell: (row) => {
					return (
						<div>
							<ButtonAction
								action={ACTION_TYPES.DELETE}
								onClick={() =>
									deleteActivityPromise(row.row.original.activity_detail_id, () => {
										onDeletePromise();
									})
								}
							/>
						</div>
					);
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={promiseData} />;
};

TableDetailPromise.defaultProps = {
	promiseData: []
};
