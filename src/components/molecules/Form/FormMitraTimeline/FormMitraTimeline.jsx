import { Button, InputDate, InputText } from '@/components/atoms';
import { useProgramStore } from '@/store';
import { formMitraTimelineSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

export const FormMitraTimeline = () => {
	const { programCategoryID, programCategoryTimelineID } = useParams();
	const {
		programCategoryTimeline,
		fetchingProgramCategoryTimeline,
		getProgramCategoryTimeline,
		createProgramCategoryTimeline,
		updateProgramCategoryTimeline,
		clearStateProgramCategoryTimeline
	} = useProgramStore();
	const navigate = useNavigate();

	const { control, setValue, handleSubmit } = useForm({
		resolver: yupResolver(formMitraTimelineSchema),
		defaultValues: {
			name: '',
			date: '',
			program_category_id: programCategoryID
		}
	});

	const onSubmitProgramCategoryTimeline = (values) => {
		if (programCategoryTimelineID) {
			updateProgramCategoryTimeline(programCategoryTimelineID, values, ({ success }) => {
				if (success) navigate(`/mitra/${programCategoryID}`, { replace: true });
			});
		} else {
			createProgramCategoryTimeline(values, ({ success }) => {
				if (success) navigate(`/mitra/${programCategoryID}`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (programCategoryTimelineID && programCategoryTimeline) {
			setValue('name', programCategoryTimeline.name || '');
			setValue('date', programCategoryTimeline.date || '');
		}
	}, [programCategoryTimelineID, programCategoryTimeline]);

	useEffect(() => {
		if (!programCategoryTimeline) getProgramCategoryTimeline(programCategoryTimelineID);
	}, [programCategoryTimelineID, programCategoryTimeline]);

	useEffect(() => () => clearStateProgramCategoryTimeline(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{programCategoryTimelineID ? 'Edit' : 'Tambah'} Timeline Mitra</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama"
							placeholder="Nama"
							disabled={fetchingProgramCategoryTimeline}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'date'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputDate
							{...field}
							label="Tanggal"
							placeholder="Tanggal"
							disabled={fetchingProgramCategoryTimeline}
							error={error}
						/>
					)}
				/>
			</div>
			<hr />
			<div className="flex justify-end">
				<Button
					className={'px-7 py-3 rounded-sm mx-2'}
					variant="warning"
					disabled={fetchingProgramCategoryTimeline}
					linkTo={`/mitra/${programCategoryID}`}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={fetchingProgramCategoryTimeline}
					onClick={handleSubmit(onSubmitProgramCategoryTimeline)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
