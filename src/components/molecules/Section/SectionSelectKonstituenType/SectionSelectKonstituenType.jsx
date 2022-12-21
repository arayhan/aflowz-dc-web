import { useKonstituenStore } from '@/store';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { InputSelectInstitusiType } from '../../index';

export const SectionSelectKonstituenType = ({ onSelectedType }) => {
	const { konstituenList } = useKonstituenStore();

	const listTipe = [
		{ id: 1, name: 'Sekolah', value: 'sekolah' },
		{ id: 2, name: 'Perguruan Tinggi', value: 'kampus' },
		{ id: 3, name: 'Sektor Pariwisata dan Ekonomi Kreatif', value: 'parekraf' },
		{ id: 4, name: 'Sektor Olahraga dan Seni', value: 'olahragaseni' },
		{ id: 5, name: 'Perangkat KOKADES', value: 'kokades' },
		{ id: 6, name: 'Lainnya', value: 'lainnya' }
	];

	const [selectedKonstituen, setSelectedKonstituen] = useState('');

	return (
		<div className="bg-white rounded-md">
			<div>
				<div className="container space-y-3 text-left 2xl:text-center pt-6 pb-4">
					<div className="text-xl md:text-2xl font-extralight">Pilih Jenis Institusi</div>
				</div>
				{konstituenList === null && (
					<div className="container max-w-screen-md pb-6">
						<Skeleton inline containerClassName="grid grid-cols-3 gap-3" height={50} count={3} />
					</div>
				)}
				<div className="container block md:hidden">
					<div className="flex items-end">
						<div className="w-full sm:w-1/2">
							<InputSelectInstitusiType
								value={selectedKonstituen}
								onChange={({ label, value }) => {
									onSelectedType({ konstituen_type: value, label: label });
									setSelectedKonstituen(value);
								}}
							/>
						</div>
						<button
							type="button"
							className="px-3 hover:underline"
							onClick={() => {
								onSelectedType(null);
								setSelectedKonstituen('');
							}}
						>
							Reset
						</button>
					</div>
				</div>
				{listTipe.length > 0 && (
					<div className="hidden px-[5rem] 2xl:px-0 md:block">
						<div className="overflow-x-auto pb-4 md:pb-6 flex 2xl:justify-center gap-3">
							{listTipe.map((tipe, idx) => {
								return (
									<button
										key={tipe.id}
										className={`w-[200px] min-w-[200px] lg:w-[250px] lg:min-w-[250px] flex items-center text-left border px-2 py-2 rounded-md cursor-pointer space-x-2 ${
											selectedKonstituen === tipe.name
												? 'bg-primary-500  border-primary-500 hover:bg-primary-500 text-white'
												: 'text-gray-400 hover:bg-gray-100'
										}`}
										onClick={
											selectedKonstituen === tipe.name
												? () => {
														onSelectedType(null);
														setSelectedKonstituen('');
												  }
												: () => {
														onSelectedType({ konstituen_type: tipe.value, label: tipe.name });
														setSelectedKonstituen(tipe.name);
												  }
										}
									>
										<img className="w-10" src={require('@/images/icons/box.svg').default} alt="" />
										<div className="text-md transform: capitalize">{tipe.name}</div>
									</button>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
