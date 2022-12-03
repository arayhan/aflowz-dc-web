import { BannerFeature, TablePenerima } from '@/components/molecules';
import { useProgramStore } from '@/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ListPenerimaByProgram = () => {
	const params = useParams();
	const { programDetail, getProgramDetail } = useProgramStore();

	useEffect(() => {
		getProgramDetail(params.programID);
	}, [params]);

	return (
		<div>
			<BannerFeature
				title={'List Penerima' + ' ' + programDetail?.program_name || 'Program'}
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>
			<div className="bg-gray-100 py-6">
				<div className="py-6 container bg-white rounded-md">
					<TablePenerima
						programID={programDetail?.program_id}
						programName={programDetail?.program_name}
						isReadonly
						isInDetail
					/>
				</div>
			</div>
		</div>
	);
};

export default ListPenerimaByProgram;
