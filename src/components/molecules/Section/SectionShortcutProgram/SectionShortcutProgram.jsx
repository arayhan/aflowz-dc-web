import { addQueryParams, removeQueryParams } from '@/utils/helpers';
import { useNavigate } from 'react-router-dom';

export const SectionShortcutProgram = ({ selectedShortcut }) => {
	const navigate = useNavigate();

	const SHORTCUTS = ['PIP', 'KIP'];

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		navigate('/program' + updatedParams, { replace: true });
	};

	const handleSelectShortcut = (shortcut) => {
		handleSetFilter('keyword', selectedShortcut !== shortcut ? { keyword: shortcut } : null);
	};

	return (
		<section className="bg-white rounded-md">
			<div>
				<div className="container space-y-3 text-left 2xl:text-center pt-6 pb-4">
					<div className="text-xl md:text-2xl font-extralight">Shortcut</div>
				</div>
				<div className="container">
					<div className="overflow-x-scroll pb-4 md:pb-6 flex 2xl:justify-center gap-3">
						{SHORTCUTS.map((shortcut) => (
							<button
								key={shortcut}
								className={`w-[200px] min-w-[200px] lg:w-[250px] lg:min-w-[250px] flex items-center text-left border px-2 py-2 rounded-md cursor-pointer space-x-2 ${
									selectedShortcut && selectedShortcut === shortcut
										? 'bg-primary-500  border-primary-500 hover:bg-primary-500 text-white'
										: 'text-gray-400 hover:bg-gray-100'
								}`}
								onClick={() => handleSelectShortcut(shortcut)}
							>
								<img className="w-10" src={require('@/images/icons/box.svg').default} alt="" />
								<div className="text-xs">{shortcut}</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
