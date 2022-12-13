import { BannerFeature, TableAttendance } from '@/components/molecules';

const Attendance = () => {
	return (
		<div>
			<BannerFeature title="Daftar Absensi" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<div className="py-6 container">
					<TableAttendance />
				</div>
			</div>
		</div>
	);
};

export default Attendance;
