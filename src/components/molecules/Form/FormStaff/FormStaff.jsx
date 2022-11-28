import { Button, InputText } from '@/components/atoms';
import { InputSelectCity, InputSelectGender, InputSelectStaffTitle } from '@/components/molecules';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formStaffSchema } from '@/utils/validation-schema';
import { useNavigate, useParams } from 'react-router-dom';
import { usePartnerStore } from '@/store';
import { useEffect } from 'react';

export const FormStaff = () => {
	const { staffID } = useParams();
	const navigate = useNavigate();

	const { staff, fetchingStaff, processingCreateStaff, getStaff, postStaffCreate, updateStaff } = usePartnerStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formStaffSchema),
		defaultValues: {
			nik_number: '',
			name: '',
			address: '',
			city: undefined,
			mobile: '',
			email: '',
			gender: '',
			staff_title: ''
		}
	});

	const onHandleSubmit = (values) => {
		if (staffID) {
			updateStaff(staffID, values, ({ success }) => {
				if (success) navigate(`/staff/${staffID}`);
			});
		} else {
			postStaffCreate(values, ({ payload, success }) => {
				if (success) navigate(`/staff/${payload.id}`);
			});
		}
	};

	useEffect(() => {
		if (staffID) getStaff(staffID);
	}, [staffID]);

	useEffect(() => {
		if (staffID && staff) {
			setValue('nik_number', staff.nik_number || '');
			setValue('name', staff.name || '');
			setValue('address', staff.address || '');
			setValue('city', staff.city?.id || null);
			setValue('mobile', staff.mobile || '');
			setValue('email', staff.email || '');
			setValue('gender', staff.gender || '');
			setValue('staff_title', staff.staff_title?.name || '');
		}
	}, [staffID, staff]);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{staffID ? 'Edit' : 'Create'} Staff</div>
				<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'nik_number'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="NIK"
							placeholder="NIK"
							disabled={staffID || processingCreateStaff || fetchingStaff}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama Staff"
							placeholder="Nama Staff"
							disabled={staffID || processingCreateStaff || fetchingStaff}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'address'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Alamat Domisili"
							placeholder="Alamat Domisili"
							disabled={staffID || processingCreateStaff || fetchingStaff}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'city'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectCity
							{...field}
							disabled={staffID || processingCreateStaff || fetchingStaff}
							onChange={({ value }) => {
								setValue('city', value);
								setError('city', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'mobile'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nomor HP"
							placeholder="08xxxxxxxxxx"
							disabled={processingCreateStaff || fetchingStaff}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'email'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="E-Mail"
							placeholder="E-Mail"
							disabled={processingCreateStaff || fetchingStaff}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'gender'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectGender
							{...field}
							disabled={staffID || processingCreateStaff || fetchingStaff}
							onChange={({ value }) => {
								setValue('gender', value);
								setError('gender', null);
							}}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'staff_title'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectStaffTitle
							{...field}
							disabled={staffID || processingCreateStaff || fetchingStaff}
							onChange={({ value }) => {
								setValue('staff_title', value);
								setError('staff_title', null);
							}}
							error={error}
						/>
					)}
				/>
			</div>
			<hr />
			<div className="flex justify-end">
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateStaff || fetchingStaff}
					onClick={handleSubmit(onHandleSubmit)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
