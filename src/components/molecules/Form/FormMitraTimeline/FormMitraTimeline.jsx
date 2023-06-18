import { Button, InputDate, InputText } from '@/components/atoms';
import { InputSelectStaff, InputSelectTimelineStatus } from '@/components/molecules';
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

	const { control, setValue, watch, handleSubmit } = useForm({
		resolver: yupResolver(formMitraTimelineSchema),
		defaultValues: {
			name: '',
			start_date: '',
			end_date: '',
			description: '',
			target_receiver: '',
			location: '',
			pic_staff_id: undefined,
			status: '',
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
			setValue('start_date', programCategoryTimeline.start_date || '');
			setValue('end_date', programCategoryTimeline.end_date || '');
			setValue('description', programCategoryTimeline.description || '');
			setValue('target_receiver', programCategoryTimeline.target_receiver || '');
			setValue('pic_staff_id', programCategoryTimeline.pic_staff?.id || undefined);
			setValue('location', programCategoryTimeline.location || '');
			setValue('status', programCategoryTimeline.status || '');
		}
	}, [programCategoryTimelineID, programCategoryTimeline]);

	useEffect(() => {
		if (programCategoryTimelineID && !programCategoryTimeline) getProgramCategoryTimeline(programCategoryTimelineID);
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
							label="Nama Timeline"
							placeholder="Nama Timeline"
							disabled={fetchingProgramCategoryTimeline}
							error={error}
						/>
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
							disabled={fetchingProgramCategoryTimeline}
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
							disabled={fetchingProgramCategoryTimeline}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'target_receiver'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							type="number"
							label="Jumlah Target Penerima"
							placeholder="Jumlah Target Penerima"
							disabled={fetchingProgramCategoryTimeline}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'pic_staff_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectStaff
							{...field}
							params={{ limit: 1000 }}
							disabled={fetchingProgramCategoryTimeline}
							onChange={({ value }) => {
								setValue('pic_staff_id', value);
								setError('pic_staff_id', null);
							}}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'status'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectTimelineStatus
							{...field}
							disabled={fetchingProgramCategoryTimeline}
							onChange={({ value }) => {
								setValue('status', value);
								setError('status', null);
							}}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'location'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Lokasi"
							placeholder="Lokasi"
							disabled={fetchingProgramCategoryTimeline}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'description'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Deskripsi"
							placeholder="Deskripsi"
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
