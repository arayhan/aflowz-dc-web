import { useKonstituenStore } from '@/store';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

export const KonstituenType = ({ selectedType, onSelectedType }) => {
	const { konstituenList, getKonstituenList } = useKonstituenStore();

	const [selectedKonstituen, setSelectedKonstituen] = useState('');

	return (
		<div className="bg-white rounded-md">
			<div>
				<div className="container space-y-3 text-left 2xl:text-center pt-6 pb-4">
					<div className="text-xl md:text-2xl font-extralight">Pilih Konstitusi</div>
				</div>
				{konstituenList === null && (
					<div className="container max-w-screen-md pb-6">
						<Skeleton inline containerClassName="grid grid-cols-3 gap-3" height={50} count={3} />
					</div>
				)}
				<div className="container">
					<div className="overflow-x-auto pb-4 md:pb-6 flex 2xl:justify-center gap-3">
						<button
							className={`w-[200px] min-w-[200px] lg:w-[250px] lg:min-w-[250px] flex items-center text-left border px-2 py-2 rounded-md cursor-pointer space-x-2 ${
								selectedKonstituen === 'sekolah'
									? 'bg-primary-500  border-primary-500 hover:bg-primary-500 text-white'
									: 'text-gray-400 hover:bg-gray-100'
							}`}
							onClick={
								selectedKonstituen === 'sekolah'
									? () => {
											onSelectedType(null);
											setSelectedKonstituen('');
									  }
									: () => {
											onSelectedType({ konstituen_type: 'sekolah' });
											setSelectedKonstituen('sekolah');
									  }
							}
						>
							<img className="w-10" src={require('@/images/icons/box.svg').default} alt="" />
							<div className="text-md">Sekolah</div>
						</button>
						<button
							className={`w-[200px] min-w-[200px] lg:w-[250px] lg:min-w-[250px] flex items-center text-left border px-2 py-2 rounded-md cursor-pointer space-x-2 ${
								selectedKonstituen === 'kampus'
									? 'bg-primary-500  border-primary-500 hover:bg-primary-500 text-white'
									: 'text-gray-400 hover:bg-gray-100'
							}`}
							onClick={
								selectedKonstituen === 'kampus'
									? () => {
											onSelectedType(null);
											setSelectedKonstituen('');
									  }
									: () => {
											onSelectedType({ konstituen_type: 'kampus' });
											setSelectedKonstituen('kampus');
									  }
							}
						>
							<img className="w-10" src={require('@/images/icons/box.svg').default} alt="" />
							<div className="text-md">Kampus</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
