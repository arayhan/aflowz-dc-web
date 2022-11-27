import { BannerFeature, SectionSelectProgram, TablePartner } from '@/components/molecules';
import { useState } from 'react';

const Partner = () => {
	const [selectedProgram, setSelectedProgram] = useState(null);

	return (
		<div>
			<BannerFeature title="Partner" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<SectionSelectProgram
					selectedProgram={selectedProgram}
					onSelectProgram={(program) => setSelectedProgram(program)}
				/>
				<div className="py-6 container">
					<TablePartner programID={selectedProgram?.id} programName={selectedProgram?.name} />
				</div>
			</div>
		</div>
	);
};

export default Partner;
