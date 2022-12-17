import { Button, TableHeader, Table, TableFooter, InputLabel } from '@/components/atoms';
import { InputText } from '@/components/atoms/index';
import { useStockiestStore, useAuthStore } from '@/store';
import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputSelectDate, InputSelectProductMovement } from '../../index';
import { objectToQueryString, queryStringToObject } from '@/utils/helpers';

export const TableStockiestMovementLog = ({ params, isShowFooter, isReadonly }) => {
	const { isSystem } = useAuthStore();
	const { productLogList, fetchingProductLogList, getProductLogList } = useStockiestStore();
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);
	const [logType, setLogType] = useState('');
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const { search } = useLocation();

	useEffect(() => {
		if (productLogList) {
			setData(productLogList.items);
			setPageCount(Math.ceil(productLogList.total / perPage));
		}
	}, [productLogList, pageCount]);

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult };

		if (search) Object.assign(defaultParams, queryStringToObject(search));

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getProductLogList({ ...defaultParams, product_id: params });
		}
	}, [params, page, perPage, pageCount, search]);

	useEffect(() => {
		let obj = search && queryStringToObject(search);
		if (obj?.start_date) setStartDate(new Date(obj.start_date));
		if (obj?.end_date) setEndDate(new Date(obj.end_date));
		let lower = obj?.log_type && obj.log_type.toLowerCase();
		if (obj?.log_type) setLogType(lower);
	}, [search]);

	const handleFilter = (log, start, end) => {
		let obj = new Object();
		if (start) obj.start_date = start.toLocaleDateString('en-CA');
		if (end) obj.end_date = end.toLocaleDateString('en-CA');
		if (log) obj.log_type = log.toUpperCase();
		const requestQuery = objectToQueryString(obj);
		navigate(location.pathname + requestQuery);
	};

	const columns = useMemo(
		() => [
			{
				Header: '#',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				Cell: (row) => <div className="text-gray-400">{Number(row.row.id) + offset + 1}</div>
			},
			{
				Header: 'Tanggal',
				minWidth: 150,
				Cell: (row) => <div>{new Date(row.row.original.date).toLocaleDateString('es-CL')}</div>
			},
			{
				Header: 'Kota',
				minWidth: 150,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.city.name || '-'}</div>
			},
			{
				Header: 'Kecamatan',
				minWidth: 150,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.district.name || '-'}</div>
			},
			{
				Header: 'Kelurahan/Desa',
				minWidth: 150,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.village.name || '-'}</div>
			},
			{
				Header: 'Institusi',
				minWidth: 150,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.konstituen.name || '-'}</div>
			},
			{
				Header: 'Program',
				minWidth: 150,
				Cell: (row) => <div>{row.row.original.program.name || '-'}</div>
			},
			{
				Header: 'PIC Tim Internal',
				minWidth: 150,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.pic_staff.name}</div>
			},
			{
				Header: 'Jumlah',
				minWidth: 50,
				Cell: (row) => {
					if (row.row.original.reference.includes('OUT')) {
						return <div>- {row.row.original.quantity}</div>;
					} else {
						return <div>+ {row.row.original.quantity}</div>;
					}
				}
			},
			{
				Header: 'Deskripsi',
				minWidth: 200,
				Cell: (row) => <div>{row.row.original.description ? row.row.original.description : 'Stock Updated'}</div>
			}
		],
		[offset, perPage, page, isSystem]
	);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					title={'Product Movement Log'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem || isReadonly}
					showButtonCreate={false}
				/>
			</div>

			<div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<div>
					<InputSelectProductMovement onChange={(e) => setLogType(e.value)} value={logType} />
				</div>
				<div>
					<div className="space-y-1">
						<InputLabel text={'Tanggal Awal'} />
						<div className={`border border-gray-300 rounded-[4px] px-3 py-[6px]`}>
							<InputSelectDate
								selectedDate={startDate}
								onChange={(date) => setStartDate(date)}
								selectsStart
								startDate={startDate}
								endDate={endDate}
							/>
						</div>
					</div>
				</div>
				<div>
					{startDate ? (
						<div className="space-y-1">
							<InputLabel text={'Tanggal Akhir'} />
							<div className={`border border-gray-300 rounded-[4px] px-3 py-[6px]`}>
								<InputSelectDate
									selectedDate={endDate}
									onChange={(date) => setEndDate(date)}
									selectsEnd
									startDate={startDate}
									endDate={endDate}
									minDate={startDate}
									disabled={startDate ? false : true}
								/>
							</div>
						</div>
					) : (
						<InputText disabled={true} placeholder="Pilih Tanggal" label={'Tanggal Akhir'} />
					)}
				</div>
				<div className="flex justify-evenly items-end">
					<Button
						variant={'primary'}
						className={'px-7 py-2'}
						text={'Filter'}
						onClick={() => {
							handleFilter(logType, startDate, endDate);
						}}
					/>
					<Button
						variant={'warning'}
						className={'px-7 py-2'}
						text={'Reset'}
						onClick={() => {
							setLogType('');
							setStartDate(null);
							setEndDate(null);
							navigate(location.pathname);
						}}
					/>
				</div>
			</div>

			<div className="overflow-x-scroll">
				<Table columns={columns} data={data} loading={fetchingProductLogList || productLogList === null} />
			</div>

			{isShowFooter && (
				<div className="p-6">
					<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
				</div>
			)}
		</div>
	);
};
