import { Button, InputCheckbox, InputText } from '@/components/atoms';
import { InputSelectMitra, InputSelectPeriode, InputSelectStaff } from '@/components/molecules';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formProgramSchema } from '@/utils/validation-schema';
import { useNavigate, useParams } from 'react-router-dom';
import { useProgramStore } from '@/store';
import { useEffect } from 'react';

export const FormProgram = () => {
	const { programID } = useParams();
	const navigate = useNavigate();

	const { program, fetchingProgram, processingCreateProgram } = useProgramStore();
	const { getProgram, createProgram, updateProgram } = useProgramStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formProgramSchema),
		defaultValues: {
			name: '',
			periode: undefined,
			program_category_id: undefined,
			pic: '',
			pic_mobile: '',
			pic_staff_id: undefined,
			description: '',
			is_special_program: false
		}
	});

	const onSubmitProgram = (values) => {
		if (programID) {
			updateProgram(programID, values, ({ success }) => {
				if (success) navigate(`/program/${programID}`, { replace: true });
			});
		} else {
			createProgram(values, ({ payload, success }) => {
				if (success) navigate(`/program/${payload.id}`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (programID) getProgram(programID);
	}, [programID]);

	useEffect(() => {
		if (programID && program) {
			const isPIP = program.name?.toLowerCase().includes('pip');
			const isKIP = program.name?.toLowerCase().includes('kip');
			const isPIPorKIP = isPIP || isKIP;

			setValue('program_category_id', program.program_category?.id || null);
			setValue('name', program.name || '');
			setValue('periode', program.periode ? Number(program.periode) : null);
			setValue('pic_staff_id', program.pic_staff?.id || null);
			setValue('pic', program.pic || '');
			setValue('pic_mobile', program.pic_mobile || '');
			setValue('description', program.description || '');
			setValue('is_special_program', isPIPorKIP || false);
			setValue('is_pip', isPIP);
			setValue('is_kip', isKIP);
		}
	}, [programID, program]);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{programID ? 'Edit' : 'Tambah'} Program</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'program_category_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectMitra
							{...field}
							disabled={processingCreateProgram || fetchingProgram}
							onChange={({ value }) => {
								setValue('program_category_id', value);
								setError('program_category_id', null);
							}}
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
							label="Nama Program"
							placeholder="Nama Program"
							disabled={processingCreateProgram || fetchingProgram}
							error={error}
							onChange={(event) => {
								const { value } = event.target;
								setValue('name', value);
								setValue(
									'is_special_program',
									value?.toLowerCase().includes('pip') || value?.toLowerCase().includes('kip') || false
								);
							}}
						/>
					)}
				/>

				<Controller
					name={'periode'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectPeriode
							{...field}
							disabled={processingCreateProgram || fetchingProgram}
							onChange={({ value }) => {
								setValue('periode', value);
								setError('periode', null);
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
							disabled={processingCreateProgram || fetchingProgram}
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
							label="Nama PIC Mitra"
							placeholder="Nama PIC Mitra"
							disabled={processingCreateProgram || fetchingProgram}
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
							label="Nomor Telepon PIC Mitra"
							placeholder="Contoh : 08xxxxxxxxxx"
							disabled={processingCreateProgram || fetchingProgram}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'description'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Deskripsi Program"
							placeholder="Deskripsi Program"
							disabled={processingCreateProgram || fetchingProgram}
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
					disabled={processingCreateProgram || fetchingProgram}
					linkTo={programID ? `/program/${programID}` : '/program'}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateProgram || fetchingProgram}
					onClick={handleSubmit(onSubmitProgram)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
