import { BannerFeature, TableKonstituen } from '@/components/molecules';
import { KonstituenType } from '@/components/sections';
import { useState } from 'react';

const Konstituen = () => {
	const [selectedKonstituen, setSelectedKonstituen] = useState(null);

	return (
		<div>
			<BannerFeature title="Konstituen" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className='bg-gray-100'>
				<KonstituenType selectedType={selectedKonstituen} onSelectedType={(type) => setSelectedKonstituen(type)} />
				<div className='py-6 container'>
					<TableKonstituen selectedType={selectedKonstituen} />
				</div>
			</div>
		</div>
	);
};

export default Konstituen;
