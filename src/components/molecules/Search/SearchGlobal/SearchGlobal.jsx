import { objectToQueryString } from '@/utils/helpers';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const OPTIONS = {
	namaPenerima: { value: 'penerima', label: 'Penerima', placeholder: 'Nama Penerima atau NIK', linkTo: '/penerima' },
	desa: { value: 'desa', label: 'Desa', placeholder: 'Desa', linkTo: '/village' }
};
const OPTIONS_ARRAY = Object.values(OPTIONS);

export const SearchGlobal = () => {
	const navigate = useNavigate();
	const { control, handleSubmit } = useForm({
		defaultValues: {
			keyword: ''
		}
	});

	const [activeOption, setActiveOption] = useState(OPTIONS.namaPenerima);

	const handleChangeOption = (event) => {
		const { value } = event.target;
		const selected = OPTIONS_ARRAY.find((option) => option.value === value);
		setActiveOption(selected);
	};

	const handleSubmitSearch = (values) => {
		const params = { keyword: values.keyword };
		const queryParams = objectToQueryString(params);
		navigate(`${activeOption.linkTo}${queryParams}`);
	};

	return (
		<form
			className="w-full bg-white shadow-md flex items-center rounded-md overflow-hidden text-sm"
			onSubmit={handleSubmit(handleSubmitSearch)}
		>
			<select
				className="w-48 border-0 py-4 border-r border-r-gray-200 outline-none ring-0 focus:border-r-gray-200 text-sm"
				defaultValue={activeOption.value}
				onChange={handleChangeOption}
			>
				{OPTIONS_ARRAY.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<Controller
				name={'keyword'}
				control={control}
				render={({ field }) => (
					<input
						{...field}
						className="w-full border-none p-4 outline-none ring-0 focus:ring-0 text-sm"
						type="text"
						placeholder={`Cari berdasarkan ${activeOption.placeholder}`}
					/>
				)}
			/>

			<div className="p-1">
				<button className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary-400">Cari</button>
			</div>
		</form>
	);
};
