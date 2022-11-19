import { BannerFeature } from '@/components/molecules';
import { useProgramStore } from '@/store';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProgramDetail = () => {
	const params = useParams();
	const { programDetail, fetchingProgramDetail, getProgramDetail } = useProgramStore();

	useEffect(() => {
		getProgramDetail(params.programID);
	}, [params]);

	return (
		<div>
			<BannerFeature
				title={programDetail ? `Program ${programDetail.name}` : 'Program'}
				description={
					programDetail && (
						<div>
							<div>
								{programDetail.program_category.name} - {programDetail.periode}
							</div>
							{programDetail.pic && <div>PIC : {programDetail.pic}</div>}
						</div>
					)
				}
				loading={fetchingProgramDetail}
			/>
		</div>
	);
};

export default ProgramDetail;
