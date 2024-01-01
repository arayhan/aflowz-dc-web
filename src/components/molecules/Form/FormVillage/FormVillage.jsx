import { Button, InputText } from '@/components/atoms';
import { useVillageStore } from '@/store';
import { formVillageSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { InputSelectStaffAsync, InputSelectDistrict } from '@/components/molecules';

export const FormVillage = () => {
	const { villageID } = useParams();
	const navigate = useNavigate();

	const { village, fetchingVillage, processingCreateVillage, villageErrors } = useVillageStore();
	const { getVillageItem, createVillage, updateVillage, clearStateVillage } = useVillageStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formVillageSchema),
		defaultValues: {
			name: '',
			district_id: '',
			pic: '',
			pic_mobile: '',
			pic_staff_id: undefined
		}
	});

	const onSubmitVillage = (values) => {
		if (villageID) {
			updateVillage(villageID, values, ({ success }) => {
				if (success) navigate(`/dapil/village/${villageID}`, { replace: true });
			});
		} else {
			createVillage(values, ({ payload, success }) => {
				if (success) navigate(`/dapil/village/${payload.id}`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (villageID) getVillageItem(villageID);
	}, [villageID]);

	useEffect(() => {
		if (villageID && village) {
			setValue('name', village.name || '');
			setValue('district_id', village?.district?.id || 0);
			setValue('pic_staff_id', village?.pic_staff?.id || 0);
			setValue('pic', village.pic || '');
			setValue('pic_mobile', village.pic_mobile || '');
		}
	}, [villageID, village]);

	useEffect(() => () => clearStateVillage(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{villageID ? 'Edit' : 'Tambah'} Desa</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							{...field}
							label="Nama Desa"
							placeholder="Nama Desa"
							disabled={processingCreateVillage || fetchingVillage || villageErrors}
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
							disabled={processingCreateVillage || fetchingVillage || villageErrors}
							onChange={({ value }) => {
								setValue('district_id', value);
								setError('district_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'pic_staff_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectStaffAsync
							{...field}
							disabled={processingCreateVillage || fetchingVillage || villageErrors}
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
							label="Nama PIC Daerah"
							placeholder="Nama PIC Daerah"
							disabled={processingCreateVillage || fetchingVillage || villageErrors}
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
							label="Nomor Telepon PIC Daerah"
							placeholder="Contoh : 08xxxxxxxxxx"
							disabled={processingCreateVillage || fetchingVillage || villageErrors}
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
					disabled={processingCreateVillage || fetchingVillage || villageErrors}
					linkTo={villageID ? `/village/${villageID}` : '/village'}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateVillage || fetchingVillage || villageErrors}
					onClick={handleSubmit(onSubmitVillage)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
