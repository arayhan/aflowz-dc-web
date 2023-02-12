import { ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { ACTION_TYPES } from '@/utils/constants';
import { FiChevronDown } from 'react-icons/fi';

export const TableStaffGroupedByRole = () => {
	const { isSystem, isAdmin } = useAuthStore();
	const { fetchingStaffTitleList, staffTitleList, getStaffTitleList } = usePartnerStore();
	const { fetchingStaffList, staffList, getStaffList, deleteStaff } = usePartnerStore();

	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [expandedTitleIDs, setExpandedTitleIDs] = useState([]);

	const handleExpandable = (id) => {
		if (expandedTitleIDs.includes(id)) {
			setExpandedTitleIDs(expandedTitleIDs.filter((titleID) => titleID !== id));
		} else {
			setExpandedTitleIDs([...expandedTitleIDs, id]);
		}
	};

	useEffect(() => {
		getStaffTitleList();
	}, []);

	return (
		<div className="w-full bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					title="Daftar Tim Internal"
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isAdmin}
					showButtonCreate={true}
					feature={'Tim Internal'}
					featurePath="/staff"
				/>
			</div>
			<hr />
			<div className="overflow-x-auto">
				{!fetchingStaffTitleList &&
					staffTitleList?.items.length > 0 &&
					staffTitleList?.items.map((staffTitle) => {
						const expanded = expandedTitleIDs.includes(staffTitle.id);
						return (
							<div key={staffTitle.id} className="border-b">
								<div
									className={`flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-gray-100 transition-all ${
										expanded ? 'border-b bg-gray-100' : ''
									}`}
									onClick={() => handleExpandable(staffTitle.id)}
								>
									<div className="font-light">{staffTitle.name}</div>
									<div className="flex items-end w-8">
										<FiChevronDown className={`transform transition-all ${expanded ? '-rotate-180' : ''}`} size={20} />
									</div>
								</div>
								{expanded && (
									<div className="px-6 py-3">
										Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi expedita repellat praesentium
										repellendus voluptatem sunt modi nulla voluptatibus incidunt. Dolore, numquam. Ut consequuntur
										quaerat placeat minus alias eius, laudantium consequatur.
									</div>
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
};
