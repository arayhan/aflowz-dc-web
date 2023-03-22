import { BannerFeature, TableProposalKonstituen } from '@/components/molecules';
import React from 'react';
import { useParams } from 'react-router-dom';

const Proposal = () => {
	const { konstituenID } = useParams();

	return (
		<div>
			<BannerFeature title="List Proposal Institusi" />
			<div className="bg-gray-100">
				<div className="container py-6">
					<TableProposalKonstituen isShowButtonSeeAll={false} konstituenID={konstituenID} />
				</div>
			</div>
		</div>
	);
};

export default Proposal;
