import { usePartnerStore } from '@/store';
import { addQueryParams, removeQueryParams } from '@/utils/helpers';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SectionShortcutStaffTitle = ({ selectedShortcut }) => {
	const navigate = useNavigate();

	const { fetchingStaffTitleList, staffTitleList, getStaffTitleList } = usePartnerStore();

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		navigate('/staff' + updatedParams, { replace: true });
	};

	const handleSelectShortcut = (shortcut) => {
		handleSetFilter('staff_title', selectedShortcut !== shortcut ? { staff_title: shortcut } : null);
	};

	useEffect(() => {
		getStaffTitleList();
	}, []);

	return (
		<section className="w-full bg-white rounded-md shadow-md">
			<div>
				<div className="container pt-5 pb-3 space-y-3 text-left 2xl:text-center">
					<div className="text-xl md:text-2xl font-extralight">Pilih Role</div>
				</div>
				<div className="container">
					<div className="flex gap-3 pb-4 overflow-x-scroll md:pb-6 2xl:justify-center">
						{!fetchingStaffTitleList &&
							staffTitleList?.items.length > 0 &&
							staffTitleList?.items.map((shortcut) => (
								<button
									key={shortcut.id}
									className={`w-[200px] min-w-[200px] lg:w-[250px] lg:min-w-[250px] flex items-center text-left border px-2 py-2 rounded-md cursor-pointer space-x-2 ${
										selectedShortcut && decodeURI(selectedShortcut) === shortcut.name
											? 'bg-primary-500  border-primary-500 hover:bg-primary-500 text-white'
											: 'text-gray-400 hover:bg-gray-100'
									}`}
									onClick={() => handleSelectShortcut(shortcut.name)}
								>
									<img className="w-10" src={require('@/images/icons/box.svg').default} alt="" />
									<div className="text-xs">
										{shortcut.parent && <span>{shortcut.parent.name} - </span>}
										<span>{shortcut.name}</span>
									</div>
								</button>
							))}
					</div>
				</div>
			</div>
		</section>
	);
};
