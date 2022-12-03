import { BannerFeature, SectionSelectProgram, TablePenerima } from '@/components/molecules';
import { useState } from 'react';

const Penerima = () => {
	const [selectedProgram, setSelectedProgram] = useState(null);

	return (
		<div>
			<BannerFeature title="Penerima" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<div className="py-6 container">
					<TablePenerima programID={selectedProgram?.id} programName={selectedProgram?.name} />
				</div>
			</div>
		</div>
	);
};

export default Penerima;
