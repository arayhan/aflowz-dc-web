import { Button, InputLabel, InputText, InputError } from '@/components/atoms';
import {
	InputSelectProvince,
	InputSelectCity,
	InputSelectDistrict,
	InputSelectGender,
	InputSelectStaffTitle,
	InputSelectReligion,
	InputSelectDate
} from '@/components/molecules';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formStaffSchema } from '@/utils/validation-schema';
import { useNavigate, useParams } from 'react-router-dom';
import { usePartnerStore } from '@/store';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

export const FormStaff = () => {
	const { staffID } = useParams();
	const navigate = useNavigate();
	const [getProvince, setGetProvince] = useState(0);
	const [getCity, setGetCity] = useState(0);
	const [getDistrict, setGetDistrict] = useState(0);

	const { staff, fetchingStaff, processingCreateStaff, getStaff, postStaffCreate, updateStaff } = usePartnerStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formStaffSchema),
		defaultValues: {
			nik_number: '',
			name: '',
			birth_place: '',
			birth_date: null,
			gender: '',
			address: '',
			province: undefined,
			city: undefined,
			district: undefined,
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
			setGetProvince(100);
			setBirthDate(new Date(staff?.ttl.birth_date));
			setValue('nik_number', staff.nik_number || '');
			setValue('name', staff.name || '');
			setValue('birth_place', staff?.ttl.birth_place || '');
			setValue('birth_date', new Date(staff?.ttl.birth_date) || '');
			setValue('gender', staff.gender || '');
			setValue('address', staff.address || '');
			setValue('province', staff.province?.id || null);
			setValue('city', staff.city?.id || null);
			setValue('district', staff.district?.id || null);
			setValue('mobile', staff.mobile || '');
			setValue('email', staff.email || '');
			setValue('religion', staff.religion || '');
			setValue('staff_title', staff.staff_title?.name || '');
		}
	}, [staffID, staff]);

	useEffect(() => {
		setGetDistrict(0);
	}, [getCity, getProvince]);

	const [birthDate, setBirthDate] = useState(null);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{staffID ? 'Edit' : 'Create'} Tim Internal</div>
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
							disabled={processingCreateStaff || fetchingStaff}
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
							label="Nama Tim Internal"
							placeholder="Nama Tim Internal"
							disabled={processingCreateStaff || fetchingStaff}
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
							disabled={processingCreateStaff || fetchingStaff}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'birth_date'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<div className="space-y-1">
							<InputLabel text={'Tanggal Lahir'} />
							<div className={`border border-gray-300 rounded-[4px] px-3 py-[6px]`}>
								<InputSelectDate
									selectedDate={birthDate}
									onChange={(date) => {
										field.birth_date = date;
										setBirthDate(date);
										setValue('birth_date', date);
										setError('birth_date', null);
									}}
								/>
							</div>
							{error && <InputError message={error.message} />}
						</div>
					)}
				/>

				<Controller
					name={'gender'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectGender
							{...field}
							disabled={processingCreateStaff || fetchingStaff}
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
							disabled={processingCreateStaff || fetchingStaff}
							onChange={({ value }) => {
								setValue('province', value);
								setError('province', null);
								setGetCity(value);
							}}
							error={error}
							countryID={getProvince}
							placeholder={staff ? staff.province?.name : 'Select...'}
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
							disabled={processingCreateStaff || fetchingStaff}
							onChange={({ value }) => {
								setValue('city', value);
								setError('city', null);
								setGetDistrict(value);
							}}
							error={error}
							provinceID={getCity}
							placeholder={staff ? staff.city?.name : 'Select...'}
						/>
					)}
				/>

				<Controller
					name={'district'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectDistrict
							{...field}
							disabled={processingCreateStaff || fetchingStaff}
							onChange={({ value }) => {
								setValue('district', value);
								setError('district', null);
							}}
							error={error}
							cityID={getDistrict}
							placeholder={staff ? staff.district?.name : 'Select...'}
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
							disabled={processingCreateStaff || fetchingStaff}
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
