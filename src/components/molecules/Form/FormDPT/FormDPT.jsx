import { Button } from '@/components/atoms';
import { useDPTStore } from '@/store';
import { formDPTSchema } from '@/utils/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { InputSelectTPS } from '../../InputSelect/InputSelectTPS/InputSelectTPS';
import { InputSelectPartnerAsync } from '../../InputSelect/InputSelectPartner/InputSelectPartnerAsync';

export const FormDPT = () => {
	const { DPTID } = useParams();
	const navigate = useNavigate();

	const { DPTItem, fetchingDPT, processingCreateDPT, DPTErrors } = useDPTStore();
	const { getDPTItem, createDPT, updateDPT, clearStateDPT } = useDPTStore();

	const { control, formState, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formDPTSchema),
		defaultValues: {
			tps_id: undefined,
			partner_id: undefined,
			nik_number: ''
		}
	});

	const onSubmitDPT = (values) => {
		if (DPTID) {
			updateDPT(DPTID, values, ({ success }) => {
				if (success) navigate('/dpt', { replace: true });
			});
		} else {
			createDPT(values, ({ success }) => {
				if (success) navigate('/dpt', { replace: true });
			});
		}
	};

	useEffect(() => {
		if (DPTID) getDPTItem(DPTID);
	}, [DPTID]);

	useEffect(() => {
		if (DPTID && DPTItem) {
			setValue('tps_id', DPTItem.tps.id || undefined);
			setValue('partner_id', DPTItem.partner.id || undefined);
			setValue('nik_number', DPTItem.nik_number || '');
		}
	}, [DPTID, DPTItem]);

	useEffect(() => () => clearStateDPT(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{DPTID ? 'Edit' : 'Tambah'} DPT</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'tps_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectTPS
							{...field}
							disabled={processingCreateDPT || fetchingDPT || DPTErrors}
							onChange={({ value }) => {
								setValue('tps_id', value);
								setError('tps_id', null);
							}}
							error={error}
						/>
					)}
				/>
				<Controller
					name={'partner_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectPartnerAsync
							{...field}
							label="Staff"
							placeholder="Pilih Staff"
							disabled={processingCreateDPT || fetchingDPT || DPTErrors}
							params={{ is_staff: true }}
							onChange={({ value, data }) => {
								setValue('partner_id', value);
								setValue('nik_number', data?.nik_number || '');
								setError('partner_id', null);
								setError('nik_number', null);
							}}
							error={error || formState.errors?.nik_number}
						/>
					)}
				/>
			</div>
			<hr />
			<div className="flex justify-end">
				<Button
					className={'px-7 py-3 rounded-sm mx-2'}
					variant="warning"
					disabled={processingCreateDPT || fetchingDPT || DPTErrors}
					onClick={() => navigate(-1, { replace: true })}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateDPT || fetchingDPT || DPTErrors}
					onClick={handleSubmit(onSubmitDPT)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
