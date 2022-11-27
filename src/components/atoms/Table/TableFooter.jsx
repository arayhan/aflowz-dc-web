import ReactPaginate from 'react-paginate';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { InputLabel } from '../InputLabel/InputLabel';
import { PER_PAGE_OPTIONS } from '@/utils/constants';

export const TableFooter = ({ page, setPage, pageCount, perPage, setPerPage }) => {
	return (
		<div className="flex flex-col sm:flex-row gap-6 sm:gap-4 items-center justify-between">
			<div className="sm:w-1/2">
				<div className="flex items-center space-x-2">
					<InputLabel className="text-sm" text="Per Page" name={'per_page'} />
					<select
						className="border-gray-400 rounded-md text-sm"
						onChange={(e) => setPerPage(Number(e.target.value))}
						defaultValue={perPage}
					>
						{PER_PAGE_OPTIONS.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
			</div>
			<div>
				<ReactPaginate
					marginPagesDisplayed={1}
					pageRangeDisplayed={2}
					previousLabel={<GrFormPrevious />}
					nextLabel={<GrFormNext />}
					initialPage={page - 1}
					pageCount={pageCount}
					onPageChange={(item) => {
						setPage(item.selected + 1);
					}}
					containerClassName="flex text-sm space-x-2 items-center justify-center"
					activeLinkClassName="bg-gray-200 text-gray-700"
					breakLinkClassName="block text-gray-500 hover:bg-gray-100 rounded-sm px-3 py-2"
					pageLinkClassName="block text-gray-500 hover:bg-gray-100 rounded-sm px-3 py-2"
					previousLinkClassName="block rounded-sm p-3 hover:bg-gray-100"
					nextLinkClassName="block text-gray-500 rounded-sm p-3 hover:bg-gray-100"
					disabledLinkClassName="opacity-20"
				/>
			</div>
		</div>
	);
};
