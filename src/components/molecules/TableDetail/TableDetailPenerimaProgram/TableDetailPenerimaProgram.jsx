import { ButtonAction, Table } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { useMemo } from 'react';

export const TableDetailPenerimaProgram = ({ dataPenerima, isPerVillage, isPerCity, isPerProgram }) => {
	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				Cell: (row) => {
					return <div className="text-gray-400">{Number(row.row.id) + 1}</div>;
				}
			},
			{
				Header: `${isPerCity ? 'Kota' : isPerVillage ? 'Desa/Kelurahan' : isPerProgram ? 'Nama Program' : ''}`,
				accessor: isPerCity ? 'city_name' : isPerVillage ? 'village_name' : isPerProgram ? 'program_name' : '',
				minWidth: 150
			},
			{
				Header: `${isPerProgram ? 'Nama PIC Mitra' : ''}`,
				accessor: 'program_pic',
				hidden: !isPerProgram,
				minWidth: 150
			},
			{
				Header: `${
					isPerCity ? 'PIC Kota' : isPerVillage ? 'PIC Desa/Kelurahan' : isPerProgram ? 'Nama PJ Internal DC' : ''
				}`,
				accessor: 'pic_staff.name',
				hidden: !isPerCity && !isPerVillage && !isPerProgram,
				minWidth: 200
			},
			{
				Header: `${isPerProgram ? 'Jumlah Program Tersalurkan' : 'Total Penerima'}`,
				accessor: !isPerProgram ? 'total_penerima' : 'total_penerima_program',
				minWidth: 180
			},
			{
				Header: 'Periode',
				accessor: 'program_periode',
				hidden: !isPerProgram,
				maxWidth: 100
			},
			{
				Header: 'Action',
				Cell: (row) => {
					const data = row.row.original;
					const accessor = isPerCity
						? Number(data['city_id'])
						: isPerVillage
						? Number(data['village_id'])
						: isPerProgram
						? Number(data['program_id'])
						: 0;
					const navigate = isPerCity
						? `/dapil/city`
						: isPerVillage
						? `/dapil/village`
						: isPerProgram
						? `/dapil/program`
						: '';
					return <ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`${navigate}/${accessor}`} />;
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={dataPenerima} />;
};
