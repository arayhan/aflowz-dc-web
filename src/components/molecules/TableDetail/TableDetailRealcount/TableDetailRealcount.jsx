import { Table } from '@/components/atoms';
import React, { useMemo } from 'react';

export const TableDetailRealcount = ({ isLoading, realcountData }) => {
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
				Header: 'Suara Sah',
				minWidth: 180,
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.total_legitimate_vote ?? '-'}</div>;
				}
			},
			{
				Header: 'Suara Tidak Sah',
				minWidth: 180,
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.total_invalid_vote ?? '-'}</div>;
				}
			},
			{
				Header: 'Suara Dewi Coryati',
				minWidth: 180,
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.total_dewi_coryati_voters ?? '-'}</div>;
				}
			},
			{
				Header: 'Suara PAN',
				minWidth: 180,
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.total_pan_voters ?? '-'}</div>;
				}
			},
			...(realcountData?.total_voters_per_party || []).map((item) => ({
				Header: `Suara Total ${item?.party_name}`,
				minWidth: 180,
				Cell: () => {
					return <div className="text-gray-400">{item?.total_party_voters ?? '-'}</div>;
				}
			}))
		],
		[realcountData]
	);

	return <Table loading={isLoading} columns={columns} data={realcountData ? [realcountData] : []} />;
};
