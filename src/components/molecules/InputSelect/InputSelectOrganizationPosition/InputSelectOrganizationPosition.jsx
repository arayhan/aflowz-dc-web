import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useProgramStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectOrganizationPosition = forwardRef(
	({ containerClassName, error, onChange, showLabel, params, ...props }, ref) => {
		const {
			programOrganizationPositionList,
			fetchingProgramOrganizationPositionList,
			getProgramOrganizationPositionList
		} = useProgramStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			if (params) getProgramOrganizationPositionList({ ...params });
			else getProgramOrganizationPositionList();
		}, [params]);

		useEffect(() => {
			if (programOrganizationPositionList?.total > 0) {
				const mapProgramOrganizationPosition = programOrganizationPositionList.items.map(
					(programOrganizationPosition) => ({
						label: programOrganizationPosition.name,
						value: programOrganizationPosition.id
					})
				);
				setOptions(mapProgramOrganizationPosition);
			}
		}, [programOrganizationPositionList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Posisi" name={props.name} />}
				<InputSelect
					ref={ref}
					options={options}
					loading={fetchingProgramOrganizationPositionList}
					onChange={onChange}
					placeholder="Pilih Posisi"
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectOrganizationPosition.displayName = 'InputSelectOrganizationPosition';
InputSelectOrganizationPosition.defaultProps = {
	name: 'position',
	params: {},
	containerClassName: '',
	showLabel: true
};
