import { Breadcrumb } from '@/components/atoms';
import { BannerFeature, TableCity, TableDistrict, TableTPS, TableVillage } from '@/components/molecules';
import { useDapilStore } from '@/store';
import { useState, useEffect } from 'react';
import { DapilBadge } from './components/DapilBadge';

const DAPIL_AREA_BREADCRUMB_ITEMS = {
	CITY: { label: 'Pilih Kota', value: 'city' },
	DISTRICT: { label: 'Pilih Kecamatan', value: 'district' },
	VILLAGE: { label: 'Pilih Desa/Kelurahan', value: 'village' },
	TPS: { label: 'Pilih TPS', value: 'tps' }
};

const DAPIL_AREA_BREADCRUMB_ITEMS_ARRAY = Object.values(DAPIL_AREA_BREADCRUMB_ITEMS);

const Dapil = () => {
	const { selectedAreas, setSelectedAreas } = useDapilStore();

	const [activeArea, setActiveArea] = useState(DAPIL_AREA_BREADCRUMB_ITEMS.CITY);
	const [completedBreadcrumbItemCount, setCompletedBreadcrumbItemCount] = useState(0);
	const [tableParams, setTableParams] = useState({});

	useEffect(() => {
		setTableParams({});
		setCompletedBreadcrumbItemCount(Object.values(selectedAreas).filter((area) => area).length);
	}, [selectedAreas]);

	useEffect(() => {
		if (completedBreadcrumbItemCount > 0) {
			setActiveArea(DAPIL_AREA_BREADCRUMB_ITEMS_ARRAY[completedBreadcrumbItemCount]);
		}
	}, [completedBreadcrumbItemCount]);

	return (
		<div className="bg-gray-100">
			<BannerFeature title="Dapil" />
			<div className="container py-16 space-y-8">
				<Breadcrumb
					items={Object.values(DAPIL_AREA_BREADCRUMB_ITEMS)}
					activeItem={activeArea}
					completedItemCount={completedBreadcrumbItemCount}
					onClickItem={(area) => setActiveArea(area)}
				/>

				{selectedAreas.city && (
					<div className="grid grid-cols-2 md:flex bg-white shadow-md p-3 rounded-md gap-2">
						<DapilBadge title={'Kota : '} dataText={selectedAreas.city.name} />

						{selectedAreas.district && <DapilBadge title={'Kecamatan : '} dataText={selectedAreas.district.name} />}
						{selectedAreas.village && <DapilBadge title={'Desa/Kelurahan : '} dataText={selectedAreas.village.name} />}
						{selectedAreas.tps && <DapilBadge title={'TPS : '} dataText={selectedAreas.tps.name} />}
					</div>
				)}

				<div>
					{activeArea.value === DAPIL_AREA_BREADCRUMB_ITEMS.CITY.value && (
						<TableCity
							title="Pilih Kota"
							onClickRow={(rowData) => {
								setSelectedAreas({ city: rowData, district: null, village: null, tps: null });
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
								setSelectedAreas({ ...selectedAreas, district: rowData, village: null, tps: null });
								setActiveArea(DAPIL_AREA_BREADCRUMB_ITEMS.VILLAGE);
							}}
							params={{ ...tableParams, city_id: selectedAreas.city.id }}
							setParams={setTableParams}
							displayedColumns={['#', 'Nama Kecamatan', 'Nama PIC', 'Pilih']}
							enableClickRow
						/>
					)}

					{activeArea.value === DAPIL_AREA_BREADCRUMB_ITEMS.VILLAGE.value && (
						<TableVillage
							title="Pilih Desa/Kelurahan"
							onClickRow={(rowData) => {
								setSelectedAreas({ ...selectedAreas, village: rowData, tps: null });
								setActiveArea(DAPIL_AREA_BREADCRUMB_ITEMS.TPS);
							}}
							params={{ ...tableParams, district_id: selectedAreas.district.id }}
							setParams={setTableParams}
							displayedColumns={['#', 'Nama Desa', 'Nama PIC', 'Pilih']}
							enableClickRow
						/>
					)}

					{activeArea.value === DAPIL_AREA_BREADCRUMB_ITEMS.TPS.value && (
						<TableTPS
							title="Pilih TPS"
							params={{ ...tableParams, village_id: selectedAreas.village.id }}
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
