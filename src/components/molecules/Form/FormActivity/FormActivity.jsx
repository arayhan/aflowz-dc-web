import { Button, InputDate, InputText } from '@/components/atoms';
import {
	InputSelectActivityCategory,
	InputSelectActivityDetail,
	InputSelectCity,
	InputSelectDistrict,
	InputSelectInstitusiAsync,
	InputSelectPartnerAsync,
	InputSelectProgram,
	InputSelectStaff,
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

	const { activityItem, activityDetailItem, fetchingActivity, processingCreateActivity, activityErrors } =
		useActivityStore();
	const { getActivityItem, createActivity, updateActivity, clearStateActivity } = useActivityStore();

	const { control, setValue, setError, handleSubmit, watch } = useForm({
		resolver: yupResolver(formActivitySchema),
		defaultValues: {
			description_activity: '',
			description_activity_detail: '',
			activity_detail_id: undefined,
			konstituen_id: undefined,
			village_id: undefined,
			district_id: undefined,
			city_id: undefined,
			program_id: undefined,
			category_id: undefined,
			partner_id: undefined,
			activity_date: '',
			pic: '',
			pic_mobile: '',
			pic_staff_id: undefined,
			total_participant: undefined,
			item: '',
			total_item: undefined,
			checkout_description: ''
		}
	});

	const onSubmitActivity = (values) => {
		if (activityID) {
			updateActivity(activityID, values, ({ payload, success }) => {
				if (success) navigate(`/activity/${activityID}/detail/${payload?.activity_detail?.id}`, { replace: true });
			});
		} else {
			createActivity(values, ({ payload, success }) => {
				if (success)
					navigate(`/activity/${payload.activity.id}/detail/${payload?.activity_detail?.id}`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (activityID) getActivityItem(activityID);
	}, [activityID]);

	useEffect(() => {
		if (activityID && activityItem) {
			setValue('is_activity_detail', activityItem.activity_details[0]?.id ? true : false);
			setValue('description_activity', activityItem.description || '');
			setValue('description_activity_detail', activityItem?.activity_details[0]?.description || '');
			setValue('activity_detail_id', activityItem?.activity_details[0]?.id || '');
			setValue('konstituen_id', activityItem.konstituen.id || 0);
			setValue('village_id', activityItem.village.id || 0);
			setValue('district_id', activityItem.district.id || 0);
			setValue('city_id', activityItem.city.id || 0);
			setValue('program_id', activityItem.program.id || 0);
			setValue('category_id', activityItem.category.id || 0);
			setValue('partner_id', activityItem.partner.id || 0);
			setValue('activity_date', activityItem?.activity_details[0]?.activity_date || '');
			setValue('pic', activityItem?.activity_details[0]?.pic || '');
			setValue('pic_mobile', activityItem?.activity_details[0]?.pic_mobile || '');
			setValue('pic_staff_id', activityItem?.activity_details[0]?.pic_staff_id.id || 0);
		}
	}, [activityID, activityItem, activityDetailItem]);

	useEffect(() => () => clearStateActivity(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{activityID ? 'Edit' : 'Tambah'} Kegiatan</div>
			</div>
			{!activityID && (
				<>
					<hr />
					<div>
						<Controller
							name={'activity_detail_id'}
							control={control}
							render={({ field, fieldState: { error } }) => (
								<InputSelectActivityDetail
									{...field}
									label="Pilih Detail Kegiatan"
									placeholder="Pilih Detail Kegiatan"
									helper="(Kosongkan apabila ingin menambahkan kegiatan baru)"
									onChange={(option) => {
										const data = option?.data;

										setValue('activity_detail_id', option?.value || 0);
										setValue('description_activity', data?.description || '');
										setValue('konstituen_id', data?.konstituen?.id || 0);
										setValue('village_id', data?.village?.id || 0);
										setValue('district_id', data?.district?.id || 0);
										setValue('city_id', data?.city?.id || 0);
										setValue('program_id', data?.program?.id || 0);
										setValue('category_id', data?.category?.id || 0);

										if (option) setError('activity_detail_id', null);
									}}
									error={error}
								/>
							)}
						/>
					</div>
				</>
			)}

			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				{!watch('activity_detail_id') && (
					<Controller
						name={'description_activity'}
						control={control}
						render={({ field, fieldState: { error } }) => (
							<InputText
								{...field}
								label="Nama Kegiatan"
								placeholder="Nama Kegiatan"
								disabled={processingCreateActivity || fetchingActivity || activityErrors}
								error={error}
							/>
						)}
					/>
				)}
				<Controller
					name={'description_activity_detail'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama Detail Kegiatan"
							placeholder="Nama Detail Kegiatan"
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							error={error}
						/>
					)}
				/>

				{!watch('activity_detail_id') && (
					<>
						<Controller
							name={'program_id'}
							control={control}
							render={({ field, fieldState: { error } }) => (
								<InputSelectProgram
									{...field}
									disabled={processingCreateActivity || fetchingActivity || activityErrors}
									showPeriodeOnLabel
									onChange={({ value }) => {
										setValue('program_id', value);
										setError('program_id', null);
									}}
									error={error}
								/>
							)}
						/>
						<Controller
							name={'category_id'}
							control={control}
							render={({ field, fieldState: { error } }) => (
								<InputSelectActivityCategory
									{...field}
									disabled={processingCreateActivity || fetchingActivity || activityErrors}
									showPeriodeOnLabel
									onChange={({ value }) => {
										setValue('category_id', value);
										setError('category_id', null);
									}}
									error={error}
								/>
							)}
						/>

						<Controller
							name={'konstituen_id'}
							control={control}
							render={({ field, fieldState: { error } }) => (
								<InputSelectInstitusiAsync
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
					</>
				)}

				<Controller
					name={'partner_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectPartnerAsync
							{...field}
							label="Rumah Warga"
							placeholder="Pilih Rumah Warga"
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							onChange={({ value }) => {
								setValue('partner_id', value);
								setError('partner_id', null);
							}}
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
							placeholder="Tanggal"
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
							label="Nama PIC"
							placeholder="Nama PIC"
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
							label="Nomor Telepon PIC"
							placeholder="Contoh : 08xxxxxxxxxx"
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'total_participant'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							type="number"
							label="Jumlah Peserta yang Hadir"
							placeholder="Jumlah Peserta yang Hadir"
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'item'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Barang"
							placeholder="Barang"
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'total_item'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							type="number"
							label="Jumlah Barang"
							placeholder="Jumlah Barang"
							min={0}
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'checkout_description'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Deskripsi Checkout"
							placeholder="Deskripsi Checkout"
							disabled={processingCreateActivity || fetchingActivity || activityErrors}
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
