import { BannerFeature, TableKonstituen, SectionSelectKonstituenType } from '@/components/molecules';
import { useState } from 'react';

const Konstituen = () => {
	const [selectedKonstituen, setSelectedKonstituen] = useState(null);

	return (
		<div>
			<BannerFeature title="List Institusi" />
			<div className="bg-gray-100">
				<SectionSelectKonstituenType
					selectedType={selectedKonstituen}
					onSelectedType={(type) => setSelectedKonstituen(type)}
				/>
				<div className="py-6 container">
					<TableKonstituen selectedType={selectedKonstituen} />
				</div>
			</div>
		</div>
	);
};

export default Konstituen;
