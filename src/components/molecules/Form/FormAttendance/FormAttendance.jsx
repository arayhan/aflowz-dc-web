import { Button, InputLabel, Table } from '@/components/atoms';
import { useAttendanceStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { InputSelectDate } from '../../InputSelect/InpuSelectDate/InputSelectDate';
import { InputSelectAttendance } from '../../InputSelect/InputSelectAttendance/InputSelectAttendance';
import { InputSelectStaff } from '../../InputSelect/InputSelectStaff/InputSelectStaff';

export const FormAttendance = () => {
	const [date, setDate] = useState(new Date());
	const [dataTable, setDataTable] = useState([]);
	const [person, setPerson] = useState(null);
	const [description, setDescription] = useState(0);
	const [showError, setShowError] = useState(false);
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
				Header: 'NIK',
				minWidth: 175,
				Cell: (row) => {
					return <div className="text-gray-400">{row.row.original.nik_number}</div>;
				}
			},
			{
				Header: 'Nama',
				minWidth: 125,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.name}</div>
			},
			{
				Header: 'Keterangan',
				minWidth: 150,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.desc_name}</div>
			},
			{
				Header: 'Hapus',
				minWidth: 150,
				Cell: (row) => {
					return (
						<button
							type="button"
							className="min-w-[100px] w-full bg-red-500 hover:bg-red-400 text-white px-3 py-2 rounded-sm text-xs"
							onClick={() => {
								onDelete(row.row.original);
							}}
						>
							Delete
						</button>
					);
				}
			}
		],
		[]
	);

	const { attendanceID } = useParams();
	const navigate = useNavigate();

	const {
		attendance,
		fetchingAttendance,
		processingCreateAttendance,
		getAttendance,
		updateAttendance,
		createAttendance,
		clearStateAttendance
	} = useAttendanceStore();

	const onSubmitAttendance = () => {
		if (attendanceID) {
			updateAttendance(attendanceID, values, ({ success }) => {
				if (success) navigate(`/absensi`);
			});
		} else {
			createAttendance({ date: date, data: dataTable }, ({ payload, success }) => {
				if (success) navigate(`/absensi/${payload.id}`);
			});
		}
	};

	const onAdded = (pers, desc) => {
		let exist = dataTable.find((val) => val.value === pers.value);
		let data = {
			id: pers.value,
			name: pers.label?.split(' - ')[1],
			nik_number: pers.label?.split(' - ')[0],
			desc: desc
		};
		if (exist === undefined) {
			if (desc === 1) {
				setDataTable([...dataTable, { ...data, desc_name: 'Tidak Hadir' }]);
				setPerson(null);
				setDescription(0);
			} else {
				setDataTable([...dataTable, { ...data, desc_name: 'Hadir' }]);
				setPerson(null);
				setDescription(0);
			}
		} else {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 1000);
		}
	};

	useEffect(() => {
		console.log('useeffect', dataTable);
	}, [dataTable]);

	const onDelete = (val) => {
		console.log('ondelete', dataTable);
		alert('Still on Progress');
		// let filteredArray = dataTable.filter((item) => item !== val);
		// setDataTable(filteredArray);
	};

	window.onbeforeunload = function () {
		return 'Data will be lost if you leave the page, are you sure?';
	};

	useEffect(() => {
		if (attendanceID) getAttendance(attendanceID);
	}, [attendanceID]);

	useEffect(() => {
		if (attendanceID && attendance) {
			setDate(new Date(attendance?.date));
			setValue('date', attendance.date || null);
			setValue('attendance', attendance?.list_attendance || []);
			setValue('abscene', attendance?.list_abscene || []);
		}
	}, [attendanceID, attendanceID]);

	useEffect(() => () => clearStateAttendance(), []);

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">{attendanceID ? 'Edit' : 'Tambah'} Absensi</div>
				<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-3 gap-x-8 gap-y-6">
				<div className="space-y-1">
					<InputLabel text={'Tanggal Input Absensi'} />
					<div className={`border border-gray-300 rounded-[4px] px-3 py-[6px]`}>
						<InputSelectDate selectedDate={date} disabled={false} />
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-6 items-end">
				<div className="md:col-span-2">
					<InputSelectStaff
						disabled={processingCreateAttendance || fetchingAttendance}
						value={person?.value}
						onChange={(value) => {
							setPerson(value);
						}}
					/>
				</div>
				<div className="md:col-span-2">
					<InputSelectAttendance
						disabled={processingCreateAttendance || fetchingAttendance}
						value={description}
						onChange={({ value }) => {
							setDescription(value);
						}}
					/>
				</div>
				<div className="lg:col-end-7 lg:col-span-1">
					<Button
						className={'px-7 py-3 rounded-sm'}
						variant="primary"
						disabled={processingCreateAttendance || fetchingAttendance}
						onClick={() => onAdded(person, description)}
					>
						Tambah
					</Button>
				</div>
				{showError && (
					<div className="md:col-span-2">
						<p className="text-red-500">Nama sudah terdaftar</p>
					</div>
				)}
			</div>
			<hr />
			<div className="bg-white rounded-md shadow-md">
				<div className="overflow-x-auto">
					<Table columns={columns} data={dataTable} loading={null} />
				</div>
			</div>
			<hr />
			<div className="flex justify-end">
				<Button
					className={'px-7 py-3 rounded-sm mx-2'}
					variant="warning"
					disabled={processingCreateAttendance || fetchingAttendance}
					linkTo={'/absensi'}
				>
					Cancel
				</Button>
				<Button
					className={'px-7 py-3 rounded-sm'}
					variant="primary"
					disabled={processingCreateAttendance || fetchingAttendance}
					onClick={onSubmitAttendance}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
