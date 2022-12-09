import { Button } from '@/components/atoms';
import React from 'react';

export const DapilBadge = ({ title, dataText, onRemove }) => {
	return (
		<div className="inline-flex items-center border p-2 space-x-2 rounded-md text-sm">
			<div>{title}</div>
			<div className="font-semibold">{dataText}</div>
			<Button variant={'danger'} className="text-xs px-3 py-2 rounded-sm" onClick={onRemove}>
				Hapus
			</Button>
		</div>
	);
};
