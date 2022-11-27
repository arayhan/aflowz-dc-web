import { InputText } from '@/components/atoms';
import { InputSelectCity, InputSelectKonstituen, InputSelectStaff } from '@/components/molecules';
import { useKonstituenStore } from '@/store';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FormKonstituenCreate = () => {
	const { postKonstituenCreate, getKonstituenList } = useKonstituenStore();

	const [inputNamaInstitusi, setInputNamaInstitusi] = useState('');
	const [typeKonstituen, setTypeKonstituen] = useState('');
	const [inputAlamat, setInputAlamat] = useState('');
	const [selectCity, setSelectCity] = useState(0);
	const [inputNamaPIC, setInputNamaPIC] = useState('');
	const [inputMobilePIC, setInputMobilePIC] = useState('');
	const [selectStaff, setSelectStaff] = useState(0);
	const [showError, setShowError] = useState(false);

	const navigate = useNavigate();

	const handleForm = () => {
		if (inputNamaInstitusi === '') setShowError(true);
		if (typeKonstituen === '') setShowError(true);
		if (inputAlamat === '') setShowError(true);
		if (selectCity === 0) setShowError(true);
		if (inputNamaPIC === '') setShowError(true);
		if (inputMobilePIC === '' || inputMobilePIC.match(/[a-zA-Z]/i)) setShowError(true);
		if (selectStaff === 0) setShowError(true);

		setTimeout(() => {
			setShowError(false);
		}, 3000);

		if (inputNamaInstitusi !== '' && typeKonstituen !== '' && inputAlamat !== '' && selectCity !== 0 && inputNamaPIC !== '' && inputMobilePIC !== '' && !inputMobilePIC.match(/[a-zA-Z]/i) && selectStaff !== 0) {
			const data = {
				name: inputNamaInstitusi,
				konstituen_type: typeKonstituen,
				address: inputAlamat,
				city_id: selectCity,
				pic: inputNamaPIC,
				pic_mobile: inputMobilePIC,
				pic_staff_id: selectStaff
			};

			postKonstituenCreate(data);
			getKonstituenList();
			navigate('/konstituen', {replace: true});

		}
	};

	return (
		<div className="space-y-8">
			<div>
				<div className="font-light text-xl">Tambah Konstituen</div>
				<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
			</div>
			<hr />
			<div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
				<div>
					<InputText label="Nama Institusi" name="nama_institusi" placeholder="Nama Institusi" onChange={(e) => setInputNamaInstitusi(e.target.value)} />
					{(showError && inputNamaInstitusi === '') && <div className="text-sm text-red-500">Belum Mengisi Nama Institusi</div>}
				</div>
				<div>
					<InputSelectKonstituen selectedKonstituen={setTypeKonstituen} />
					{(showError && typeKonstituen === '') && <div className="text-sm text-red-500">Belum Pilih Institusi</div>}
				</div>
				<div>
					<InputText label="Alamat" name="alamat" placeholder="Alamat Institusi" onChange={(e) => setInputAlamat(e.target.value)} />
					{(showError && inputAlamat === '') && <div className="text-sm text-red-500">Belum Mengisi Alamat Institusi</div>}
				</div>
				<div>
					<InputSelectCity selectedCity={setSelectCity} />
					{(showError && selectCity === 0) && <div className="text-sm text-red-500">Belum Mengisi Kota Institusi</div>}
				</div>
				<div>
					<InputText label="Nama PIC Institusi" name="nama_pic_institusi" placeholder="Nama PIC Institusi" onChange={(e) => setInputNamaPIC(e.target.value)} />
					{(showError && inputNamaPIC === '') && <div className="text-sm text-red-500">Belum Mengisi Nama PIC Institusi</div>}
				</div>
				<div>
					<InputText label="Kontak PIC Institusi" name="mobile_pic_institusi" placeholder="Kontak PIC Institusi" onChange={(e) => setInputMobilePIC(e.target.value)} />
					{(showError && (inputMobilePIC === '' || inputMobilePIC.replace(/[^a-zA-Z]/gi, ''))) && <div className="text-sm text-red-500">Belum Mengisi Kontak PIC Institusi</div>}
				</div>
				<div>
					<InputSelectStaff selectedStaff={setSelectStaff} />
					{(showError && selectStaff === 0) && <div className="text-sm text-red-500">Belum Memilih Staff</div>}
				</div>
			</div>
			<hr />
			<div className="flex justify-end">
				<button className="px-8 py-3 bg-primary-500 hover:bg-primary-600 rounded-md text-white" onClick={handleForm}>Submit</button>
			</div>
		</div>
	);
};