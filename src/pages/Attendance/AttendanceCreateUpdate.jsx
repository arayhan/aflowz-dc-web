import { BannerFeature, FormAttendance } from '@/components/molecules';
import React from 'react';
import { useParams } from 'react-router-dom';

const AttendanceCreateUpdate = () => {
	const { attendanceID } = useParams();

	return (
		<div>
			<BannerFeature
				title={`${attendanceID ? 'Edit' : 'Create'} - Absensi`}
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
				backButtonLinkTo={'/absensi'}
				backButtonText="Kembali ke Daftar Absensi"
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto">
						<div className="bg-white p-8 rounded-md">
							<FormAttendance />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AttendanceCreateUpdate;
