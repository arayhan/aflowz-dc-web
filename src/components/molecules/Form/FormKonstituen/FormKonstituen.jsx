import { Button, InputText } from '@/components/atoms';
import { InputSelectCity, InputSelectKonstituen, InputSelectStaff } from '@/components/molecules';
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

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formKonstituenSchema),
		defaultValues: {
			name: '',
			konstituen_type: '',
			address: '',
			city: undefined,
			pic: '',
			pic_mobile: '',
			pic_staff_id: undefined
		}
	});

	const onHandleSubmit = (values) => {
		if (konstituenID) {
			updateKonstituen(konstituenID, values, ({ success }) => {
				if (success) navigate(`/konstituen/${konstituenID}`);
			});
		} else {
			postKonstituenCreate(values, ({ payload, success }) => {
				if (success) navigate(`/konstituen/${payload.id}`);
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
			setValue('city', konstituen.city?.id || null);
			setValue('pic', konstituen.pic || '');
			setValue('pic_mobile', konstituen.pic_mobile || '');
			setValue('pic_staff_id', konstituen.pic_staff?.id || null);
		}
	}, [konstituenID, konstituen]);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{konstituenID ? 'Edit' : 'Create'} Konstituen</div>
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
							label="Nama Institusi"
							placeholder="Nama Program"
							disabled={konstituenID || processingCreateKonstituen || fetchingKonstituen}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'konstituen_type'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectKonstituen
							{...field}
							disabled={konstituenID || processingCreateKonstituen || fetchingKonstituen}
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
							disabled={konstituenID || processingCreateKonstituen || fetchingKonstituen}
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
							disabled={konstituenID || processingCreateKonstituen || fetchingKonstituen}
							onChange={({ value }) => {
								setValue('city', value);
								setError('city', null);
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
							placeholder="08"
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
					disabled={processingCreateKonstituen || fetchingKonstituen}
					onClick={handleSubmit(onHandleSubmit)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
