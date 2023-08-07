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
				Header: 'Desa/Kelurahan',
				width: '100%',
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
			}
		],
		[]
	);

	return <Table columns={columns} data={PICVillageData} onClickRow={(data) => navigate(`/staff/${data.id}`)} />;
};

TableDetailPICVillage.defaultProps = {
	PICVillageData: []
};
