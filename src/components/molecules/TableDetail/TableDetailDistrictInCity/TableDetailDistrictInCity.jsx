import { Button, Table } from '@/components/atoms';
import { useMemo } from 'react';

export const TableDetailDistrictInCity = ({ districtData }) => {
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
				Header: 'Nama Kecamatan',
				accessor: 'district_name',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/dapil/district/${data.district_id}`}
							text={data.district_name}
						/>
					);
				}
			},
			{
				Header: 'PIC Kecamatan',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return data.district_pic || '-';
				}
			},
			{
				Header: 'PIC Mobile',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return data.district_pic_mobile || '-';
				}
			},
			{
				Header: 'PIC Internal',
				width: 80,
				maxWidth: 80,
				Cell: (row) => {
					const data = row.row.original;
					return data.district_pic_staff?.id ? (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/staff/${data.district_pic_staff?.id}`}
							text={data.district_pic_staff?.name}
						/>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'Total Penerima',
				maxWidth: 100,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.total_penerima_program || data?.total_penerima || '-'}</div>;
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={districtData} />;
};

TableDetailDistrictInCity.defaultProps = {
	villageData: []
};
