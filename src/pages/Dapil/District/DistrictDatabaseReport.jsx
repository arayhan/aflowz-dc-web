import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/atoms';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ChartPenerimaKIPPerYear, ChartPenerimaPIPPerYear, ChartPenerimaProgramByGender } from '@/components/molecules';
import Skeleton from 'react-loading-skeleton';
import { useDistrictStore } from '@/store';
import { useParams } from 'react-router-dom';

const DistrictDatabaseReport = () => {
	const { districtID } = useParams();
	const pageOneRef = useRef();
	const pageTwoRef = useRef();

	const { districtDetail, fetchingDistrictDetail, getDistrictDetail } = useDistrictStore();

	const [theMostTotalPenerima, setTheMostTotalPenerima] = useState(null);
	const [theLeastTotalPenerima, setTheLeastTotalPenerima] = useState(null);

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

		doc.addImage(imagePageOne, 'JPEG', 0, 0, 210, 297);
		doc.addPage();
		doc.addImage(imagePageTwo, 'JPEG', 0, 0, 210, 297);
		doc.save('District Database Report.pdf');
	};

	useEffect(() => {
		if (districtID && !districtDetail) getDistrictDetail(districtID);
	}, [districtID, districtDetail]);

	useEffect(() => {
		if (districtDetail) {
			const sortedPenerima = districtDetail.penerima_program_district_district?.sort((a, b) => {
				return b.total_penerima - a.total_penerima;
			});

			if (sortedPenerima?.length) {
				setTheMostTotalPenerima(sortedPenerima[0]);
				setTheLeastTotalPenerima(sortedPenerima[sortedPenerima.length - 1]);
			}
		}
	}, [districtDetail]);

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
						{fetchingDistrictDetail && <Skeleton height={1123} />}
						{!fetchingDistrictDetail && districtDetail && (
							<>
								<div ref={pageOneRef} className={`relative w-[794px] min-h-[1123px] bg-white p-8`}>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<img className="w-20" src={require('@/images/icons/3.png')} alt="" />
											<span className="text-lg font-semibold leading-tight">
												Database <br /> Report
											</span>
										</div>
										<div className="text-3xl font-bold">KECAMATAN</div>
									</div>
									<hr className="my-4" />
									<div className="flex items-start justify-between">
										<div className="space-y-1">
											<div className="text-sm">KECAMATAN :</div>
											<div className="px-2 py-1 text-lg font-semibold bg-primary-200">
												{districtDetail?.district_name}
											</div>
										</div>
										<div className="space-y-1">
											<div className="text-sm">
												KORWIL : {districtDetail?.district_pic || '-'}
												{districtDetail?.district_pic_mobile ? `(${districtDetail?.district_pic_mobile})` : ''}
											</div>
											<div className="text-sm">
												PIC TEMPAT : {districtDetail?.pic_staff?.name || '-'}
												{districtDetail?.pic_staff?.mobile ? `(${districtDetail?.pic_staff?.mobile})` : ''}
											</div>
										</div>
									</div>
									<div className="py-8 space-y-4">
										<div className="relative space-y-6">
											<div className="font-semibold text-center">DATA JUMLAH PENERIMA SEMUA PROGRAM :</div>
											<div className="flex items-center justify-between gap-4">
												<div className="space-y-8">
													<div className="px-10 py-2 text-center bg-primary">
														<div className="font-semibold text-secondary">Total</div>
														<div className="text-2xl font-semibold text-white">
															{districtDetail?.total_penerima_program_district_per_program}
														</div>
													</div>
													<div className="space-y-1 text-center">
														<div className="px-10 py-2 bg-primary">
															<div className="font-semibold text-secondary">Total</div>
															<div className="text-2xl font-semibold text-white">
																{districtDetail?.total_penerima_multiple_program_district_per_orang}
															</div>
														</div>
														<div className="text-sm">2 ATAU LEBIH</div>
													</div>
												</div>

												<div>
													<ChartPenerimaProgramByGender totalPria={20} totalWanita={24} />
												</div>

												<div className="space-y-2">
													{districtDetail?.total_penerima_program_district_by_periode_per_program?.map((program) => (
														<div key={program.periode} className="px-6 py-1 text-center bg-primary">
															<div className="text-sm font-semibold text-secondary">{program.periode}</div>
															<div className="text-lg font-semibold text-white">{program.total_program}</div>
														</div>
													))}
												</div>
											</div>

											<div className="space-y-4">
												<table className="w-full text-sm">
													<tbody>
														<tr>
															<td className="w-2/3">KECAMATAN PALING BANYAK MENERIMA PROGRAM</td>
															<td className="px-2">:</td>
															<td className="w-full py-1">
																<div
																	className={`w-full px-3 ${
																		theMostTotalPenerima?.district_name ? 'py-1' : 'py-4'
																	}  font-semibold bg-primary-200`}
																>
																	{theMostTotalPenerima?.district_name}
																</div>
															</td>
														</tr>
														<tr>
															<td className="w-2/3">KECAMATAN PALING SEDIKIT MENERIMA PROGRAM</td>
															<td className="px-2">:</td>
															<td className="w-full py-1">
																<div
																	className={`w-full px-3 ${
																		theMostTotalPenerima?.district_name ? 'py-1' : 'py-4'
																	}  font-semibold bg-primary-200`}
																>
																	{theLeastTotalPenerima?.district_name}
																</div>
															</td>
														</tr>
													</tbody>
												</table>
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
															{districtDetail?.total_institusi_penerima_program_district_kip}
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
													{districtDetail?.penerima_program_district?.map((program) => (
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
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DistrictDatabaseReport;
