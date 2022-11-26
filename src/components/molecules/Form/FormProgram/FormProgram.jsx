import { Button, InputText } from '@/components/atoms';
import { InputSelectMitra } from '@/components/molecules';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formProgramSchema } from '@/utils/validation-schema';
import { useParams } from 'react-router-dom';

export const FormProgram = () => {
	const params = useParams();

	const {
		setValue,
		setError,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(formProgramSchema) });

	const onSubmitProgram = (values) => console.log(values);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{params.programID ? 'Edit' : 'Tambah'} Program</div>
				<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<InputSelectMitra
					{...register('program_category_id')}
					onChange={({ value }) => {
						setValue('program_category_id', value);
						setError('program_category_id', null);
					}}
					error={errors.program_category_id}
				/>
				<InputText
					{...register('name')}
					label="Nama Program"
					name="name"
					placeholder="Nama Program"
					error={errors.name}
				/>
				<InputText {...register('periode')} label="Periode" placeholder="contoh: 2022" error={errors.periode} />
			</div>
			<hr />
			<div className="flex justify-end">
				<Button className={'px-7 py-3 rounded-sm'} variant="primary" onClick={handleSubmit(onSubmitProgram)}>
					Submit
				</Button>
			</div>
		</div>
	);
};
