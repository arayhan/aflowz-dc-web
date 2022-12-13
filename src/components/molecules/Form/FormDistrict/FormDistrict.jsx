import { Button, InputText } from '@/components/atoms';
import { useDistrictStore } from '@/store';
import { formDistrictSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { InputSelectCity } from '../../InputSelect/InputSelectCity/InputSelectCity';
import { InputSelectStaff } from '../../InputSelect/InputSelectStaff/InputSelectStaff';

export const FormDistrict = () => {
	const { districtID } = useParams();
	const navigate = useNavigate();

	const { district, fetchingDistrict, processingCreateDistrict, districtErrors } = useDistrictStore();
	const { getDistrictItem, createDistrict, updateDistrict, clearStateDistrict } = useDistrictStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formDistrictSchema),
		defaultValues: {
			name: '',
			city_id: '',
			pic: '',
			pic_mobile: '',
			pic_staff_id: undefined
		}
	});

	const onSubmitDistrict = (values) => {
		if (districtID) {
			updateDistrict(districtID, values, ({ success }) => {
				if (success) navigate(`/district/${districtID}`, { replace: true });
			});
		} else {
			createDistrict(values, ({ payload, success }) => {
				if (success) navigate(`/district/${payload.id}`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (districtID) getDistrictItem(districtID);
	}, [districtID]);

	useEffect(() => {
		if (districtID && district) {
			setValue('name', district.name || '');
			setValue('city_id', district?.district?.id || 0);
			setValue('pic_staff_id', district?.pic_staff?.id || 0);
			setValue('pic', district.pic || '');
			setValue('pic_mobile', district.pic_mobile || '');
		}
	}, [districtID, district]);

	useEffect(() => () => clearStateDistrict(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{districtID ? 'Edit' : 'Tambah'} Kecamatan</div>
				<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama Kecamatan"
							placeholder="Nama Kecamatan"
							disabled={processingCreateDistrict || fetchingDistrict || districtErrors}
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
							disabled={processingCreateDistrict || fetchingDistrict || districtErrors}
							onChange={({ value }) => {
								setValue('city_id', value);
								setError('city_id', null);
							}}
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
							disabled={processingCreateDistrict || fetchingDistrict || districtErrors}
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
							disabled={processingCreateDistrict || fetchingDistrict || districtErrors}
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
							disabled={processingCreateDistrict || fetchingDistrict || districtErrors}
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
					disabled={processingCreateDistrict || fetchingDistrict || districtErrors}
					linkTo={districtID ? `/district/${districtID}` : '/district'}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateDistrict || fetchingDistrict || districtErrors}
					onClick={handleSubmit(onSubmitDistrict)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
