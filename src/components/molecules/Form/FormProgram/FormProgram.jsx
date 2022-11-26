import { Button, InputText } from '@/components/atoms';
import { InputSelectMitra, InputSelectPeriode, InputSelectStaff } from '@/components/molecules';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formProgramSchema } from '@/utils/validation-schema';
import { useNavigate, useParams } from 'react-router-dom';
import { useProgramStore } from '@/store';
import { useEffect } from 'react';

export const FormProgram = () => {
	const { programID } = useParams();
	const navigate = useNavigate();

	const { program, fetchingProgram, processingCreateProgram, clearStateProgram, createProgram, getProgram } =
		useProgramStore();

	const {
		getValues,
		setValue,
		setError,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(formProgramSchema) });

	const onSubmitProgram = (values) => {
		if (programID) {
			console.log({ values, programID });
		} else {
			createProgram(values, ({ success }) => {
				if (success) navigate('/program');
			});
		}
	};

	useEffect(() => {
		if (programID) getProgram(programID);
	}, [programID]);

	useEffect(() => {
		if (program) {
			setValue('program_category_id', program.program_category?.id || null);
			setValue('name', program.name || '');
			setValue('periode', program.periode || null);
			setValue('pic_staff_id', program.pic_staff?.id || null);
			setValue('pic', program.pic || '');
			setValue('pic_mobile', program.pic_mobile || '');
		}
	}, [program]);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{programID ? 'Edit' : 'Tambah'} Program</div>
				<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<InputSelectMitra
					{...register('program_category_id')}
					loading={fetchingProgram}
					value={getValues('program_category_id')}
					disabled={processingCreateProgram}
					onChange={({ value }) => {
						setValue('program_category_id', value);
						setError('program_category_id', null);
					}}
					error={errors.program_category_id}
				/>
				<InputText
					{...register('name')}
					disabled={processingCreateProgram}
					label="Nama Program"
					name="name"
					placeholder="Nama Program"
					error={errors.name}
				/>
				<InputSelectPeriode
					{...register('periode')}
					value={getValues('periode')}
					disabled={processingCreateProgram}
					onChange={({ value }) => {
						setValue('periode', value);
						setError('periode', null);
					}}
					error={errors.periode}
				/>
				<InputSelectStaff
					{...register('pic_staff_id')}
					loading={fetchingProgram}
					value={getValues('pic_staff_id')}
					disabled={processingCreateProgram}
					onChange={({ value }) => {
						setValue('pic_staff_id', value);
						setError('pic_staff_id', null);
					}}
					error={errors.pic_staff_id}
				/>
				<InputText
					{...register('pic')}
					disabled={processingCreateProgram}
					label="Nama PIC Eksternal"
					name="pic"
					placeholder="Nama PIC Eksternal"
					error={errors.pic}
				/>
				<InputText
					{...register('pic_mobile')}
					disabled={processingCreateProgram}
					label="Nomor Telepon PIC Eksternal"
					name="pic_mobile"
					placeholder="Contoh : 08xxxxxxxxxx"
					error={errors.pic_mobile}
				/>
			</div>
			<hr />
			<div className="flex justify-end">
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
