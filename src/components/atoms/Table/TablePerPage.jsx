import { InputLabel } from '@/components/atoms';
import { useTableContext } from '@/contexts';
import { forwardRef } from 'react';

export const TablePerPage = forwardRef(({ error, value, disabled, onChange, ...props }, ref) => {
	const { perPage, perPageOptions: options, setPerPage } = useTableContext();

	return (
		<div className="flex items-center space-x-2">
			<InputLabel className="text-sm" text="Per Page" name={props.name} />
			<select
				ref={ref}
				className="border-gray-400 rounded-md text-sm"
				onChange={(e) => setPerPage(e.target.value)}
				defaultValue={perPage}
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
});

TablePerPage.displayName = 'TablePerPage';
