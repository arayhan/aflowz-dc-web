import { Button, InputText } from '@/components/atoms';
import {
	InputSelectCity,
	InputSelectDistrict,
	InputSelectInstitusiType,
	InputSelectStaff,
	InputSelectVillage
} from '@/components/molecules';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formKonstituenSchema } from '@/utils/validation-schema';
import { useNavigate, useParams } from 'react-router-dom';
import { useKonstituenStore } from '@/store';
import { useEffect } from 'react';

export const FormKonstituen = () => {
	const { konstituenID } = useParams();
	const navigate = useNavigate();

	const {
		konstituen,
		fetchingKonstituen,
		processingCreateKonstituen,
		getKonstituen,
		postKonstituenCreate,
		updateKonstituen
	} = useKonstituenStore();

	const { control, setValue, setError, handleSubmit, watch, getValues, formState, getFieldState } = useForm({
		resolver: yupResolver(formKonstituenSchema),
		defaultValues: {
			name: '',
			konstituen_type: '',
			address: '',
			city_id: undefined,
			district_id: undefined,
			pic: '',
			pic_mobile: '',
			pic_staff_id: undefined
		}
	});

	const onHandleSubmit = (values) => {
		console.log({ values });
		if (konstituenID) {
			updateKonstituen(konstituenID, values, ({ success }) => {
				if (success) navigate(`/institusi/${konstituenID}`, { replace: true });
			});
		} else {
			postKonstituenCreate(values, ({ payload, success }) => {
				if (success) navigate(`/institusi/${payload.id}`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (konstituenID) getKonstituen(konstituenID);
	}, [konstituenID]);

	useEffect(() => {
		if (konstituenID && konstituen) {
			setValue('name', konstituen.name || '');
			setValue('konstituen_type', konstituen.konstituen_type || '');
			setValue('address', konstituen.address || '');
			setValue('city_id', konstituen.city?.id || null);
			setValue('district_id', konstituen.district?.id || null);
			setValue('village_id', konstituen.village?.id || null);
			setValue('pic', konstituen.pic || '');
			setValue('pic_mobile', konstituen.pic_mobile || '');
			setValue('pic_staff_id', konstituen.pic_staff?.id || null);
		}
	}, [konstituenID, konstituen]);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{konstituenID ? 'Edit' : 'Create'} Institusi</div>
				{/* <div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div> */}
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama Institusi"
							placeholder="Nama Institusi"
							disabled={processingCreateKonstituen || fetchingKonstituen}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'konstituen_type'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectInstitusiType
							{...field}
							disabled={processingCreateKonstituen || fetchingKonstituen}
							onChange={({ value }) => {
								setValue('konstituen_type', value);
								setError('konstituen_type', null);
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
							label="Alamat Institusi"
							placeholder="Alamat Institusi"
							disabled={processingCreateKonstituen || fetchingKonstituen}
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
							disabled={processingCreateKonstituen || fetchingKonstituen}
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
							disabled={!watch('city_id') || processingCreateKonstituen || fetchingKonstituen}
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
							disabled={!watch('district_id') || processingCreateKonstituen || fetchingKonstituen}
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
					name={'pic'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama PIC Institusi"
							placeholder="Nama PIC Institusi"
							disabled={processingCreateKonstituen || fetchingKonstituen}
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
							label="Kontak PIC Institusi"
							placeholder="08xxxxxxxxxx"
							disabled={processingCreateKonstituen || fetchingKonstituen}
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
							disabled={processingCreateKonstituen || fetchingKonstituen}
							onChange={({ value }) => {
								setValue('pic_staff_id', value);
								setError('pic_staff_id', null);
							}}
							params={{ limit: 1000, offset: 0 }}
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
					disabled={processingCreateKonstituen || fetchingKonstituen}
					linkTo={konstituenID ? `/institusi/${konstituenID}` : '/institusi'}
				>
					Cancel
				</Button>

				{console.log('test')}
				{console.log(getValues())}
				{console.log(getFieldState())}
				{console.log(formState.errors)}
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateKonstituen || fetchingKonstituen}
					onClick={handleSubmit(onHandleSubmit)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
