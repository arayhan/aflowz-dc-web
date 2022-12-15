import { Button, InputText } from '@/components/atoms';
import { useTPSStore } from '@/store';
import { formTPSSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { InputSelectVillage } from '../../InputSelect/InputSelectVillage/InputSelectVillage';
import { InputSelectStaff } from '../../InputSelect/InputSelectStaff/InputSelectStaff';

export const FormTPS = () => {
	const { TPSID } = useParams();
	const navigate = useNavigate();

	const { TPS, fetchingTPS, processingCreateTPS, TPSErrors } = useTPSStore();
	const { getTPSItem, createTPS, updateTPS, clearStateTPS } = useTPSStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formTPSSchema),
		defaultValues: {
			name: '',
			village_id: '',
			pic: '',
			pic_mobile: '',
			pic_staff_id: undefined
		}
	});

	const onSubmitTPS = (values) => {
		if (TPSID) {
			updateTPS(TPSID, values, ({ success }) => {
				if (success) navigate('/tps', { replace: true });
			});
		} else {
			createTPS(values, ({ success }) => {
				if (success) navigate('/tps', { replace: true });
			});
		}
	};

	useEffect(() => {
		if (TPSID) getTPSItem(TPSID);
	}, [TPSID]);

	useEffect(() => {
		if (TPSID && TPS) {
			setValue('name', TPS.name || '');
			setValue('village_id', TPS?.village?.id || 0);
			setValue('pic_staff_id', TPS?.pic_staff?.id || 0);
			setValue('pic', TPS.pic || '');
			setValue('pic_mobile', TPS.pic_mobile || '');
		}
	}, [TPSID, TPS]);

	useEffect(() => () => clearStateTPS(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{TPSID ? 'Edit' : 'Tambah'} TPS</div>
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
							label="Nama TPS"
							placeholder="Nama TPS"
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
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
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
							onChange={({ value }) => {
								setValue('village_id', value);
								setError('village_id', null);
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
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
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
							label="Nama PIC Kementerian"
							placeholder="Nama PIC Kementerian"
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
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
							label="Nomor Telepon PIC Kementerian"
							placeholder="Contoh : 08xxxxxxxxxx"
							disabled={processingCreateTPS || fetchingTPS || TPSErrors}
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
					disabled={processingCreateTPS || fetchingTPS || TPSErrors}
					linkTo={TPSID ? `/tps/${TPSID}` : '/tps'}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateTPS || fetchingTPS || TPSErrors}
					onClick={handleSubmit(onSubmitTPS)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
