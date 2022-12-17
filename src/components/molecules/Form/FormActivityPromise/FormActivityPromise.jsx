import { Button, InputCheckbox, InputText } from '@/components/atoms';
import { InputSelectActivityDetail } from '@/components/molecules';
import { useActivityStore } from '@/store';
import { formActivityPromiseSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

export const FormActivityPromise = () => {
	const { activityID, activityPromiseID } = useParams();
	const navigate = useNavigate();

	const {
		activityItem,
		activityPromise,
		processingCreateActivityPromise,
		fetchingActivityPromiseItem,
		errorsActivityPromise,
		getActivityItem,
		getActivityPromiseItem,
		createActivityPromise,
		updateActivityPromise,
		clearStateActivityPromise
	} = useActivityStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formActivityPromiseSchema),
		defaultValues: {
			name: '',
			activity_detail_id: undefined,
			realization: false
		}
	});

	const onSubmitActivity = (values) => {
		if (activityPromiseID) {
			updateActivityPromise(activityPromiseID, values, ({ success }) => {
				if (success) navigate(-1, { replace: true });
			});
		} else {
			createActivityPromise(values, ({ success }) => {
				if (success) navigate(-1, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (activityPromiseID) getActivityPromiseItem(activityPromiseID);
	}, [activityPromiseID]);

	useEffect(() => {
		if (activityPromiseID && activityPromise) {
			setValue('name', activityPromise.name || '');
			setValue('activity_detail_id', activityPromise.activity_detail.id || 0);
			setValue('realization', activityPromise.realization || false);
		}
	}, [activityPromiseID, activityPromise]);

	useEffect(() => () => clearStateActivityPromise(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{activityPromiseID ? 'Edit' : 'Tambah'} Janji Kegiatan</div>
				<div className="text-sm text-gray-400"></div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Janji"
							placeholder="Janji"
							disabled={processingCreateActivityPromise || fetchingActivityPromiseItem || errorsActivityPromise}
							error={error}
						/>
					)}
				/>

				{activityPromiseID && (
					<Controller
						name={'activity_detail_id'}
						control={control}
						render={({ field, fieldState: { error } }) => (
							<InputSelectActivityDetail
								{...field}
								disabled={processingCreateActivityPromise || fetchingActivityPromiseItem || errorsActivityPromise}
								onChange={({ value }) => {
									setValue('activity_detail_id', value);
									setError('activity_detail_id', null);
								}}
								error={error}
							/>
						)}
					/>
				)}

				<Controller
					name={'realization'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputCheckbox
							{...field}
							label="Realized?"
							disabled={processingCreateActivityPromise || fetchingActivityPromiseItem || errorsActivityPromise}
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
					disabled={processingCreateActivityPromise || fetchingActivityPromiseItem || errorsActivityPromise}
					onClick={() => navigate(-1)}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateActivityPromise || fetchingActivityPromiseItem || errorsActivityPromise}
					onClick={handleSubmit(onSubmitActivity)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
