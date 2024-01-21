import { Button, InputDate, InputText, InputTextArea, InputCheckbox } from '@/components/atoms';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { usePartnerStore } from '@/store';
import { useEffect } from 'react';
import { InputSelectProvince } from '../../InputSelect/InputSelectProvince/InputSelectProvince';
import { InputSelectCity } from '../../InputSelect/InputSelectCity/InputSelectCity';
import { InputSelectVillageAsync } from '../../InputSelect/InputSelectVillage/InputSelectVillageAsync';
import { InputSelectDistrict } from '../../InputSelect/InputSelectDistrict/InputSelectDistrict';
import { InputSelectInstitusiAsync } from '../../InputSelect/InputSelectInstitusi/InputSelectInstitusiAsync';

export const FormPenerima = () => {
	const { penerimaID } = useParams();
	const navigate = useNavigate();

	const { penerimaItem, fetchingPenerimaItem, processingSubmitPenerima } = usePartnerStore();
	const { getPenerimaItem, updatePenerima } = usePartnerStore();

	const { watch, control, setValue, setError, handleSubmit } = useForm({
		defaultValues: {
			name: '',
			nik_number: '',
			birth_place: '',
			birth_date: '',
			mobile: '',
			email: '',
			address: '',
			province_id: '',
			city_id: '',
			district_id: '',
			village_id: '',
			konstituen_id: '',
			is_family: false,
			is_staff: false
		}
	});

	const onSubmitPenerima = (values) => {
		if (penerimaID) {
			updatePenerima(penerimaID, values, ({ success }) => {
				if (success) navigate(`/penerima/${penerimaID}`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (penerimaID) getPenerimaItem(penerimaID);
	}, [penerimaID]);

	useEffect(() => {
		if (penerimaID && penerimaItem) {
			setValue('name', penerimaItem.name || '');
			setValue('nik_number', penerimaItem.nik_number || '');
			setValue('birth_place', penerimaItem.ttl?.birth_place || '');
			setValue('birth_date', penerimaItem.ttl?.birth_date || '');
			setValue('mobile', penerimaItem.mobile || '');
			setValue('email', penerimaItem.email || '');
			setValue('address', penerimaItem.address || '');
			setValue('province_id', penerimaItem.province?.id || undefined);
			setValue('city_id', penerimaItem.city?.id || undefined);
			setValue('district_id', penerimaItem.district?.id || undefined);
			setValue('village_id', penerimaItem.village?.id || undefined);
			setValue('konstituen_id', penerimaItem.konstituen?.id || undefined);
			setValue('is_family', penerimaItem?.is_family || false);
			setValue('is_staff', penerimaItem?.is_staff || false);
		}
	}, [penerimaID, penerimaItem]);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{penerimaID ? 'Edit' : 'Tambah'} Penerima</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama Program"
							placeholder="Nama Program"
							disabled={processingSubmitPenerima || fetchingPenerimaItem}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'nik_number'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="NIK"
							placeholder="NIK"
							disabled={processingSubmitPenerima || fetchingPenerimaItem}
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
							label="Tempat Lahir"
							placeholder="Tempat Lahir"
							disabled={processingSubmitPenerima || fetchingPenerimaItem}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'birth_date'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputDate
							{...field}
							label="Tanggal Lahir"
							placeholder="Tanggal Lahir"
							disabled={processingSubmitPenerima || fetchingPenerimaItem}
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
							label="Nomor Telepon"
							placeholder="Nomor Telepon"
							disabled={processingSubmitPenerima || fetchingPenerimaItem}
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
							label="Email"
							placeholder="Email"
							disabled={processingSubmitPenerima || fetchingPenerimaItem}
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
							label="Alamat"
							placeholder="Alamat"
							disabled={processingSubmitPenerima || fetchingPenerimaItem}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'province_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectProvince
							{...field}
							disabled={processingSubmitPenerima || fetchingPenerimaItem}
							onChange={(option) => {
								setValue('province_id', option?.value);
								setValue('city_id', undefined);
								setError('province_id', null);
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
							disabled={!watch('province_id') || processingSubmitPenerima || fetchingPenerimaItem}
							params={watch('province_id') ? { province_id: watch('province_id') } : null}
							onChange={(option) => {
								setValue('city_id', option?.value || null);
								setValue('district_id', undefined);
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
							disabled={!watch('city_id') || processingSubmitPenerima || fetchingPenerimaItem}
							params={watch('city_id') ? { city_id: watch('city_id') } : null}
							onChange={(option) => {
								setValue('district_id', option?.value || null);
								setValue('village_id', undefined);
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
							disabled={!watch('district_id') || processingSubmitPenerima || fetchingPenerimaItem}
							value={watch('village_id')}
							params={watch('district_id') ? { district_id: watch('district_id') } : null}
							onChange={(option) => {
								setValue('village_id', option?.value ?? null);
								setError('village_id', null);
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
							disabled={processingSubmitPenerima || fetchingPenerimaItem}
							onChange={(option) => {
								setValue('konstituen_id', option?.value || null);
								setError('konstituen_id', null);
							}}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'is_family'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputCheckbox
							{...field}
							label="Is Family"
							disabled={processingSubmitPenerima || fetchingPenerimaItem}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'is_staff'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputCheckbox
							{...field}
							label="Is Staff"
							disabled={processingSubmitPenerima || fetchingPenerimaItem}
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
					disabled={processingSubmitPenerima || fetchingPenerimaItem}
					linkTo={penerimaID ? `/penerima/${penerimaID}` : '/penerima'}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingSubmitPenerima || fetchingPenerimaItem}
					onClick={handleSubmit(onSubmitPenerima)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
