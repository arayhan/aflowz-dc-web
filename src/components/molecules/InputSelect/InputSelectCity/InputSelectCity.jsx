import { useCityStore } from '@/store';
import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';

export const InputSelectCity = () => {
    const { cityList, getCityList } = useCityStore();

    const [cityData, setCityData] = useState([]);

    useEffect(() => {
        getCityList();
    }, []);

    useEffect(() => {
        if (cityList.length > 0) {
            const mapCity = cityList.items.map((city) => ({
                label: city.name,
                value: city.id
            }));

            setCityData(mapCity);
        }
    }, [cityList]);

    return (
        <div className="space-y-1">
			<label className="text-sm text-gray-600" htmlFor="city">
				Pilih Kota
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
				id="city"
				name="city"
				options={cityData}
			/>
		</div>
    );
};