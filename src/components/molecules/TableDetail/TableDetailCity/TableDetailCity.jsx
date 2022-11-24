import React from 'react'

export const TableDetailCity = ({ data }) => {
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
				Header: 'Nama Kota',
				accessor: 'city_name',
			},
			{
				Header: 'Total Penerima',
				accessor: 'total_penerima',
			}
		],
		[]
	);

	return (
		<div>TableDetailCity</div>
	)
}
