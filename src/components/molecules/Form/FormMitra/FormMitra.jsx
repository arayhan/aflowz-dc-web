import { Button, InputText } from '@/components/atoms';
import { useProgramStore } from '@/store';
import { formMitraSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { InputSelectStaff } from '../../InputSelect/InputSelectStaff/InputSelectStaff';

export const FormMitra = () => {
	const { programCategoryID } = useParams();
	const navigate = useNavigate();

	const { programCategory, fetchingProgramCategory, processingCreateProgramCategory, programCategoryErrors } =
		useProgramStore();
	const { getProgramCategory, createProgramCategory, updateProgramCategory, clearStateProgramCategory } =
		useProgramStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formMitraSchema),
		defaultValues: {
			name: '',
			alias: '',
			pic: '',
			pic_mobile: '',
			pic_staff_id: 0
		}
	});

	const onSubmitProgramCategory = (values) => {
		if (programCategoryID) {
			updateProgramCategory(programCategoryID, values, ({ success }) => {
				if (success) navigate(`/mitra/${programCategoryID}`);
			});
		} else {
			createProgramCategory(values, ({ payload, success }) => {
				if (success) navigate(`/mitra/${payload.id}`);
			});
		}
	};

	useEffect(() => {
		if (programCategoryID) getProgramCategory(programCategoryID);
	}, [programCategoryID]);

	useEffect(() => {
		if (programCategoryID && programCategory) {
			setValue('name', programCategory.name || '');
			setValue('alias', programCategory.name_alias || '');
			setValue('pic_staff_id', programCategory?.pic_staff?.id || 0);
			setValue('pic', programCategory.pic || '');
			setValue('pic_mobile', programCategory.pic_mobile || '');
		}
	}, [programCategoryID, programCategory]);

	useEffect(() => () => clearStateProgramCategory(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{programCategoryID ? 'Edit' : 'Tambah'} Mitra</div>
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
							label="Nama Mitra"
							placeholder="Nama Mitra"
							disabled={processingCreateProgramCategory || fetchingProgramCategory || programCategoryErrors}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'alias'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Alias"
							placeholder="Alias"
							disabled={processingCreateProgramCategory || fetchingProgramCategory || programCategoryErrors}
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
							disabled={processingCreateProgramCategory || fetchingProgramCategory || programCategoryErrors}
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
							label="Nama PIC Eksternal"
							placeholder="Nama PIC Eksternal"
							disabled={processingCreateProgramCategory || fetchingProgramCategory || programCategoryErrors}
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
							label="Nomor Telepon PIC Eksternal"
							placeholder="Contoh : 08xxxxxxxxxx"
							disabled={processingCreateProgramCategory || fetchingProgramCategory || programCategoryErrors}
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
					disabled={processingCreateProgramCategory || fetchingProgramCategory || programCategoryErrors}
					onClick={handleSubmit(onSubmitProgramCategory)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
