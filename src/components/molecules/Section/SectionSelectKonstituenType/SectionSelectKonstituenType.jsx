import { INSTITUSI_TYPE_ARRAY } from '@/utils/constants';
import { addQueryParams, removeQueryParams } from '@/utils/helpers';
import { useNavigate } from 'react-router-dom';

export const SectionSelectKonstituenType = ({ selectedKonstituen }) => {
	const navigate = useNavigate();

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		navigate('/institusi' + updatedParams, { replace: true });
	};

	const handleSelectKonstituenType = (konstituen) => {
		handleSetFilter('konstituen_type', selectedKonstituen !== konstituen ? { konstituen_type: konstituen } : null);
	};

	return (
		<div className="bg-white rounded-md">
			<div>
				<div className="container space-y-3 text-left 2xl:text-center pt-6 pb-4">
					<div className="text-xl md:text-2xl font-extralight">Pilih Jenis Institusi</div>
				</div>

				<div className="hidden px-[5rem] 2xl:px-0 md:block">
					<div className="overflow-x-auto pb-4 md:pb-6 flex 2xl:justify-center gap-3">
						{INSTITUSI_TYPE_ARRAY.map((konstituen) => {
							return (
								<button
									key={konstituen.value}
									className={`w-[200px] min-w-[200px] lg:w-[250px] lg:min-w-[250px] flex items-center text-left border px-2 py-2 rounded-md cursor-pointer space-x-2 ${
										selectedKonstituen === konstituen.value
											? 'bg-primary-500  border-primary-500 hover:bg-primary-500 text-white'
											: 'text-gray-400 hover:bg-gray-100'
									}`}
									onClick={() => handleSelectKonstituenType(konstituen.value)}
								>
									<img className="w-10" src={require('@/images/icons/box.svg').default} alt="" />
									<div className="text-xs">{konstituen.label}</div>
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
