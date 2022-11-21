import { BannerFeature } from '@/components/molecules';
import { FormProgram } from '@/components/sections';
import React from 'react';

const ProgramForm = () => {
	return (
		<div>
			<BannerFeature title="Program - Create" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div>
				<FormProgram />
			</div>
		</div>
	);
};

export default ProgramForm;
