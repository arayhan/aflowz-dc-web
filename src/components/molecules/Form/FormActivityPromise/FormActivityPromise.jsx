import { Button, InputCheckbox, InputText } from '@/components/atoms';
import { InputSelectActivityDetail } from '@/components/molecules';
import { useActivityStore } from '@/store';
import { formActivityPromiseSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

export const FormActivityPromise = () => {
	const { activityDetailID, activityPromiseID } = useParams();
	const navigate = useNavigate();

	const {
		activityItem,
		activityPromiseItem,
		processingCreateActivityPromise,
		fetchingActivityPromiseItem,
		getActivityPromiseItem,
		createActivityPromise,
		updateActivityPromise,
		clearStateActivityPromise
	} = useActivityStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formActivityPromiseSchema),
		defaultValues: {
			name: '',
			activity_detail_id: Number(activityDetailID),
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
		if (activityPromiseID && activityPromiseItem) {
			setValue('name', activityPromiseItem.name || '');
			setValue('realization', activityPromiseItem.realization || false);
		}
	}, [activityPromiseID, activityPromiseItem]);

	useEffect(() => () => clearStateActivityPromise(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{activityPromiseID ? 'Edit' : 'Tambah'} Janji Kegiatan</div>
				<div className="text-sm text-gray-400"></div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				{activityItem && activityDetailID && <InputText label="Kegiatan" value={activityItem.description} disabled />}

				{activityDetailID && (
					<Controller
						name={'activity_detail_id'}
						control={control}
						render={({ field, fieldState: { error } }) => (
							<InputSelectActivityDetail
								{...field}
								disabled
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
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Janji"
							placeholder="Janji"
							disabled={activityPromiseID || processingCreateActivityPromise || fetchingActivityPromiseItem}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'realization'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputCheckbox
							{...field}
							label="Realized?"
							disabled={processingCreateActivityPromise || fetchingActivityPromiseItem}
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
					disabled={processingCreateActivityPromise || fetchingActivityPromiseItem}
					onClick={() => navigate(-1)}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateActivityPromise || fetchingActivityPromiseItem}
					onClick={handleSubmit(onSubmitActivity)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
