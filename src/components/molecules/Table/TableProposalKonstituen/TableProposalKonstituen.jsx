import { ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useKonstituenStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import React, { useEffect, useMemo, useState } from 'react';

export const TableProposalKonstituen = ({
	params,
	title,
	konstituenID,
	isReadonly,
	isShowFooter,
	displayedColumns,
	isShowButtonSeeAll
}) => {
	const { isSystem } = useAuthStore();
	const { proposalList, fetchingProposalList, getProposalList, deleteProposal } = useKonstituenStore();

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);

	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				hidden: displayedColumns && !displayedColumns.includes('#'),
				Cell: (row) => <div className="text-gray-400">{Number(row.row.id) + offset + 1}</div>
			},
			{
				Header: 'Usulan',
				width: '100%',
				hidden: displayedColumns && !displayedColumns.includes('Usulan'),
				Cell: (row) => {
					return <div className="text-sm">{row.row.original.name}</div>;
				}
			},
			{
				Header: 'Actions',
				minWidth: 220,
				hidden: !isSystem || isReadonly,
				Cell: (row) => {
					return (
						<div className="grid grid-cols-2 gap-2">
							<ButtonAction
								action={ACTION_TYPES.UPDATE}
								linkTo={`/institusi/${konstituenID}/proposal/update/${row.row.original.id}`}
							/>
							<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteProposal(row.row.original.id)} />
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult };

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(Math.abs(offsetResult));
			getProposalList({ ...defaultParams, ...params });
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		if (proposalList) {
			setData(proposalList.items);
			setPageCount(Math.ceil(proposalList.total / perPage));
		}
	}, [proposalList]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					feature="Usulan"
					featurePath={`/institusi/${konstituenID}/proposal`}
					title={title || 'Usulan'}
					isReadonly={!isSystem || isReadonly}
					showButtonSeeAll={isShowButtonSeeAll}
					seeAllLink={`/institusi/${konstituenID}/proposal`}
				/>
			</div>

			<hr />

			<div className="overflow-x-scroll">
				<Table columns={columns} data={data} loading={fetchingProposalList || proposalList === null} />
			</div>

			{isShowFooter && (
				<div className="p-6">
					<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
				</div>
			)}
		</div>
	);
};

TableProposalKonstituen.defaultProps = {
	isShowFooter: true,
	isShowButtonSeeAll: true
};
