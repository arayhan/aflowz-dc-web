import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/atoms';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Skeleton from 'react-loading-skeleton';
import { useKonstituenStore, useProgramStore } from '@/store';
import { useParams } from 'react-router-dom';
import { INSTITUSI_TYPES } from '@/utils/constants';
import moment from 'moment';
import { createArrayWithRange } from '@/utils/helpers';
import { toast } from 'react-toastify';

const KonstituenDatabaseReport = () => {
	const { konstituenID } = useParams();
	const pageOneRef = useRef();
	const pageTwoRef = useRef();

	const { konstituenDetail, fetchingKonstituenDetail, getKonstituenDetail } = useKonstituenStore();
	const { programList, fetchingProgramList, getProgramList } = useProgramStore();

	const TOTAL_PENERIMA_PROGRAM_LAIN_YEAR_MAX = moment().format('YYYY');
	const TOTAL_PENERIMA_PROGRAM_LAIN_YEAR_MIN = Number(TOTAL_PENERIMA_PROGRAM_LAIN_YEAR_MAX) - 5;
	const TOTAL_PENERIMA_PROGRAM_LAIN_YEARS = createArrayWithRange(
		TOTAL_PENERIMA_PROGRAM_LAIN_YEAR_MIN,
		TOTAL_PENERIMA_PROGRAM_LAIN_YEAR_MAX
	).reverse();

	const [jumlahUsulan, setJumlahUsulan] = useState(false);

	const handleGenerateImage = async (ref) => {
		const style = document.createElement('style');
		document.head.appendChild(style);
		style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');

		const canvas = await html2canvas(ref);
		style.remove();
		return canvas.toDataURL('image/jpg');
	};

	const handleExportToPDF = async () => {
		if (jumlahUsulan) {
			const doc = new jsPDF({ orientation: 'portrait' });

			const imagePageOne = await handleGenerateImage(pageOneRef.current);
			const imagePageTwo = await handleGenerateImage(pageTwoRef.current);

			doc.addImage(imagePageOne, 'JPEG', 0, 0, 210, 297);
			doc.addPage();
			doc.addImage(imagePageTwo, 'JPEG', 0, 0, 210, 297);
			doc.save('Institusi Database Report.pdf');
		} else {
			toast('Masukkan jumlah usulan terlebih dahulu', { type: 'warning' });
		}
	};

	useEffect(() => {
		if (konstituenID && !konstituenDetail) getKonstituenDetail(konstituenID);
	}, [konstituenID, konstituenDetail]);

	useEffect(() => {
		if (!programList) getProgramList();
	}, [programList]);

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
						{(fetchingKonstituenDetail || fetchingProgramList) && <Skeleton height={1123} />}
						{!fetchingKonstituenDetail && !fetchingProgramList && konstituenDetail && (
							<>
								<div ref={pageOneRef} className={`relative w-[794px] min-h-[1123px] bg-white p-8`}>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<img className="w-20" src={require('@/images/icons/3.png')} alt="" />
											<span className="text-lg font-semibold leading-tight">
												Database <br /> Report
											</span>
										</div>
										<div className="text-3xl font-bold">INSTITUSI</div>
									</div>
									<hr className="my-4" />
									<div className="grid grid-cols-3">
										<div className="col-span-2 space-y-1">
											<div className="text-sm">INSTITUSI :</div>
											<div className="inline-block px-2 py-1 text-lg font-semibold bg-primary-200">
												{konstituenDetail?.konstituen_name}
											</div>
											{konstituenDetail?.konstituen_type === INSTITUSI_TYPES.SEKOLAH && (
												<div className="text-sm">NAMA KEPALA INSTITUSI :</div>
											)}
											{konstituenDetail?.konstituen_type === INSTITUSI_TYPES.KAMPUS && (
												<div className="text-sm">LO KAMPUS :</div>
											)}
											<div className="inline-block px-2 py-1 text-lg font-semibold bg-primary-200">
												{konstituenDetail?.konstituen_pic}{' '}
												{konstituenDetail?.konstituen_pic_mobile ? `(${konstituenDetail?.konstituen_pic_mobile})` : ''}
											</div>
											<div className="text-sm">PIC INTERNAL :</div>
											<div className="inline-block px-2 py-1 text-lg font-semibold bg-primary-200">
												{konstituenDetail?.pic_staff?.name || '-'}{' '}
												{konstituenDetail?.pic_staff?.mobile ? `(${konstituenDetail?.pic_staff?.mobile})` : ''}
											</div>
										</div>
										<div className="space-y-3">
											<div className="text-sm">
												ALAMAT : <br />
												<span className="capitalize">{konstituenDetail?.alamat_konstituen || '-'}</span>
											</div>
											<div className="text-sm">
												JUMLAH USULAN : <br />
												<input
													type="number"
													className={`text-sm border ${
														!jumlahUsulan ? 'border-red-500 border-2' : 'border-gray-400'
													}  rounded-md`}
													placeholder="Masukkan jumlah usulan"
													onChange={(event) => setJumlahUsulan(event.target.value)}
												/>
												{!jumlahUsulan && <div className="mt-1 text-xs italic text-red-500">Wajib diisi</div>}
											</div>
										</div>
									</div>
									<div className="py-8 space-y-4">
										<div className="relative space-y-6">
											{konstituenDetail?.konstituen_type === INSTITUSI_TYPES.SEKOLAH && (
												<div className="font-semibold text-center">TOTAL PENERIMA PROGRAM PIP :</div>
											)}
											{konstituenDetail?.konstituen_type === INSTITUSI_TYPES.KAMPUS && (
												<div className="font-semibold text-center">TOTAL PENERIMA PROGRAM KIP :</div>
											)}
											<table className="w-full">
												<thead className="bg-primary">
													<tr>
														<th className="px-6 py-3 text-left text-white">
															Periode{' '}
															<span>
																{konstituenDetail?.konstituen_type === INSTITUSI_TYPES.SEKOLAH && 'PIP'}
																{konstituenDetail?.konstituen_type === INSTITUSI_TYPES.KAMPUS && 'KIP'}
															</span>
														</th>
														<th className="px-6 py-3 text-white">Qty</th>
													</tr>
												</thead>
												<tbody>
													{konstituenDetail?.total_penerima_program_konstituen_by_periode_per_program?.map(
														(program) => (
															<tr key={program?.periode} className="odd:bg-gray-100">
																<td className="px-6 py-3 text-sm font-semibold">{program.periode}</td>
																<td className="px-6 py-3 text-sm font-semibold text-center">
																	{program?.total_penerima_program}
																</td>
															</tr>
														)
													)}
												</tbody>
											</table>
										</div>
									</div>

									<div className="absolute left-0 w-full text-center bottom-8">1</div>
								</div>

								<div ref={pageTwoRef} className={`relative w-[794px] min-h-[1123px] bg-white p-8`}>
									<div className="relative space-y-6">
										<div className="font-semibold text-center">TOTAL PENERIMA PROGRAM LAIN :</div>
										<table className="w-full">
											<thead className="bg-primary">
												<tr>
													<th className="px-6 py-3 text-left text-white">Nama Program</th>
													{TOTAL_PENERIMA_PROGRAM_LAIN_YEARS.map((year) => (
														<th key={year} className="px-6 py-3 text-white">
															{year}
														</th>
													))}
												</tr>
											</thead>
											<tbody>
												{konstituenDetail?.penerima_program_konstituen?.map((program) => (
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

export default KonstituenDatabaseReport;
