import { Button, InputLabel, InputText, InputError, Alert } from '@/components/atoms';
import {
	InputSelectProvince,
	InputSelectCity,
	InputSelectDistrict,
	InputSelectGender,
	InputSelectReligion,
	InputSelectDate,
	InputSelectVillage,
	TableSelectRole
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
	const [getVillage, setGetVillage] = useState(0);

	const { staff, fetchingStaff, processingCreateStaff } = usePartnerStore();
	const { getStaff, clearStaff, postStaffCreate, updateStaff } = usePartnerStore();

	const { getValues, watch, control, setValue, setError, handleSubmit } = useForm({
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
			village: undefined,
			mobile: '',
			email: '',
			religion: '',
			staff_titles: [],
			cities_pic: [],
			districts_pic: [],
			villages_pic: []
		}
	});

	const onHandleSubmit = (values) => {
		if (staffID) {
			updateStaff(staffID, values, ({ success }) => {
				if (success) navigate(`/staff/${staffID}`, { replace: true });
			});
		} else {
			postStaffCreate(values, ({ success }) => {
				if (success) navigate(`/staff`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (staffID) getStaff(staffID);
	}, [staffID]);

	useEffect(() => {
		return () => {
			clearStaff();
		};
	}, []);

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
			setValue('village', staff.village?.id || null);
			setValue('mobile', staff.mobile || '');
			setValue('email', staff.email || '');
			setValue('religion', staff.religion || '');
			setValue(
				'staff_titles',
				staff.staff_titles
					? staff.staff_titles.map((role) => ({ staff_title_id: role.parent.id, branch_title: role.name }))
					: []
			);

			if (staff.cities_pic?.length > 0) {
				const mapCities = staff.cities_pic.map((city) => city.city_id);
				setValue('cities_pic', mapCities);
			}

			if (staff.districts_pic?.length > 0) {
				const mapDistricts = staff.districts_pic.map((district) => district.district_id);
				setValue('districts_pic', mapDistricts);
			}

			if (staff.villages_pic?.length > 0) {
				const mapVillages = staff.villages_pic.map((village) => village.village_id);
				setValue('villages_pic', mapVillages);
			}
			setPlaceholderCity(staff.city?.name);
			setPlaceholderDistrict(staff.district?.name);
			setPlaceholderVillage(staff.village?.name);
		} else {
			setPlaceholderCity('Select...');
			setPlaceholderDistrict('Select...');
			setPlaceholderVillage('Select...');
		}
	}, [staffID, staff]);

	useEffect(() => {
		setGetDistrict(0);
		setGetVillage(0);
		if (staffID) {
			setPlaceholderCity('Select...');
			setValue('city', null);
			setPlaceholderDistrict('Select...');
			setValue('district', null);
			setPlaceholderVillage('Select...');
			setValue('village', null);
		}
	}, [getCity]);

	useEffect(() => {
		setGetVillage(0);
		if (staffID) {
			setPlaceholderVillage('Select...');
			setValue('village', null);
		}
	}, [getDistrict]);

	const [birthDate, setBirthDate] = useState(null);
	const [placeholderCity, setPlaceholderCity] = useState('');
	const [placeholderDistrict, setPlaceholderDistrict] = useState('');
	const [placeholderVillage, setPlaceholderVillage] = useState('');

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{staffID ? 'Edit' : 'Create'} Tim Internal</div>
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
								setValue('city', undefined);
								setValue('district', undefined);
								setValue('village', undefined);
								setError('province', null);
								setGetCity(value);
							}}
							error={error}
							countryID={getProvince}
							placeholder={staff && staffID ? staff.province?.name : 'Select...'}
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
								setValue('district', undefined);
								setValue('village', undefined);
								setError('city', null);
								setGetDistrict(value);
							}}
							error={error}
							params={
								watch('province')
									? { province_id: watch('province'), limit: 1000, offset: 0 }
									: { province_id: 1000, limit: 1000, offset: 0 }
							}
							placeholder={placeholderCity}
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
								setValue('village', undefined);
								setError('district', null);
								setGetVillage(value);
							}}
							error={error}
							params={watch('city') ? { city_id: watch('city'), limit: 1000, offset: 0 } : null}
							placeholder={placeholderDistrict}
						/>
					)}
				/>

				<Controller
					name={'village'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectVillage
							{...field}
							disabled={processingCreateStaff || fetchingStaff}
							onChange={({ value }) => {
								setValue('village', value);
								setError('village', null);
							}}
							error={error}
							params={watch('district') ? { district_id: watch('district'), limit: 1000, offset: 0 } : null}
							placeholder={placeholderVillage}
							isForm
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
					name={'cities_pic'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectCity
							{...field}
							label="Pilih Kota PIC"
							disabled={processingCreateStaff || fetchingStaff}
							onChange={(values, option) => {
								const newValues =
									option.action === 'remove-value'
										? values.filter((item) => item.value !== option.removedValue.value).map((item) => item.value)
										: values.map((item) => item.value);
								setValue('cities_pic', newValues);
							}}
							multiple
							error={error}
						/>
					)}
				/>

				<Controller
					name={'districts_pic'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectDistrict
							{...field}
							label="Pilih Kecamatan PIC"
							disabled={processingCreateStaff || fetchingStaff}
							onChange={(values, option) => {
								const newValues =
									option.action === 'remove-value'
										? values.filter((item) => item.value !== option.removedValue.value).map((item) => item.value)
										: values.map((item) => item.value);
								setValue('districts_pic', newValues);
							}}
							multiple
							params={{ limit: 2000, offset: 0 }}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'villages_pic'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectVillage
							{...field}
							label="Pilih Kelurahan/Desa PIC"
							disabled={processingCreateStaff || fetchingStaff}
							onChange={(values, option) => {
								const newValues =
									option.action === 'remove-value'
										? values.filter((item) => item.value !== option.removedValue.value).map((item) => item.value)
										: values.map((item) => item.value);
								setValue('villages_pic', newValues);
							}}
							multiple
							params={{ limit: 2000, offset: 0 }}
							error={error}
						/>
					)}
				/>
			</div>

			<hr />

			<Controller
				name={'staff_titles'}
				control={control}
				render={({ field: { value }, fieldState: { error } }) => (
					<>
						{(error || value.length === 0) && <Alert type="danger" message={error?.message || 'Harus diisi'} />}
						<TableSelectRole
							selectedRoles={value}
							onRemoveRole={(roleIndex) => {
								const filteredRole = value.filter((roles, index) => index !== roleIndex);
								setValue('staff_titles', filteredRole);
							}}
							onUpdateRole={(selectedRole, selectedRoleIndex) => {
								const updatedRole = value.map((role, index) => {
									return index === selectedRoleIndex ? { ...role, ...selectedRole } : role;
								});
								setValue('staff_titles', updatedRole);
							}}
							onAddRole={(role) => setValue('staff_titles', [...value, role])}
							disabled={processingCreateStaff || fetchingStaff}
						/>
					</>
				)}
			/>

			<hr />
			<div className="flex justify-end">
				<Button
					className={'px-7 py-3 rounded-sm mx-2'}
					variant="warning"
					disabled={processingCreateStaff || fetchingStaff}
					linkTo={staffID ? `/staff/${staffID}` : '/staff'}
				>
					Cancel
				</Button>
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
