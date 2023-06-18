import { ButtonAction, Table } from '@/components/atoms';
import { useAuthStore } from '@/store';
import { ACTION_TYPES, TIMELINE_STATUS } from '@/utils/constants';
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
				Header: 'Timeline',
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
				Header: 'Jumlah Target Penerima',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Jumlah Target Penerima'),
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.target_receiver}</div>;
				}
			},
			{
				Header: 'Jumlah Pendaftar Saat Ini',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Jumlah Pendaftar Saat Ini'),
				Cell: (row) => {
					const data = row.row.original;
					return <div className="italic font-semibold text-orange-500">Under Maintenance</div>;
				}
			},
			{
				Header: 'Jumlah Lolos Seleksi',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Jumlah Lolos Seleksi'),
				Cell: (row) => {
					const data = row.row.original;
					return <div className="italic font-semibold text-orange-500">Under Maintenance</div>;
				}
			},
			{
				Header: 'PJ Internal',
				minWidth: 180,
				hidden: displayedColumns && !displayedColumns.includes('PJ Internal'),
				Cell: (row) => {
					const data = row.row.original;
					return <div className="italic text-gray-400">{data?.pic_staff?.name || '-'}</div>;
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
				Header: 'Status',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					const statusClass =
						data.status === TIMELINE_STATUS.DONE
							? 'text-green-500'
							: TIMELINE_STATUS.ONGOING
							? 'text-orange-500'
							: 'text-yellow-500';

					return <div className={`text-xs font-semibold uppercase ${statusClass}`}>{data.status}</div>;
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
