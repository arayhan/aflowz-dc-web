import { Button, ButtonAction } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import React from 'react';

export const DapilBadge = ({ title, dataText, dataLinkTo, onRemove }) => {
	return (
		<div className="inline-flex items-center border p-3 space-x-2 rounded-md">
			<div>{title}</div>
			<ButtonAction text={dataText} action={ACTION_TYPES.SEE_DETAIL} linkTo={dataLinkTo} />
			<Button variant={'danger'} className="text-xs px-3 py-2 rounded-sm" onClick={onRemove}>
				Hapus
			</Button>
		</div>
	);
};
