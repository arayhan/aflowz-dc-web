import { Button, Table, TableFooter } from '@/components/atoms';
import { useEffect, useMemo, useState } from 'react';

export const TableDetailVillageInDistrict = ({ villageData }) => {
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);

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
				Header: 'Nama Desa',
				accessor: 'village_name',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/dapil/village/${data.village_id}`}
							text={data.village_name}
						/>
					);
				}
			},
			{
				Header: 'PIC Desa',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return data.village_pic || '-';
				}
			},
			{
				Header: 'PIC Mobile',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return data.village_pic_mobile || '-';
				}
			},
			{
				Header: 'PIC Internal',
				width: 80,
				maxWidth: 80,
				Cell: (row) => {
					const data = row.row.original;
					return data.village_pic_staff?.id ? (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/staff/${data.village_pic_staff?.id}`}
							text={data.village_pic_staff?.name}
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

	useEffect(() => {
		if (villageData) {
			setPageCount(Math.ceil(villageData.length / perPage));
		}
	}, [villageData]);

	return (
		<div>
			<Table columns={columns} data={villageData} />
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};

TableDetailVillageInDistrict.defaultProps = {
	villageData: []
};
