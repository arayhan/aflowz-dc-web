import { Button } from '@/components/atoms';
import {
	InputSelectCity,
	InputSelectInstitusi,
	InputSelectOrganizationPosition,
	InputSelectProgram,
	InputSelectStaff
} from '@/components/molecules';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formProgramOrganizationSchema } from '@/utils/validation-schema';
import { useNavigate, useParams } from 'react-router-dom';
import { useProgramStore } from '@/store';
import { useEffect } from 'react';

export const FormProgramOrganization = () => {
	const { programOrganizationID } = useParams();
	const navigate = useNavigate();

	const {
		programOrganization,
		fetchingProgramOrganization,
		processingCreateProgramOrganization,
		processingUpdateProgramOrganization,
		getProgramOrganization,
		createProgramOrganization,
		updateProgramOrganization
	} = useProgramStore();

	const { control, setValue, setError, handleSubmit } = useForm({
		resolver: yupResolver(formProgramOrganizationSchema),
		defaultValues: {
			program_id: undefined,
			partner_id: undefined,
			position_id: undefined,
			city_id: undefined,
			konstituen_id: undefined
		}
	});

	const onSubmitProgram = (values) => {
		if (programOrganizationID) {
			updateProgramOrganization(programOrganizationID, values, ({ success }) => {
				if (success) navigate(`/program/organization`, { replace: true });
			});
		} else {
			createProgramOrganization(values, ({ success }) => {
				if (success) navigate(`/program/organization`, { replace: true });
			});
		}
	};

	useEffect(() => {
		if (programOrganizationID) getProgramOrganization(programOrganizationID);
	}, [programOrganizationID]);

	useEffect(() => {
		console.log({ programOrganizationID, programOrganization });
		if (programOrganizationID && programOrganization) {
			setValue('program_id', programOrganization.program?.id || null);
			setValue('partner_id', programOrganization.partner?.id || null);
			setValue('position_id', programOrganization.position?.id || null);
			setValue('city_id', programOrganization.city?.id || null);
			setValue('konstituen_id', programOrganization.konstituen?.id || null);
		}
	}, [programOrganizationID, programOrganization]);

	return (
		<div className="space-y-8">
			<div>
				<div className="text-xl font-light">{programOrganizationID ? 'Edit' : 'Tambah'} Program</div>
				{/* <div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div> */}
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<Controller
					name={'partner_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectStaff
							{...field}
							disabled={
								processingCreateProgramOrganization ||
								processingUpdateProgramOrganization ||
								fetchingProgramOrganization
							}
							onChange={({ value }) => {
								setValue('partner_id', value);
								setError('partner_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'position_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectOrganizationPosition
							{...field}
							disabled={
								processingCreateProgramOrganization ||
								processingUpdateProgramOrganization ||
								fetchingProgramOrganization
							}
							onChange={({ value }) => {
								setValue('position_id', value);
								setError('position_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'program_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectProgram
							{...field}
							disabled={
								processingCreateProgramOrganization ||
								processingUpdateProgramOrganization ||
								fetchingProgramOrganization
							}
							onChange={({ value }) => {
								setValue('program_id', value);
								setError('program_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'konstituen_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectInstitusi
							{...field}
							disabled={
								processingCreateProgramOrganization ||
								processingUpdateProgramOrganization ||
								fetchingProgramOrganization
							}
							onChange={({ value }) => {
								setValue('konstituen_id', value);
								setError('konstituen_id', null);
							}}
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
							disabled={
								processingCreateProgramOrganization ||
								processingUpdateProgramOrganization ||
								fetchingProgramOrganization
							}
							onChange={({ value }) => {
								setValue('city_id', value);
								setError('city_id', null);
							}}
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
					disabled={
						processingCreateProgramOrganization || processingUpdateProgramOrganization || fetchingProgramOrganization
					}
					linkTo={programOrganizationID ? `/program/${programOrganizationID}` : '/program'}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={
						processingCreateProgramOrganization || processingUpdateProgramOrganization || fetchingProgramOrganization
					}
					onClick={handleSubmit(onSubmitProgram)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
