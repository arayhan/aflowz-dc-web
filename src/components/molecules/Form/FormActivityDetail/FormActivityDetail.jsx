import { Button, InputDate, InputText } from '@/components/atoms';
import { InputSelectActivityPromise, InputSelectStaff } from '@/components/molecules';
import { useActivityStore } from '@/store';
import { formActivityDetailSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

export const FormActivityDetail = () => {
	const { activityID, activityDetailID } = useParams();
	const navigate = useNavigate();

	const { activityItem, activityDetailItem, fetchingActivity, processingCreateActivity, activityErrors } =
		useActivityStore();
	const { getActivityDetailItem, createActivity, updateActivity, clearStateActivity } = useActivityStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formActivityDetailSchema),
		defaultValues: {
			activity_id: activityID,
			description: '',
			activity_date: '',
			pic: '',
			pic_mobile: '',
			pic_staff_id: undefined,
			promise_datas: []
		}
	});

	const onSubmitActivity = (values) => {
		console.log({ values });
		if (activityDetailID) {
			updateActivity(activityID, values, ({ success }) => {
				if (success) navigate(`/activity/${activityID}/detail/${activityDetailID}`, { replace: true });
			});
		} else {
			createActivity(values, ({ payload, success }) => {
				if (success) navigate(`/activity/${activityID}/detail/${payload.id}`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (activityDetailID) getActivityDetailItem(activityDetailID);
	}, [activityDetailID]);

	useEffect(() => {
		if (activityDetailID && activityDetailItem) {
			setValue('description', activityDetailItem.description || '');
			setValue('activity_date', activityDetailItem.activity_date || '');
			setValue('pic', activityDetailItem.pic || '');
			setValue('pic_mobile', activityDetailItem.pic_mobile || '');
			setValue('pic_staff_id', activityDetailItem.pic_staff.id || 0);
			setValue('promise_datas', activityDetailItem.promise_datas);
		}
	}, [activityDetailID, activityDetailItem]);

	useEffect(() => () => clearStateActivity(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{activityDetailID ? 'Edit' : 'Tambah'} Detail Kegiatan</div>
				<div className="text-sm text-gray-400">{activityItem?.description}</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'description'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Deskripsi"
							placeholder="Deskripsi"
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'activity_date'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputDate
							{...field}
							label="Tanggal Kegiatan"
							placeholder="Tanggal Kegiatan"
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
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
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							onChange={({ value }) => {
								setValue('pic_staff_id', value);
								setError('pic_staff_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'pic'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama PIC Kegiatan"
							placeholder="Nama PIC Kegiatan"
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'pic_mobile'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nomor Telepon PIC Kegiatan"
							placeholder="Contoh : 08xxxxxxxxxx"
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'promise_datas'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectActivityPromise
							{...field}
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							onChange={(option) => {
								console.log({ option });
								// setValue('promise_datas', value);
								// setError('promise_datas', null);
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
					linkTo={activityID ? `/activity/${activityID}` : '/activity'}
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