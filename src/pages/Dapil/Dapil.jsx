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
							dataLinkTo={`/city/${selectedCity.id}`}
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
								dataLinkTo={`/district/${selectedDistrict.id}`}
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
								dataLinkTo={`/village/${selectedVillage.id}`}
								onRemove={() => setSelectedVillage(null)}
							/>
						)}
					</div>
				)}

				<div>
					{!selectedCity && (
						<TableCity
							title="Pilih Kota"
							onClickRow={(rowData) => setSelectedCity(rowData)}
							displayedColumns={['#', 'Nama Kota']}
							enableClickRow
							isReadonly
						/>
					)}

					{selectedCity && !selectedDistrict && (
						<TableDistrict
							title="Pilih Kecamatan"
							onClickRow={(rowData) => setSelectedDistrict(rowData)}
							displayedColumns={['#', 'Nama Kecamatan']}
							enableClickRow
							params={{ city_id: selectedCity.id }}
							isReadonly
						/>
					)}

					{selectedCity && selectedDistrict && (
						<TableVillage
							title="Pilih Desa/Kelurahan"
							onClickRow={(rowData) => setSelectedVillage(rowData)}
							displayedColumns={['#', 'Desa/Kelurahan']}
							enableClickRow
							params={{ district_id: selectedDistrict.id }}
							isReadonly
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dapil;
