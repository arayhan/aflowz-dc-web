import { useParams } from 'react-router-dom';
import { useAuthStore, usePartnerStore } from '@/store';
import { BannerFeature, TableStaffDetailInstitusi, TableStaffDetailProgram } from '@/components/molecules';
import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Button, ButtonAction, InputTextInfo } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { MdAddAPhoto } from 'react-icons/md';

const StaffDetail = () => {
	const { isSystem, isAdmin } = useAuthStore();
	const params = useParams();
	const { staff, fetchingStaff, getStaff, updatePicture } = usePartnerStore();

	const [editPicture, setEditPicture] = useState('');
	const [getFileSize, setGetFileSize] = useState('');
	const [showError, setShowError] = useState('');
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		getStaff(params.staffID);
	}, [params, showButton]);

	const fileRef = useRef();

	const handleSavePicture = () => {
		if (staff) {
			if (getFileSize.size < 524288) {
				let split = editPicture.split(',');
				updatePicture(params.staffID, { picture: split[1] }, ({ success }) => {
					if (success) {
						setShowButton(false);
					}
				});
			} else {
				setShowError(true);
				setTimeout(() => {
					setShowError(false);
					setShowButton(false);
					setEditPicture('');
				}, 1000);
			}
		}
	};

	const uploadImage = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
		setEditPicture(base64);
	};

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	return (
		<div>
			<BannerFeature title={staff ? `${staff?.name}` : 'Detail Tim Internal'} loading={fetchingStaff} />
			<section className="py-12 bg-gray-100 md:py-12">
				<div className="container">
					{fetchingStaff && <StaffDetailSkeleton />}
					{!fetchingStaff && staff && (
						<div className="space-y-6">
							<div className="col-span-12 p-5 bg-gray-100">
								<div className="bg-white rounded-md shadow-lg">
									<div className="flex flex-col items-start justify-between gap-4 p-4 md:flex-row md:items-center">
										<div className="w-full space-y-2">
											<div className="text-xl font-light">Detail Tim Internal</div>
											{/* <div className="text-sm text-gray-400">
												Lorem ipsum dolor sit amet, consectetur adipisicing elit.
											</div> */}
										</div>
										<div className="flex flex-col items-center justify-end w-full gap-4 md:flex-row">
											<ButtonAction
												action={ACTION_TYPES.UPDATE}
												linkTo={`/staff/update/${params.staffID}`}
												className={'w-full md:w-auto text-base px-5 py-3 rounded-md'}
												text="Update"
											/>
										</div>
									</div>
									<hr />
									<div className="flex-col p-5 my-2 rounded-md">
										<div className="flex justify-center w-full">
											{staff?.image_url || editPicture !== '' ? (
												<img src={editPicture ? editPicture : staff?.image_url} className="w-52" />
											) : (
												<img
													src={editPicture ? editPicture : require('@/images/dummy-profile.webp')}
													className="w-52"
												/>
											)}
										</div>
										<div className="flex justify-center w-full">
											{showError && (
												<p className="flex justify-center w-full mb-5 text-red-500">Max. Photo Size 500kb</p>
											)}
											{(isAdmin || isSystem) && editPicture !== '' && showButton ? (
												<div className="flex justify-center mt-2 mb-5 w-52">
													<div className="flex w-52 justify-evenly">
														<Button variant={'success'} type="button" onClick={handleSavePicture} className="px-5 py-2">
															Save
														</Button>
														<Button
															type="button"
															variant={'danger'}
															className="px-3 py-2"
															onClick={() => {
																setEditPicture('');
																setShowButton(false);
															}}
														>
															Cancel
														</Button>
													</div>
												</div>
											) : (
												<div className="flex justify-center mt-2 mb-5 w-52">
													<Button
														type="button"
														onClick={() => fileRef.current.click()}
														variant={'primary'}
														className="p-4 rounded-full"
													>
														<MdAddAPhoto />
														<input
															type="file"
															onChange={(e) => {
																setGetFileSize(e.target.files[0]);
																uploadImage(e);
																setShowButton(true);
															}}
															ref={fileRef}
															hidden
														/>
													</Button>
												</div>
											)}
										</div>
										<div className="overflow-x-auto">
											<div className="grid w-full grid-cols-12 text-sm gap-y-1">
												<InputTextInfo tag={'NIK'} value={staff?.nik_number || 'Belum Tercantum'} />
												<InputTextInfo tag={'Nama Tim Internal'} value={staff?.name || 'Belum Tercantum'} />
												<InputTextInfo tag={'Alamat Domisili'} value={staff?.address || 'Belum Mencantumkan'} />
												<InputTextInfo tag={'No. HP/Telp'} value={staff?.mobile || 'Belum Mencantumkan'} />
												<InputTextInfo tag={'Email'} value={staff?.email || 'Belum Mencantumkan'} />
												<InputTextInfo
													tag={'Role'}
													value={
														<div>
															{staff?.staff_titles.length === 0 && (
																<div className="text-gray-500">Belum Mencantumkan</div>
															)}
															{staff?.staff_titles.length > 0 && (
																<ul className="space-y-2 list-disc list-inside">
																	{staff?.staff_titles.map((title) => {
																		return (
																			<li key={title.id}>
																				<span>{title.parent ? `${title.parent.name}` : ''}</span>
																				<span>({title.name})</span>
																			</li>
																		);
																	})}
																</ul>
															)}
														</div>
													}
												/>
												<InputTextInfo
													tag={'Kota/Kabupaten Domisili'}
													value={staff?.city?.name || 'Belum Mencantumkan'}
												/>
												<InputTextInfo
													tag={'Kecamatan Domisili'}
													value={staff?.district?.name || 'Belum Mencantumkan'}
												/>
												<InputTextInfo
													tag={'Kelurahan/Desa Domisili'}
													value={staff?.village.name || 'Belum Mencantumkan'}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
									<div className="my-5 p-2 bg-white rounded-md shadow-lg max-h-[50vh] overflow-x-auto overflow-y-auto">
										<TableStaffDetailProgram
											fetchData={staff?.programs}
											isReadonly={!isSystem}
											titleHeader={'List Program'}
										/>
									</div>
									<div className="my-5 p-2 bg-white rounded-md shadow-lg max-h-[50vh] overflow-x-auto overflow-y-auto">
										<TableStaffDetailInstitusi
											fetchData={staff?.konstituens_pic}
											isReadonly={!isSystem}
											titleHeader={'List Institusi'}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const StaffDetailSkeleton = () => {
	return (
		<div className="p-5 space-y-6 bg-white rounded-md">
			<div className="col-span-12">
				<Skeleton height={250} />
			</div>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-12 md:col-span-6">
					<Skeleton height={300} />
				</div>
				<div className="col-span-12 md:col-span-6">
					<Skeleton height={300} />
				</div>
				<div className="col-span-12">
					<Skeleton height={250} />
				</div>
			</div>
		</div>
	);
};

export default StaffDetail;
