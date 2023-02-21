import { Button, InputText } from '@/components/atoms';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { InputSelectStaffTitle } from '../../InputSelect/InputSelectStaffTitle/InputSelectStaffTitle';

export const TableSelectRoleForm = ({ onSubmit, disabled }) => {
	const { control, setValue, setError, handleSubmit } = useForm({
		defaultValues: { staff_title_id: undefined, branch_title: '' },
		resolver: yupResolver(
			yup.object().shape({
				staff_title_id: yup.number().nullable().required('Role wajib diisi'),
				branch_title: yup.string().required('Role detail wajib diisi')
			})
		)
	});

	return (
		<div className="space-y-3">
			<div className="grid items-start md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'staff_title_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectStaffTitle
							{...field}
							disabled={disabled}
							error={error}
							label="Pilih Role Title"
							onChange={({ value }) => {
								setValue('staff_title_id', value);
								setError('staff_title_id', null);
							}}
						/>
					)}
				/>
				<Controller
					name={'branch_title'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText {...field} label="Role Detail" placeholder="Role Detail" disabled={disabled} error={error} />
					)}
				/>
			</div>

			<div className="flex justify-end">
				<Button
					className={'px-7 py-3 text-sm rounded-sm'}
					variant="primary"
					disabled={disabled}
					onClick={handleSubmit(onSubmit)}
				>
					Tambah Role
				</Button>
			</div>
		</div>
	);
};
