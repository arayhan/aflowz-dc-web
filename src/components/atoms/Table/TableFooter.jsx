import ReactPaginate from 'react-paginate';
import { TablePerPage } from './TablePerPage';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export const TableFooter = () => {
	return (
		<div className="flex flex-col sm:flex-row gap-6 sm:gap-4 items-center justify-between">
			<div className="sm:w-1/2">
				<TablePerPage />
			</div>
			<div>
				<ReactPaginate
					marginPagesDisplayed={1}
					pageRangeDisplayed={2}
					previousLabel={<GrFormPrevious />}
					nextLabel={<GrFormNext />}
					pageCount={20}
					containerClassName="flex text-sm space-x-2 items-center justify-center"
					activeLinkClassName="bg-gray-200 text-gray-700"
					breakLinkClassName="block text-gray-500 hover:bg-gray-100 rounded-sm px-3 py-2"
					pageLinkClassName="block text-gray-500 hover:bg-gray-100 rounded-sm px-3 py-2"
					previousLinkClassName="block text-gray-500 rounded-sm p-3 hover:bg-gray-100"
					nextLinkClassName="block text-gray-500 rounded-sm p-3 hover:bg-gray-100"
					disabledLinkClassName="text-gray-100"
				/>
			</div>
		</div>
	);
};
