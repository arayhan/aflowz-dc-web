import { Button, Table } from '@/components/atoms';
import { STATUS_PENERIMA_TYPES } from '@/utils/constants';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableDetailPICVillage = ({ PICVillageData }) => {
	const navigate = useNavigate();
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
				Header: 'PIC',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data.village_pic_external}</div>;
				}
			},
			{
				Header: 'No Kotak',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data.village_pic_external_mobile}</div>;
				}
			},
			{
				Header: 'Kota',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return data ? (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/dapil/village/${data.village_id}`}
							text={data.village_name}
						/>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'Status',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					const statusClass =
						data.status === STATUS_PENERIMA_TYPES.CONFIRMED
							? 'text-green-500'
							: STATUS_PENERIMA_TYPES.CANDIDATE
							? 'text-blue-500'
							: 'text-red-500';

					return <div className={`text-xs font-semibold uppercase ${statusClass}`}>{data.status}</div>;
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={PICVillageData} onClickRow={(data) => navigate(`/staff/${data.id}`)} />;
};

TableDetailPICVillage.defaultProps = {
	PICVillageData: []
};
