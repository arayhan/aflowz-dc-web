import { ButtonAction, Table } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { useMemo } from 'react';
import { InputSelectStaffTitle } from '../../InputSelect/InputSelectStaffTitle/InputSelectStaffTitle';
import { TableSelectRoleForm } from './TableSelectRoleForm';

export const TableSelectRole = ({ onRemoveRole, onAddRole, onUpdateRole, selectedRoles, disabled }) => {
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
				Header: 'Role',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return (
						<InputSelectStaffTitle
							showLabel={false}
							clearable={false}
							onChange={(values) => onUpdateRole({ staff_title_id: values.value }, Number(row.row.id))}
							value={data.staff_title_id}
						/>
					);
				}
			},
			{
				Header: 'Detail Role',
				accessor: 'branch_title',
				minWidth: 150
			},
			{
				Header: 'Action',
				Cell: (row) => (
					<ButtonAction
						className="min-w-[100px] w-full"
						action={ACTION_TYPES.DELETE}
						showAlert={false}
						onClick={() => onRemoveRole(Number(row.row.id))}
					/>
				)
			}
		],
		[selectedRoles]
	);

	return (
		<div className="space-y-5">
			<div className="text-xl font-light">Pilih Role</div>
			<TableSelectRoleForm onSubmit={onAddRole} disabled={disabled} />
			<Table columns={columns} data={selectedRoles} />
		</div>
	);
};
