import { ButtonAction, Table } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { useMemo } from 'react';

export const TableDetailStructureOrganization = ({ dataOrganization }) => {
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
				Header: 'Nama',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.partner_name || '-'}</div>;
				}
			},
			{
				Header: 'Nomor Telepon',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.partner_mobile || '-'}</div>;
				}
			},
			{
				Header: 'Email',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.partner_email || '-'}</div>;
				}
			},
			{
				Header: 'Posisi',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return (
						<div>
							{data?.position_name} Program {data?.program_name} {data?.program_periode}
						</div>
					);
				}
			},
			{
				Header: 'Action',
				Cell: (row) => {
					const data = row.row.original;
					const navigate = `/staff/${data.partner_id}`;
					return <ButtonAction className="min-w-[100px] w-full" action={ACTION_TYPES.SEE_DETAIL} linkTo={navigate} />;
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={dataOrganization} />;
};
