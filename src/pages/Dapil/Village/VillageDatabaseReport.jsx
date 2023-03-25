import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/atoms';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ChartPenerimaKIPPerYear, ChartPenerimaPIPPerYear, ChartPenerimaProgramByGender } from '@/components/molecules';
import Skeleton from 'react-loading-skeleton';
import { useVillageStore } from '@/store';
import { useParams } from 'react-router-dom';

const VillageDatabaseReport = () => {
	const { villageID } = useParams();
	const pageOneRef = useRef();
	const pageTwoRef = useRef();
	const pageThreeRef = useRef();

	const { villageDetail, fetchingVillageDetail, getVillageDetail } = useVillageStore();

	const handleGenerateImage = async (ref) => {
		const style = document.createElement('style');
		document.head.appendChild(style);
		style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');

		const canvas = await html2canvas(ref);
		style.remove();
		return canvas.toDataURL('image/jpg');
	};

	const handleExportToPDF = async () => {
		const doc = new jsPDF({ orientation: 'portrait' });

		const imagePageOne = await handleGenerateImage(pageOneRef.current);
		const imagePageTwo = await handleGenerateImage(pageTwoRef.current);
		const imagePageThree = await handleGenerateImage(pageThreeRef.current);

		doc.addImage(imagePageOne, 'JPEG', 0, 0, 210, 297);
		doc.addPage();
		doc.addImage(imagePageTwo, 'JPEG', 0, 0, 210, 297);
		doc.addPage();
		doc.addImage(imagePageThree, 'JPEG', 0, 0, 210, 297);
		doc.save('Village Database Report.pdf');
	};

	useEffect(() => {
		if (villageID && !villageDetail) getVillageDetail(villageID);
	}, [villageID, villageDetail]);

	return (
		<div className="bg-gray-100">
			<div className="container py-8 space-y-4">
				<div className="flex justify-end">
					<Button onClick={handleExportToPDF} className="px-6 py-3 text-sm rounded-sm" variant={'primary'}>
						Export to PDF
					</Button>
				</div>
				<div className="overflow-hidden rounded-md">
					<div className={`flex flex-col lg:items-center bg-[#525659] h-[1123px] p-8 overflow-y-scroll gap-8`}>
						{fetchingVillageDetail && <Skeleton height={1123} />}
						{!fetchingVillageDetail && villageDetail && (
							<>
								<div ref={pageOneRef} className={`relative w-[794px] min-h-[1123px] bg-white p-8`}>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<img className="w-20" src={require('@/images/icons/3.png')} alt="" />
											<span className="text-lg font-semibold leading-tight">
												Database <br /> Report
											</span>
										</div>
										<div className="text-3xl font-bold">DESA/KELURAHAN</div>
									</div>
									<hr className="my-4" />
									<div className="flex items-start justify-between">
										<div className="space-y-1">
											<div className="text-sm">DESA/KELURAHAN :</div>
											<div className="px-2 py-1 text-lg font-semibold bg-primary-200">
												{villageDetail?.village_name}
											</div>
										</div>
										<div className="space-y-1">
											<div className="text-sm">
												KORWIL : {villageDetail?.village_pic || '-'}
												{villageDetail?.village_pic_mobile ? `(${villageDetail?.village_pic_mobile})` : ''}
											</div>
											<div className="text-sm">
												PIC TEMPAT : {villageDetail?.pic_staff?.name || '-'}
												{villageDetail?.pic_staff?.mobile ? `(${villageDetail?.pic_staff?.mobile})` : ''}
											</div>
										</div>
									</div>
									<div className="py-8 space-y-4">
										<div className="relative space-y-8">
											<div className="font-semibold text-center">DATA JUMLAH PENERIMA SEMUA PROGRAM :</div>
											<div className="flex items-center justify-between gap-4">
												<div className="space-y-8">
													<div className="px-10 py-2 text-center bg-primary">
														<div className="font-semibold text-secondary">Total</div>
														<div className="text-2xl font-semibold text-white">
															{villageDetail?.total_penerima_program_village_per_orang}
														</div>
													</div>
													<div className="space-y-1 text-center">
														<div className="px-10 py-2 bg-primary">
															<div className="font-semibold text-secondary">Total</div>
															<div className="text-2xl font-semibold text-white">
																{villageDetail?.total_penerima_multiple_program_village_per_orang}
															</div>
														</div>
														<div className="text-sm">2 ATAU LEBIH</div>
													</div>
												</div>

												<div>
													<ChartPenerimaProgramByGender
														totalPria={villageDetail?.total_penerima_program_village_per_orang_pria}
														totalWanita={villageDetail?.total_penerima_program_village_per_orang_wanita}
													/>
												</div>

												<div className="space-y-2">
													{villageDetail?.total_penerima_program_village_by_periode_per_program?.map((program) => (
														<div key={program.periode} className="px-6 py-1 text-center bg-primary">
															<div className="text-sm font-semibold text-secondary">{program.periode}</div>
															<div className="text-lg font-semibold text-white">{program.total_program}</div>
														</div>
													))}
												</div>
											</div>

											<div className="relative space-y-6">
												<div className="font-semibold text-center">TOTAL PENERIMA PROGRAM PIP :</div>
												<div className="flex items-center gap-4">
													<div className="space-y-2">
														<div className="text-sm text-center">INSTITUSI</div>
														<div className="px-6 py-1 text-center bg-primary">
															<div className="text-sm font-semibold text-secondary">SD</div>
															<div className="text-lg font-semibold text-white">0</div>
														</div>
														<div className="px-6 py-1 text-center bg-primary">
															<div className="text-sm font-semibold text-secondary">SMP</div>
															<div className="text-lg font-semibold text-white">0</div>
														</div>
														<div className="px-6 py-1 text-center bg-primary">
															<div className="text-sm font-semibold text-secondary">SMP</div>
															<div className="text-lg font-semibold text-white">0</div>
														</div>
														<div className="px-6 py-1 text-center bg-primary">
															<div className="text-sm font-semibold text-secondary">SMK</div>
															<div className="text-lg font-semibold text-white">0</div>
														</div>
													</div>

													<div className="w-full">
														<ChartPenerimaPIPPerYear />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="absolute left-0 w-full text-center bottom-8">1</div>
								</div>

								<div ref={pageTwoRef} className={`relative w-[794px] min-h-[1123px] bg-white p-8`}>
									<div className="py-10 space-y-16">
										<div className="relative space-y-6">
											<div className="font-semibold text-center">TOTAL PENERIMA PROGRAM KIP :</div>
											<div className="flex items-center gap-4">
												<div className="space-y-2">
													<div className="px-8 py-2 text-center bg-primary">
														<div className="font-semibold text-secondary">Total</div>
														<div className="text-2xl font-semibold text-white">
															{villageDetail?.total_institusi_penerima_program_village_kip}
														</div>
													</div>
												</div>

												<div className="w-full">
													<ChartPenerimaKIPPerYear />
												</div>
											</div>
										</div>

										<div className="relative space-y-6">
											<div className="font-semibold text-center">TOTAL MASYARAKAT PENERIMA PROGRAM :</div>
											<table className="w-full">
												<thead className="bg-primary">
													<tr>
														<th className="px-6 py-3 text-left text-white">Nama Program</th>
														<th className="px-6 py-3 text-white">Qty</th>
													</tr>
												</thead>
												<tbody>
													{villageDetail?.penerima_program_village?.map((program) => (
														<tr key={program?.program_id} className="odd:bg-gray-100">
															<td className="px-6 py-3 text-sm font-semibold">{program.program_name}</td>
															<td className="px-6 py-3 text-sm font-semibold text-center">
																{program?.total_penerima_program}
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
									<div className="absolute left-0 w-full text-center bottom-8">2</div>
								</div>

								<div ref={pageThreeRef} className={`relative w-[794px] min-h-[1123px] bg-white p-8`}>
									<div className="py-10 space-y-16">
										<div className="relative mt-8 space-y-6">
											<div className="font-semibold text-center">TOTAL MASYARAKAT PENERIMA PROGRAM PER INSTITUSI:</div>
											<table className="w-full">
												<thead className="bg-primary">
													<tr>
														<th className="px-6 py-3 text-left text-white">Nama Institusi</th>
														<th className="px-6 py-3 text-left text-white">Tipe Institusi</th>
														<th className="px-6 py-3 text-white">Qty</th>
													</tr>
												</thead>
												<tbody>
													{villageDetail?.penerima_program_village_konstituen.map((program) => (
														<tr key={program?.program_id} className="odd:bg-gray-100">
															<td className="px-6 py-3 text-sm font-semibold">{program?.konstituen_name}</td>
															<td className="px-6 py-3 text-sm font-semibold capitalize">{program?.konstituen_type}</td>
															<td className="px-6 py-3 text-sm font-semibold text-center">{program?.total_penerima}</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
									<div className="absolute left-0 w-full text-center bottom-8">3</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default VillageDatabaseReport;
