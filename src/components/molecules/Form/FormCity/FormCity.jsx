import { Button, InputText } from '@/components/atoms';
import { useCityStore } from '@/store';
import { formCitySchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { InputSelectStaffAsync, InputSelectProvince } from '@/components/molecules';

export const FormCity = () => {
	const { cityID } = useParams();
	const navigate = useNavigate();

	const { city, fetchingCity, processingCreateCity, cityErrors } = useCityStore();
	const { getCityItem, createCity, updateCity, clearStateCity } = useCityStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formCitySchema),
		defaultValues: {
			name: '',
			province_id: '',
			pic: '',
			pic_mobile: '',
			pic_staff_id: undefined
		}
	});

	const onSubmitCity = (values) => {
		if (cityID) {
			updateCity(cityID, values, ({ success }) => {
				if (success) navigate(`/dapil/city/${cityID}`, { replace: true });
			});
		} else {
			createCity(values, ({ payload, success }) => {
				if (success) navigate(`/dapil/city/${payload.id}`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (cityID) getCityItem(cityID);
	}, [cityID]);

	useEffect(() => {
		if (cityID && city) {
			setValue('name', city.name || '');
			setValue('province_id', city.state.id || 0);
			setValue('pic_staff_id', city?.pic_staff?.id || 0);
			setValue('pic', city.pic || '');
			setValue('pic_mobile', city.pic_mobile || '');
		}
	}, [cityID, city]);

	useEffect(() => () => clearStateCity(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{cityID ? 'Edit' : 'Tambah'} Kota</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama Kota"
							placeholder="Nama Kota"
							disabled={processingCreateCity || fetchingCity || cityErrors}
							error={error}
						/>
					)}
				/>

				{/* TODO: set this field to InputSelectState */}
				<Controller
					name={'province_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectProvince
							{...field}
							disabled={processingCreateCity || fetchingCity || cityErrors}
							onChange={({ value }) => {
								setValue('province_id', value);
								setError('province_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'pic_staff_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectStaffAsync
							{...field}
							disabled={processingCreateCity || fetchingCity || cityErrors}
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
							label="Nama PIC Kementerian"
							placeholder="Nama PIC Kementerian"
							disabled={processingCreateCity || fetchingCity || cityErrors}
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
							label="Nomor Telepon PIC Kementerian"
							placeholder="Contoh : 08xxxxxxxxxx"
							disabled={processingCreateCity || fetchingCity || cityErrors}
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
					disabled={processingCreateCity || fetchingCity || cityErrors}
					linkTo={cityID ? `/city/${cityID}` : '/city'}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateCity || fetchingCity || cityErrors}
					onClick={handleSubmit(onSubmitCity)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
