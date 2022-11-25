import ReactSelect from 'react-select';

export const InputSelectKonstituen = ({ selectedKonstituen }) => {

    const options = [
        {label: 'Sekolah', value: 'sekolah'}, 
        {label: 'Kampus', value: 'kampus'}
    ];

    return (
        <div className="space-y-1">
			<label className="text-sm text-gray-600" htmlFor="konstituen">
				Pilih Tipe Konstitusi
			</label>
			<ReactSelect
				styles={{
					input: (provided) => ({
						...provided,
						'input:focus': {
							boxShadow: 'none'
						}
					})
				}}
				id="konstituen"
				name="konstituen"
				options={options}
                onChange={(selectedOption) => selectedKonstituen(selectedOption.value)}
			/>
		</div>
    );
};