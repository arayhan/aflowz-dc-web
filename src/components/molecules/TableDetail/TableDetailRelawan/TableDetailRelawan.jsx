import { ButtonAction, Table } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import React, { useMemo } from 'react';

export const TableDetailRelawan = ({ isLoading, relawanData }) => {
	const { isSystem } = useAuthStore();
	const { deleteStaff } = usePartnerStore();

	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				maxWidth: 20,
				Cell: (row) => {
					return <div className="text-gray-400">{Number(row.row.id) + 1}</div>;
				}
			},
			{
				Header: 'Nama Relawan',
				minWidth: 180,
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.name ?? '-'}</div>;
				}
			},
			{
				Header: 'Kontak',
				minWidth: 180,
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.mobile ?? '-'}</div>;
				}
			},
			{
				Header: 'Desa/Kelurahan',
				minWidth: 180,
				Cell: (row) => {
					const village = row.row.original?.village;
					return (
						<div className="text-gray-400">
							{village?.name ? (
								<ButtonAction
									key={village.id}
									className="w-full bg-purple-500 hover:bg-purple-400"
									action={ACTION_TYPES.SEE_DETAIL}
									linkTo={`/dapil/village/${village.id}`}
									text={village.name}
								/>
							) : (
								'-'
							)}
						</div>
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 220,
				Cell: (row) => {
					return (
						<div className="flex gap-2">
							<ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/staff/${row.row.original.id}`} />
							{isSystem && (
								<>
									<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/staff/update/${row.row.original.id}`} />
									<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteStaff(row.row.original.id)} />
								</>
							)}
						</div>
					);
				}
			}
		],
		[relawanData]
	);

	return <Table loading={isLoading} columns={columns} data={relawanData} />;
};
