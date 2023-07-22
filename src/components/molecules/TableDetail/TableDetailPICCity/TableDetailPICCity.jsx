import { Button, Table } from '@/components/atoms';
import { STATUS_PENERIMA_TYPES } from '@/utils/constants';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableDetailPICCity = ({ PICCityData }) => {
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
					return <div>{data.city_pic_external}</div>;
				}
			},
			{
				Header: 'No Kontak',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data.city_pic_external_mobile}</div>;
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
							linkTo={`/dapil/city/${data.city_id}`}
							text={data.city_name}
						/>
					) : (
						'-'
					);
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={PICCityData} onClickRow={(data) => navigate(`/staff/${data.id}`)} />;
};

TableDetailPICCity.defaultProps = {
	PICCityData: []
};
