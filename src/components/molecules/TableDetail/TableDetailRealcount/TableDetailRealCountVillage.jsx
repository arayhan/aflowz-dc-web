import { Table } from '@/components/atoms';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableDetailRealCountVillage = ({ isLoading, realcountVillageData }) => {
	const navigate = useNavigate();

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
				Header: 'Nama Daerah',
				minWidth: 180,
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.village_name ?? '-'}</div>;
				}
			},
			{
				Header: 'Jumlah TPS',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.total_legitimate_vote ?? '-'}</div>;
				}
			},
			{
				Header: 'Jumlah DPT',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.total_legitimate_vote ?? '-'}</div>;
				}
			},
			{
				Header: 'Target Suara',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.total_legitimate_vote ?? '-'}</div>;
				}
			},
			{
				Header: 'Suara Sah',
				minWidth: 150,
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
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return <div className="text-gray-400">{data?.total_pan_voters ?? '-'}</div>;
				}
			},
			{
				Header: 'Suara Partai Lain',
				minWidth: 220,
				Cell: (row) => {
					const data = row.row.original;
					return data.total_voters_per_party ? (
						<ul className="pl-5 list-disc">
							{data.total_voters_per_party.map((item) => (
								<li key={item.party_id}>
									<span className="font-semibold">{item.party_name}</span>: {item.total_party_voters}
								</li>
							))}
						</ul>
					) : (
						'-'
					);
				}
			}
		],
		[realcountVillageData]
	);

	return (
		<Table
			loading={isLoading}
			columns={columns}
			onClickRow={(data) => navigate(`/realcount/village/${data.village_id}`)}
			data={realcountVillageData}
		/>
	);
};
