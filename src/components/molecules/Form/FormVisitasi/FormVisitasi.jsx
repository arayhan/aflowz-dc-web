import { Button, InputCheckbox, InputDate, InputText, InputTextArea } from '@/components/atoms';
import {
	InputSelectCity,
	InputSelectDistrict,
	InputSelectInstitusiAsync,
	InputSelectProgram,
	InputSelectVillageAsync
} from '@/components/molecules';
import { useVisitasiStore } from '@/store';
import { formVisitasiSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

export const FormVisitasi = () => {
	const { visitasiID } = useParams();
	const navigate = useNavigate();

	const { visitasiItem, visitasiDetailItem, fetchingVisitasi, processingCreateVisitasi, visitasiErrors } =
		useVisitasiStore();
	const { getVisitasiItem, createVisitasi, updateVisitasi, clearStateVisitasi } = useVisitasiStore();

	const { control, watch, getValues, setValue, getFieldState, setError, handleSubmit } = useForm({
		resolver: yupResolver(formVisitasiSchema),
		defaultValues: {
			name: '',
			date: '',
			origin: '',
			note: '',
			address: '',
			phone: '',
			is_potential: false,
			father_name: '',
			father_phone: '',
			mother_name: '',
			mother_phone: '',
			total_family_member: 0,
			konstituen_id: undefined,
			program_id: undefined,
			village_id: undefined,
			district_id: undefined,
			city_id: undefined
		}
	});

	const onSubmitVisitasi = (values) => {
		if (visitasiID) {
			updateVisitasi(visitasiID, values, ({ success }) => {
				if (success) navigate(`/visitasi/${visitasiID}`, { replace: true });
			});
		} else {
			createVisitasi(values, ({ payload, success }) => {
				if (success) {
					navigate(`/visitasi/${payload.id}`, { replace: true });
				}
			});
		}
	};

	useEffect(() => {
		if (visitasiID) getVisitasiItem(visitasiID);
	}, [visitasiID]);

	useEffect(() => {
		if (visitasiID && visitasiItem) {
			setValue('name', visitasiItem.name || '');
			setValue('date', visitasiItem.date || '');
			setValue('origin', visitasiItem.origin || '');
			setValue('note', visitasiItem.note || '');
			setValue('address', visitasiItem.address || '');
			setValue('phone', visitasiItem.phone || '');
			setValue('is_potential', visitasiItem.is_potential || false);
			setValue('father_name', visitasiItem.father_name || '');
			setValue('father_phone', visitasiItem.father_phone || '');
			setValue('mother_name', visitasiItem.mother_name || '');
			setValue('mother_phone', visitasiItem.mother_phone || '');
			setValue('total_family_member', visitasiItem?.total_family_member || 0);
			setValue('konstituen_id', visitasiItem.konstituen.id || 0);
			setValue('program_id', visitasiItem.program.id || 0);
			setValue('village_id', visitasiItem.village.id || 0);
			setValue('district_id', visitasiItem.district.id || 0);
			setValue('city_id', visitasiItem.city.id || 0);
		}
	}, [visitasiID, visitasiItem, visitasiDetailItem]);

	useEffect(() => () => clearStateVisitasi(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{visitasiID ? 'Edit' : 'Tambah'} Visitasi</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama Mahasiswa"
							placeholder="Nama Mahasiswa"
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'date'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputDate
							{...field}
							label="Tanggal Visitasi"
							placeholder="Tanggal"
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
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
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
							onChange={({ value }) => {
								setValue('konstituen_id', value);
								setError('konstituen_id', null);
							}}
							label="Perguruan Tinggi Mahasiswa"
							error={error}
						/>
					)}
				/>
				<Controller
					name={'phone'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="No Handphone Mahasiswa"
							placeholder="Contoh : 08xxxxxxxxxx"
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
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
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
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
					name={'address'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputTextArea
							{...field}
							label="Alamat Tinggal"
							placeholder="Alamat Tinggal"
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
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
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
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
							disabled={!watch('city_id') || processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
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
						<InputSelectVillageAsync
							{...field}
							disabled={!watch('district_id') || processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
							params={watch('district_id') ? { district_id: watch('district_id') } : null}
							onChange={({ value }) => {
								setValue('village_id', value);
								setError('village_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'father_name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama Ayah"
							placeholder="Nama Ayah"
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'father_phone'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="No Handphone Ayah"
							placeholder="Contoh : 08xxxxxxxxxx"
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'mother_name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama Ibu"
							placeholder="Nama Ibu"
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'mother_phone'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="No Handphone Ibu"
							placeholder="Contoh : 08xxxxxxxxxx"
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'origin'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Asal Daerah"
							placeholder="Asal Daerah"
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'total_family_member'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							type="number"
							label="Jumlah Anggota Keluarga"
							placeholder="Jumlah Anggota Keluarga"
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
							error={error}
						/>
					)}
				/>
			</div>

			<div className="space-y-6">
				<Controller
					name={'is_potential'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputCheckbox
							{...field}
							label="Yang bersangkutan berpotensi menjadi tim pemenangan  Ibu Hj. Dewi Coryati M.Si"
							showStatus
							checkedStatusText="Ya, berpotensi"
							uncheckedStatusText="Tidak berpotensi"
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'note'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputTextArea
							{...field}
							label="Catatan (diisi jika ada keluarga atau tetangga yg perlu mendapat bantuan atau bisa dijadikn tim pip/ saksi/ dll)"
							placeholder="Tulis catatan di sini"
							disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
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
					disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
					onClick={() => navigate(-1, { replace: true })}
				>
					Cancel
				</Button>

				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateVisitasi || fetchingVisitasi || visitasiErrors}
					onClick={handleSubmit(onSubmitVisitasi)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
