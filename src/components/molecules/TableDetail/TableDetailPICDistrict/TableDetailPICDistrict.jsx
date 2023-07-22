import { Button, Table } from '@/components/atoms';
import { STATUS_PENERIMA_TYPES } from '@/utils/constants';
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
				Header: 'PIC Eksternal',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data.district_pic_external}</div>;
				}
			},
			{
				Header: 'No Kontak',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data.district_pic_external_mobile}</div>;
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
