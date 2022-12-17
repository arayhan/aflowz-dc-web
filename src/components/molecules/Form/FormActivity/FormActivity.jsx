import { Button, InputText } from '@/components/atoms';
import {
	InputSelectCity,
	InputSelectDistrict,
	InputSelectInstitusi,
	InputSelectProgram,
	InputSelectVillage
} from '@/components/molecules';
import { useActivityStore } from '@/store';
import { formActivitySchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

export const FormActivity = () => {
	const { activityID } = useParams();
	const navigate = useNavigate();

	const { activityItem, fetchingActivity, processingCreateActivity, activityErrors } = useActivityStore();
	const { getActivityItem, createActivity, updateActivity, clearStateActivity } = useActivityStore();

	const { control, setValue, setError, handleSubmit, watch } = useForm({
		resolver: yupResolver(formActivitySchema),
		defaultValues: {
			description: '',
			konstituen_id: undefined,
			village_id: undefined,
			district_id: undefined,
			city_id: undefined,
			program_id: undefined
		}
	});

	const onSubmitActivity = (values) => {
		if (activityID) {
			updateActivity(activityID, values, ({ success }) => {
				if (success) navigate(`/activity/${activityID}`, { replace: true });
			});
		} else {
			createActivity(values, ({ payload, success }) => {
				if (success) navigate(`/activity/${payload.id}`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (activityID) getActivityItem(activityID);
	}, [activityID]);

	useEffect(() => {
		if (activityID && activityItem) {
			setValue('description', activityItem.description || '');
			setValue('konstituen_id', activityItem.konstituen.id || 0);
			setValue('village_id', activityItem.village.id || 0);
			setValue('district_id', activityItem.district.id || 0);
			setValue('city_id', activityItem.city.id || 0);
			setValue('program_id', activityItem.program.id || 0);
		}
	}, [activityID, activityItem]);

	useEffect(() => () => clearStateActivity(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{activityID ? 'Edit' : 'Tambah'} Kegiatan</div>
				<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'description'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Deskripsi Kegiatan"
							placeholder="Deskripsi Kegiatan"
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'konstituen_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectInstitusi
							{...field}
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							onChange={({ value }) => {
								setValue('konstituen_id', value);
								setError('konstituen_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'program_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectProgram
							{...field}
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							onChange={({ value }) => {
								setValue('program_id', value);
								setError('program_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'city_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectCity
							{...field}
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							onChange={({ value }) => {
								setValue('city_id', value);
								setError('city_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'district_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectDistrict
							{...field}
							disabled={!watch('city_id') || processingCreateActivity || fetchingActivity || activityErrors}
							params={watch('city_id') ? { city_id: watch('city_id') } : null}
							onChange={({ value }) => {
								setValue('district_id', value);
								setError('district_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'village_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectVillage
							{...field}
							disabled={!watch('district_id') || processingCreateActivity || fetchingActivity || activityErrors}
							params={watch('district_id') ? { district_id: watch('district_id') } : null}
							onChange={({ value }) => {
								setValue('village_id', value);
								setError('village_id', null);
							}}
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
					disabled={processingCreateActivity || fetchingActivity || activityErrors}
					onClick={() => navigate(-1, { replace: true })}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateActivity || fetchingActivity || activityErrors}
					onClick={handleSubmit(onSubmitActivity)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
