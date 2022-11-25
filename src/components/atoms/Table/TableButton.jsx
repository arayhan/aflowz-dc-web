import { ACTION_TYPES, VARIANT_TYPES } from '@/utils/constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button } from '../Button/Button';

export const TableButton = ({ className, targetPath, action, detailID, onDelete }) => {
	const navigate = useNavigate();

	const variant =
		action === ACTION_TYPES.SEE_DETAIL
			? VARIANT_TYPES.INFO
			: action === ACTION_TYPES.UPDATE
			? VARIANT_TYPES.WARNING
			: action === ACTION_TYPES.DELETE
			? VARIANT_TYPES.DANGER
			: '';

	const handleAction = () => {
		if (action === ACTION_TYPES.SEE_DETAIL) navigate(`${targetPath || location.pathname}/${detailID}`);
		else if (action === ACTION_TYPES.UPDATE) navigate(`${targetPath || location.pathname}/update/${detailID}`);
		else if (action === ACTION_TYPES.DELETE) {
			Swal.fire({
				title: 'Apakah Anda yakin menghapus item ini?',
				icon: 'warning',
				showCancelButton: true
			}).then((result) => {
				if (result.isConfirmed) {
					onDelete();
				}
			});
		}
	};

	return (
		<Button className={`px-3 py-2 rounded-sm text-xs ${className}`} onClick={handleAction} variant={variant}>
			{action === ACTION_TYPES.SEE_DETAIL && 'See Detail'}
			{action === ACTION_TYPES.UPDATE && 'Update'}
			{action === ACTION_TYPES.DELETE && 'Delete'}
		</Button>
	);
};
