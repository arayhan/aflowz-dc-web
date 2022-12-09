import { BannerFeature, TableCity, TableDistrict, TableVillage } from '@/components/molecules';
import { useState } from 'react';
import { DapilBadge } from './components/DapilBadge';

const Dapil = () => {
	const [selectedCity, setSelectedCity] = useState(null);
	const [selectedDistrict, setSelectedDistrict] = useState(null);
	const [selectedVillage, setSelectedVillage] = useState(null);

	return (
		<div className="bg-gray-100">
			<BannerFeature
				title="Dapil"
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
				backButtonLinkTo={'/'}
				backButtonText="Kembali ke Home"
			/>
			<div className="container py-16 space-y-8">
				{selectedCity && (
					<div className="flex bg-white shadow-md p-3 rounded-md gap-2">
						<DapilBadge
							title={'Kota : '}
							dataText={selectedCity.name}
							onRemove={() => {
								setSelectedCity(null);
								setSelectedDistrict(null);
								setSelectedVillage(null);
							}}
						/>

						{selectedDistrict && !selectedVillage && (
							<DapilBadge
								title={'Kecamatan : '}
								dataText={selectedDistrict.name}
								onRemove={() => {
									setSelectedDistrict(null);
									setSelectedVillage(null);
								}}
							/>
						)}

						{selectedVillage && (
							<DapilBadge
								title={'Desa/Kelurahan : '}
								dataText={selectedVillage.name}
								onRemove={() => setSelectedVillage(null)}
							/>
						)}
					</div>
				)}

				<div>
					{!selectedCity && (
						<TableCity title="Pilih Kota" onClickRow={(rowData) => setSelectedCity(rowData)} enableClickRow />
					)}

					{selectedCity && !selectedDistrict && (
						<TableDistrict
							title="Pilih Kecamatan"
							onClickRow={(rowData) => setSelectedDistrict(rowData)}
							enableClickRow
							params={{ city_id: selectedCity.id }}
						/>
					)}

					{selectedCity && selectedDistrict && (
						<TableVillage
							title="Pilih Desa/Kelurahan"
							onClickRow={(rowData) => setSelectedVillage(rowData)}
							enableClickRow
							params={{ district_id: selectedDistrict.id }}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dapil;
