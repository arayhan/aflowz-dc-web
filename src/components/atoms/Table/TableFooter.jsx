import { SiGooglesheets } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { TablePerPage } from './TablePerPage';

export const TableFooter = () => {
	return (
		<div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
			<div className="w-1/2">
				<TablePerPage />
			</div>
			<div>Coming Soon</div>
		</div>
	);
};
