import { Table } from '@/components/atoms';
import { useTPSStore } from '@/store';
import React, { useMemo } from 'react';

export const TableDetailRealCount = ({ TPSID, isLoading, realcountData }) => {
	const { getTPSItem, processingUpdateTPSPartyVotes, updateTPSPartyVotes } = useTPSStore();

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
					return <div className="text-gray-400">{data?.total_dc_voters ?? '-'}</div>;
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
			...(realcountData?.party_votes || []).map((party_voter) => ({
				Header: `Suara Total ${party_voter?.party.name}`,
				minWidth: 180,
				Cell: () => {
					const handleUpdate = async (e) => {
						const { value } = e.target;

						if (value !== party_voter.total_voters) {
							const params = {
								party_id: party_voter.party.id,
								total_voters: value
							};
							await updateTPSPartyVotes(party_voter.id, params);
							await getTPSItem(TPSID);
						}
					};

					return processingUpdateTPSPartyVotes ? (
						<div>Loading...</div>
					) : (
						<div className="text-gray-400">
							{party_voter?.total_voters >= 0 ? (
								<input
									type="number"
									className="p-0 border-0"
									defaultValue={party_voter.total_voters}
									onBlur={handleUpdate}
								/>
							) : (
								'-'
							)}
						</div>
					);
				}
			}))
		],
		[realcountData]
	);

	return <Table loading={isLoading} columns={columns} data={realcountData ? [realcountData] : []} />;
};
