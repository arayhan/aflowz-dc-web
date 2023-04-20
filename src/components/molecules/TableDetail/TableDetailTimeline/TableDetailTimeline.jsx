import { ButtonAction, Table } from '@/components/atoms';
import { useAuthStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import moment from 'moment';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export const TableDetailTimeline = ({ actionBaseURL, timelineData, displayedColumns, onDelete }) => {
	const { isSystem } = useAuthStore();
	const { programID, programCategoryID } = useParams();

	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				hidden: displayedColumns && !displayedColumns.includes('#'),
				Cell: (row) => {
					return <div className="text-gray-400">{Number(row.row.id) + 1}</div>;
				}
			},
			{
				Header: 'Nama Program',
				minWidth: 150,
				hidden: displayedColumns && !displayedColumns.includes('Nama Program'),
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.program?.name || data?.program_name}</div>;
				}
			},
			{
				Header: 'Deskripsi',
				minWidth: 150,
				hidden: displayedColumns && !displayedColumns.includes('Deskripsi'),
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.description || data?.name}</div>;
				}
			},
			{
				Header: 'Tanggal Program',
				minWidth: 150,
				hidden: displayedColumns && !displayedColumns.includes('Tanggal Program'),
				Cell: (row) => {
					const data = row.row.original;
					const startDate = data?.start_date || data?.start_date_plan;
					const endDate = data?.end_date || data?.end_date_plan;
					return (
						<div className="text-gray-400">
							{startDate ? moment(startDate).format('DD MMMM YYYY') : '-'}
							{' - '}
							{endDate ? moment(endDate).format('DD MMMM YYYY') : '-'}
						</div>
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 220,
				hidden: !isSystem,
				Cell: (row) => {
					const data = row.row.original;
					const parentID = programID || programCategoryID;
					const timelineID = data.id;

					return (
						<div className="flex gap-2">
							<ButtonAction
								action={ACTION_TYPES.UPDATE}
								linkTo={`${actionBaseURL}/${parentID}/timeline/update/${timelineID}`}
							/>
							{onDelete && <ButtonAction action={ACTION_TYPES.DELETE} onClick={() => onDelete(timelineID)} />}
						</div>
					);
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={timelineData} />;
};

TableDetailTimeline.defaultProps = {
	timelineData: []
};
