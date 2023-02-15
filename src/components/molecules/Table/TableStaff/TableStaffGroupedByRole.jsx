import { TableHeader } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { useState } from 'react';
import { SectionShortcutStaffTitle } from '../../Section/SectionShortcutStaffTitle/SectionShortcutStaffTitle';

export const TableStaffGroupedByRole = () => {
	const { isSystem, isAdmin } = useAuthStore();
	const { fetchingStaffList, staffList, getStaffList, deleteStaff } = usePartnerStore();

	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);

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
				<SectionShortcutStaffTitle />
			</div>
		</div>
	);
};
