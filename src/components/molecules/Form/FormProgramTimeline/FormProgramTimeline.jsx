import { Button, InputDate, InputText } from '@/components/atoms';
import { useProgramStore } from '@/store';
import { formProgramTimelineSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

export const FormProgramTimeline = () => {
	const { programID, programTimelineID } = useParams();
	const {
		programTimeline,
		fetchingProgramTimeline,
		getProgramTimeline,
		createProgramTimeline,
		updateProgramTimeline,
		clearStateProgramTimeline
	} = useProgramStore();
	const navigate = useNavigate();

	const { control, setValue, watch, handleSubmit } = useForm({
		resolver: yupResolver(formProgramTimelineSchema),
		defaultValues: {
			name: '',
			start_date: '',
			end_date: '',
			program_id: programID
		}
	});

	const onSubmitProgramTimeline = (values) => {
		if (programTimelineID) {
			updateProgramTimeline(programTimelineID, values, ({ success }) => {
				if (success) navigate(`/program/${programID}`, { replace: true });
			});
		} else {
			createProgramTimeline(values, ({ success }) => {
				if (success) navigate(`/program/${programID}`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (programTimelineID && programTimeline) {
			setValue('name', programTimeline.name || '');
			setValue('start_date', programTimeline.start_date || '');
			setValue('end_date', programTimeline.end_date || '');
		}
	}, [programTimelineID, programTimeline]);

	useEffect(() => {
		if (programTimelineID && !programTimeline) getProgramTimeline(programTimelineID);
	}, [programTimelineID, programTimeline]);

	useEffect(() => () => clearStateProgramTimeline(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{programTimelineID ? 'Edit' : 'Tambah'} Timeline Program</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText {...field} label="Nama" placeholder="Nama" disabled={fetchingProgramTimeline} error={error} />
					)}
				/>

				<Controller
					name={'start_date'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputDate
							{...field}
							label="Tanggal Mulai"
							placeholder="Tanggal Mulai"
							max={watch('end_date')}
							disabled={fetchingProgramTimeline}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'end_date'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputDate
							{...field}
							label="Tanggal Berakhir"
							placeholder="Tanggal Berakhir"
							min={watch('start_date')}
							disabled={fetchingProgramTimeline}
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
					disabled={fetchingProgramTimeline}
					linkTo={`/program/${programID}`}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={fetchingProgramTimeline}
					onClick={handleSubmit(onSubmitProgramTimeline)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
