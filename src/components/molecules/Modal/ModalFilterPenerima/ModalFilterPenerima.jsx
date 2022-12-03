import { Modal } from '@/components/atoms';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InputSelectCity } from '../../InputSelect/InputSelectCity/InputSelectCity';
import { InputSelectProgram } from '../../InputSelect/InputSelectProgram/InputSelectProgram';
import { InputSelectProvince } from '../../InputSelect/InputSelectProvince/InputSelectProvince';
import { InputSelectVillage } from '../../InputSelect/InputSelectVillage/InputSelectVillage';

export const ModalFilterPenerima = ({ isLoading, onSubmit, onClose }) => {
	const { control, setValue, setError, handleSubmit } = useForm({
		defaultValues: {
			program_id: undefined
		}
	});

	return (
		<Modal
			title="Filter Program"
			isLoading={isLoading}
			submitButtonText={'Filter'}
			onClose={onClose}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="relative grid lg:grid-cols-2 gap-4">
				<Controller
					name={'program_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectProgram
							{...field}
							onChange={({ value }) => {
								setValue('program_id', value);
								setError('program_id', null);
							}}
							error={error}
						/>
					)}
				/>

				<Controller
					name={'province_id'}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputSelectProvince
							{...field}
							onChange={({ value }) => {
								setValue('province_id', value);
								setError('province_id', null);
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
							onChange={({ value }) => {
								setValue('city_id', value);
								setError('city_id', null);
							}}
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
							onChange={({ value }) => {
								setValue('village_id', value);
								setError('village_id', null);
							}}
							error={error}
						/>
					)}
				/>
			</div>
		</Modal>
	);
};

ModalFilterPenerima.defaultProps = {
	onSubmit: () => {}
};
