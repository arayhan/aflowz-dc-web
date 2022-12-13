import { Breadcrumb } from '@/components/atoms';
import { BannerFeature, TableCity, TableDistrict, TableTPS, TableVillage } from '@/components/molecules';
import { useState, useEffect } from 'react';
import { DapilBadge } from './components/DapilBadge';

const DAPIL_AREA_BREADCRUMB_ITEMS = {
	CITY: { label: 'Pilih Kota', value: 'city' },
	DISTRICT: { label: 'Pilih Kecamatan', value: 'district' },
	VILLAGE: { label: 'Pilih Desa/Kelurahan', value: 'village' },
	TPS: { label: 'Pilih TPS', value: 'tps' }
};

const Dapil = () => {
	const [activeArea, setActiveArea] = useState(DAPIL_AREA_BREADCRUMB_ITEMS.CITY);
	const [tableParams, setTableParams] = useState({});
	const [areaData, setAreaData] = useState({
		city: null,
		district: null,
		village: null
	});

	useEffect(() => {
		setTableParams({});
	}, [areaData]);

	return (
		<div className="bg-gray-100">
			<BannerFeature title="Dapil" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="container py-16 space-y-8">
				<Breadcrumb
					items={Object.values(DAPIL_AREA_BREADCRUMB_ITEMS)}
					activeItem={activeArea}
					completedItemCount={Object.values(areaData).filter((data) => data !== null).length}
					onClickItem={(area) => setActiveArea(area)}
				/>

				{areaData.city && (
					<div className="grid grid-cols-2 md:flex bg-white shadow-md p-3 rounded-md gap-2">
						<DapilBadge title={'Kota : '} dataText={areaData.city.name} />

						{areaData.district && <DapilBadge title={'Kecamatan : '} dataText={areaData.district.name} />}
						{areaData.village && <DapilBadge title={'Desa/Kelurahan : '} dataText={areaData.village.name} />}
						{areaData.tps && <DapilBadge title={'TPS : '} dataText={areaData.tps.name} />}
					</div>
				)}

				<div>
					{activeArea.value === DAPIL_AREA_BREADCRUMB_ITEMS.CITY.value && (
						<TableCity
							title="Pilih Kota"
							onClickRow={(rowData) => {
								setAreaData({ city: rowData, district: null, village: null, tps: null });
								setActiveArea(DAPIL_AREA_BREADCRUMB_ITEMS.DISTRICT);
							}}
							params={tableParams}
							setParams={setTableParams}
							displayedColumns={['#', 'Nama Kota', 'Nama PIC', 'Pilih']}
							enableClickRow
						/>
					)}

					{activeArea.value === DAPIL_AREA_BREADCRUMB_ITEMS.DISTRICT.value && (
						<TableDistrict
							title="Pilih Kecamatan"
							onClickRow={(rowData) => {
								setAreaData({ ...areaData, district: rowData, village: null, tps: null });
								setActiveArea(DAPIL_AREA_BREADCRUMB_ITEMS.VILLAGE);
							}}
							params={{ ...tableParams, city_id: areaData.city.id }}
							setParams={setTableParams}
							displayedColumns={['#', 'Nama Kecamatan', 'Nama PIC', 'Pilih']}
							enableClickRow
						/>
					)}

					{activeArea.value === DAPIL_AREA_BREADCRUMB_ITEMS.VILLAGE.value && (
						<TableVillage
							title="Pilih Desa/Kelurahan"
							onClickRow={(rowData) => {
								setAreaData({ ...areaData, village: rowData, tps: null });
								setActiveArea(DAPIL_AREA_BREADCRUMB_ITEMS.TPS);
							}}
							params={{ ...tableParams, district_id: areaData.district.id }}
							setParams={setTableParams}
							displayedColumns={['#', 'Nama Desa', 'Nama PIC', 'Pilih']}
							enableClickRow
						/>
					)}

					{activeArea.value === DAPIL_AREA_BREADCRUMB_ITEMS.TPS.value && (
						<TableTPS
							title="Pilih TPS"
							params={{ ...tableParams, village_id: areaData.village.id }}
							setParams={setTableParams}
							displayedColumns={['#', 'Nama TPS', 'Nama PIC', 'Pilih']}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dapil;
