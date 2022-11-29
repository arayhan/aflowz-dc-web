import { Button, InputText } from '@/components/atoms';
import {
	InputSelectProvince,
	InputSelectCity,
	InputSelectVillage,
	InputSelectGender,
	InputSelectStaffTitle,
	InputSelectReligion
} from '@/components/molecules';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formStaffSchema } from '@/utils/validation-schema';
import { useNavigate, useParams } from 'react-router-dom';
import { usePartnerStore } from '@/store';
import { useEffect, useState } from 'react';

export const FormStaff = () => {
	const { staffID } = useParams();
	const navigate = useNavigate();
	const [getCity, setGetCity] = useState(0);
	const [getVillage, setGetVillage] = useState(0);

	const { staff, fetchingStaff, processingCreateStaff, getStaff, postStaffCreate, updateStaff } = usePartnerStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formStaffSchema),
		defaultValues: {
			nik_number: '',
			name: '',
			birth_place: '',
			birth_date: '',
			gender: '',
			address: '',
			province: undefined,
			city: undefined,
			village: undefined,
			mobile: '',
			email: '',
			religion: '',
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
				if (success) navigate(`/staff/${payload.datas[0].id}`);
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
			setValue('birth_place', staff?.ttl.birth_place || '');
			setValue('birth_date', staff?.ttl.birth_date || '');
			setValue('gender', staff.gender || '');
			setValue('address', staff.address || '');
			setValue('province', staff.province?.id || null);
			setValue('city', staff.city?.id || null);
			setValue('village', staff.village?.id || null);
			setValue('mobile', staff.mobile || '');
			setValue('email', staff.email || '');
			setValue('religion', staff.religion || '');
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
					name={'birth_place'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Kota Tempat Lahir"
							placeholder="Kota Tempat Lahir"
							disabled={staffID || processingCreateStaff || fetchingStaff}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'birth_date'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Tanggal Lahir"
							placeholder="Tahun-Bulan-Tanggal (yyyy-MM-dd)"
							disabled={staffID || processingCreateStaff || fetchingStaff}
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
					name={'address'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Alamat Domisili"
							placeholder="Alamat Domisili"
							disabled={processingCreateStaff || fetchingStaff}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'province'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectProvince
							{...field}
							disabled={staffID || processingCreateStaff || fetchingStaff}
							onChange={({ value }) => {
								setValue('province', value);
								setError('province', null);
								setGetCity(value);
							}}
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
							feature="Kota Domisili"
							disabled={staffID || processingCreateStaff || fetchingStaff}
							onChange={({ value }) => {
								setValue('city', value);
								setError('city', null);
								setGetVillage(value);
							}}
							error={error}
							provinceID={getCity}
						/>
					)}
				/>

				<Controller
					name={'village'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectVillage
							{...field}
							disabled={staffID || processingCreateStaff || fetchingStaff}
							onChange={({ value }) => {
								setValue('village', value);
								setError('village', null);
							}}
							error={error}
							cityID={getVillage}
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
					name={'religion'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectReligion
							{...field}
							disabled={staffID || processingCreateStaff || fetchingStaff}
							onChange={({ value }) => {
								setValue('religion', value);
								setError('religion', null);
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
							disabled={processingCreateStaff || fetchingStaff}
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
