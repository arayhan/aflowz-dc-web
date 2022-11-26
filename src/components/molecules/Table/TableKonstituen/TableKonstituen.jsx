import { Table, Toast } from "@/components/atoms";
import { useKonstituenStore } from "@/store";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SiGooglesheets } from 'react-icons/si';
import { toast } from 'react-toastify';

export const TableKonstituen = ({ selectedType }) => {
	const { fetchingKonstituenList, konstituenList, getKonstituenList, deleteKonstituen } = useKonstituenStore();

	const [data, setData] = useState([]);
	const [konstituen, setKonstituen] = useState(null);

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
				Header: 'Nama Institusi',
				accessor: 'name',
				minWidth: 175
			},
			{
				Header: 'Konstitusi',
				minWidth: 125,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.konstituen_type}</div>
			},
			{
				Header: 'Kota / Kabupaten',
				minWidth: 150,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.city.name}</div>
			},
			{
				Header: 'Detail',
				minWidth: 100,
				maxWidth: 100,
				Cell: (row) => {
					return (
						<div className="min-w-[100px] w-full">
							<Link
								to={`/konstituen/${row.row.original.id}`}
								className="w-full max-w-[200px] text-center bg-blue-500 hover:bg-blue-600 transition-all inline-block text-white text-xs md:text-sm px-2 py-2 rounded-md"
							>
								See Detail
							</Link>
						</div>
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 180,
				Cell: (row) => {
					return (
						<div className="grid grid-cols-2 gap-2">
							<Link 
								to={`/konstituen/update/${row.row.original.id}`} 
								className="w-full max-w-[200px] text-center bg-green-500 hover:bg-green-600 transition-all inline-block text-white text-xs md:text-sm px-2 py-2 rounded-md">
								Update
							</Link>
							<button onClick={() => setKonstituen(row.row.original)}
								className="w-full max-w-[200px] text-center bg-red-500 hover:bg-red-600 transition-all inline-block text-white text-xs md:text-sm px-2 py-2 rounded-md">
								Delete
							</button>
						</div>
					);
				}
			}
		],
		[]
	);

	useEffect(() => {
		const params = selectedType ? selectedType : null;
		getKonstituenList(params);
	}, [selectedType]);

	useEffect(() => {
		if (konstituenList) setData(konstituenList.items);
	});

	const handleDelete = (konstituenID) => {
		deleteKonstituen(konstituenID);

		toast.success('Berhasil Menghapus Konstituen', {
			position: "top-right",
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

		setKonstituen(null);
		getKonstituenList();
	};

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6 flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
				<div>
					<div className="text-lg font-extralight transform: capitalize">{selectedType ? selectedType.konstituen_type : 'Semua Konstitusi'}</div>
					<div className="text-sm text-gray-400">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet.
					</div>
				</div>
				<div className="w-full lg:w-1/4 flex flex-col sm:justify-end sm:flex-row gap-3">
					<button className="bg-green-500 hover:bg-green-600 space-x-1 text-white px-5 py-3 flex items-center justify-center rounded-md transition-all">
						<SiGooglesheets />
						<span className="text-sm">Upload XLS</span>
					</button>
					<Link
						to="/konstituen/create"
						className="block bg-blue-500 hover:bg-blue-600 space-x-1 text-white px-5 py-3 rounded-md transition-all text-center text-sm"
					>
						<span>Create New Institution</span>
					</Link>
				</div>
			</div>
			<div className="overflow-x-auto">
				<Table columns={columns} data={data} loading={fetchingKonstituenList || konstituenList === null} />
			</div>
			{
				konstituen ?
					<div tabIndex={-1} className="overflow-y-auto overflow-x-hidden backdrop-blur-sm fixed right-0 left-0 top-0 flex justify-center items-center z-50 md:inset-0 h-modal sm:h-full">
						<div className="relative p-4 w-full max-w-md h-auto">
							<div className="relative border-2 bg-white rounded-lg shadow border-main-500">
								<div className="p-6 text-center">
									<p className="font-normal text-black">Anda yakin ingin menghapus institusi ini?</p>
									<p className='my-3 font-semibold'>{konstituen.name}</p>
									<button type="button" className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
										onClick={() => handleDelete(konstituen.id)}>
										Yes, Delete
									</button>
									<button type="button" onClick={() => setKonstituen(null)}
										className="text-main-500 bg-white focus:ring-2 focus:ring-main-500 border border-gray-300 hover:bg-gray-100 rounded-lg text-sm font-medium px-5 py-2.5 focus:z-10 "
									>Cancel</button>
								</div>
							</div>
						</div>
					</div>
					:
					""
			}
		</div>
	);
};