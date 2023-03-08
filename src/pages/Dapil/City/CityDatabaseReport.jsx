import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/atoms';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ChartPenerimaKIPPerYear, ChartPenerimaPIPPerYear, ChartPenerimaProgramByGender } from '@/components/molecules';
import Skeleton from 'react-loading-skeleton';
import { useCityStore } from '@/store';
import { useParams } from 'react-router-dom';

const CityDatabaseReport = () => {
	const { cityID } = useParams();
	const pageOneRef = useRef();
	const pageTwoRef = useRef();
	const pageThreeRef = useRef();
	const pageFourRef = useRef();

	const { cityDetail, fetchingCityDetail, getCityDetail } = useCityStore();

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
		const imagePageThree = await handleGenerateImage(pageThreeRef.current);
		const imagePageFour = await handleGenerateImage(pageFourRef.current);

		doc.addImage(imagePageOne, 'JPEG', 0, 0, 210, 297);
		doc.addPage();
		doc.addImage(imagePageTwo, 'JPEG', 0, 0, 210, 297);
		doc.addPage();
		doc.addImage(imagePageThree, 'JPEG', 0, 0, 210, 297);
		doc.addPage();
		doc.addImage(imagePageFour, 'JPEG', 0, 0, 210, 297);
		doc.save('City Database Report.pdf');
	};

	useEffect(() => {
		if (cityID && !cityDetail) getCityDetail(cityID);
	}, [cityID, cityDetail]);

	useEffect(() => {
		if (cityDetail) {
			const sortedPenerima = cityDetail.penerima_program_city_district?.sort((a, b) => {
				return b.total_penerima - a.total_penerima;
			});

			if (sortedPenerima?.length) {
				setTheMostTotalPenerima(sortedPenerima[0]);
				setTheLeastTotalPenerima(sortedPenerima[sortedPenerima.length - 1]);
			}
		}
	}, [cityDetail]);

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
						{fetchingCityDetail && <Skeleton height={1123} />}
						{!fetchingCityDetail && cityDetail && (
							<>
								<div ref={pageOneRef} className={`relative w-[794px] min-h-[1123px] bg-white p-8`}>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<img className="w-20" src={require('@/images/icons/3.png')} alt="" />
											<span className="text-lg font-semibold leading-tight">
												Database <br /> Report
											</span>
										</div>
										<div className="text-3xl font-bold">KOTA/KAB</div>
									</div>

									<hr className="my-8" />

									<div className="flex items-start justify-between">
										<div className="space-y-1">
											<div className="text-sm">KOTA / KAB :</div>
											<div className="px-2 py-1 text-lg font-semibold bg-primary-200">{cityDetail?.city_name}</div>
										</div>
										<div className="space-y-1">
											<div className="text-sm">
												KORWIL : {cityDetail?.city_pic || '-'}
												{cityDetail?.city_pic_mobile ? `(${cityDetail?.city_pic_mobile})` : ''}
											</div>
											<div className="text-sm">
												PIC TEMPAT : {cityDetail?.pic_staff?.name || '-'}
												{cityDetail?.pic_staff?.mobile ? `(${cityDetail?.pic_staff?.mobile})` : ''}
											</div>
										</div>
									</div>

									<div className="py-12 space-y-6">
										<div className="relative space-y-6">
											<div className="font-semibold text-center">DATA JUMLAH PENERIMA SEMUA PROGRAM :</div>
											<div className="flex items-center justify-between gap-4">
												<div className="space-y-8">
													<div className="px-10 py-2 text-center bg-primary">
														<div className="font-semibold text-secondary">Total</div>
														<div className="text-2xl font-semibold text-white">
															{cityDetail?.total_penerima_program_city_per_orang}
														</div>
													</div>
													<div className="space-y-1 text-center">
														<div className="px-10 py-2 bg-primary">
															<div className="font-semibold text-secondary">Total</div>
															<div className="text-2xl font-semibold text-white">
																{cityDetail?.total_penerima_multiple_program_city_per_orang}
															</div>
														</div>
														<div className="text-sm">2 ATAU LEBIH</div>
													</div>
												</div>

												<div>
													<ChartPenerimaProgramByGender
														totalPria={cityDetail?.total_penerima_program_city_per_orang_pria}
														totalWanita={cityDetail?.total_penerima_program_city_per_orang_wanita}
													/>
												</div>

												<div className="space-y-2">
													{cityDetail?.total_penerima_program_city_by_periode_per_orang?.map((penerima) => (
														<div key={penerima.periode} className="px-6 py-1 text-center bg-primary">
															<div className="text-sm font-semibold text-secondary">{penerima.periode}</div>
															<div className="text-lg font-semibold text-white">{penerima.total_penerima}</div>
														</div>
													))}
												</div>
											</div>

											<div className="py-8 space-y-4">
												<table className="w-full text-sm">
													<tbody>
														<tr>
															<td className="w-2/3">KECAMATAN PALING BANYAK MENERIMA PROGRAM</td>
															<td className="px-2">:</td>
															<td className="w-full py-1">
																<div className="w-full px-3 py-1 font-semibold bg-primary-200">
																	{theMostTotalPenerima?.district_name}
																</div>
															</td>
														</tr>
														<tr>
															<td className="w-2/3">KECAMATAN PALING SEDIKIT MENERIMA PROGRAM</td>
															<td className="px-2">:</td>
															<td className="w-full py-1">
																<div className="w-full px-3 py-1 font-semibold bg-primary-200">
																	{theLeastTotalPenerima?.district_name}
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div className="absolute left-0 w-full text-center bottom-8">1</div>
								</div>

								<div ref={pageTwoRef} className={`relative w-[794px] min-h-[1123px] bg-white p-8`}>
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

									<div className="py-10 space-y-16">
										<div className="relative space-y-6">
											<div className="font-semibold text-center">TOTAL PENERIMA PROGRAM KIP :</div>
											<div className="flex items-center gap-4">
												<div className="space-y-2">
													<div className="px-8 py-2 text-center bg-primary">
														<div className="font-semibold text-secondary">Total</div>
														<div className="text-2xl font-semibold text-white">
															{cityDetail?.total_institusi_penerima_program_city_kip}
														</div>
													</div>
												</div>

												<div className="w-full">
													<ChartPenerimaKIPPerYear />
												</div>
											</div>
										</div>
									</div>
									<div className="absolute left-0 w-full text-center bottom-8">2</div>
								</div>

								<div ref={pageThreeRef} className={`relative w-[794px] min-h-[1123px] bg-white p-8`}>
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
												{cityDetail?.penerima_program_city.map((program) => (
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

									<div className="relative mt-8 space-y-6">
										<div className="font-semibold text-center">TOTAL MASYARAKAT PENERIMA PROGRAM PER KECAMATAN:</div>
										<table className="w-full">
											<thead className="bg-primary">
												<tr>
													<th className="px-6 py-3 text-left text-white">Nama Kecamatan</th>
													<th className="px-6 py-3 text-white">Qty</th>
												</tr>
											</thead>
											<tbody>
												{cityDetail?.penerima_program_city_district.map((program) => (
													<tr key={program?.program_id} className="odd:bg-gray-100">
														<td className="px-6 py-3 text-sm font-semibold">{program.district_name}</td>
														<td className="px-6 py-3 text-sm font-semibold text-center">{program?.total_penerima}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
									<div className="absolute left-0 w-full text-center bottom-8">3</div>
								</div>

								<div ref={pageFourRef} className={`relative w-[794px] min-h-[1123px] bg-white p-8`}>
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
												{cityDetail?.penerima_program_city_konstituen.map((program) => (
													<tr key={program?.program_id} className="odd:bg-gray-100">
														<td className="px-6 py-3 text-sm font-semibold">{program?.konstituen_name}</td>
														<td className="px-6 py-3 text-sm font-semibold capitalize">{program?.konstituen_type}</td>
														<td className="px-6 py-3 text-sm font-semibold text-center">{program?.total_penerima}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
									<div className="absolute left-0 w-full text-center bottom-8">4</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CityDatabaseReport;
