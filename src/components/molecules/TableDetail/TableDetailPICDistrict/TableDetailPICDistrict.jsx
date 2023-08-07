import { Button, Table } from '@/components/atoms';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableDetailPICDistrict = ({ PICDistrictData }) => {
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
				Header: 'Kecamatan',
				width: '100%',
				Cell: (row) => {
					const data = row.row.original;
					return data ? (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/dapil/district/${data.district_id}`}
							text={data.district_name}
						/>
					) : (
						'-'
					);
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={PICDistrictData} onClickRow={(data) => navigate(`/staff/${data.id}`)} />;
};

TableDetailPICDistrict.defaultProps = {
	PICDistrictData: []
};
