import { InputText } from "@/components/atoms";
import { useKonstituenStore } from "@/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputSelectCity, InputSelectKonstituen, InputSelectStaff } from '@/components/molecules';
import { toast } from 'react-toastify';
import { SERVICE_KONSTITUEN } from '@/services';

export const FormKonstituenUpdate = () => {
    const params = useParams();
    const { konstituenDetail, getKonstituenDetail, updateKonstituen, getKonstituenList } = useKonstituenStore();

    useEffect(() => {
        getKonstituenDetail(params.konstituenID);
    }, [params]);

    const [inputNamaInstitusi, setInputNamaInstitusi] = useState('');
    const [typeKonstituen, setTypeKonstituen] = useState('');
    const [inputAlamat, setInputAlamat] = useState('');
    const [selectCity, setSelectCity] = useState(0);
    const [inputNamaPIC, setInputNamaPIC] = useState('');
    const [inputMobilePIC, setInputMobilePIC] = useState('');
    const [selectStaff, setSelectStaff] = useState(0);

    const navigate = useNavigate();

    const handleForm = async () => {
        const data = {
            name: inputNamaInstitusi,
            konstituen_type: typeKonstituen,
            address: inputAlamat,
            city_id: selectCity,
            pic: inputNamaPIC,
            pic_mobile: inputMobilePIC,
            pic_staff_id: selectStaff
        };

        if (inputNamaInstitusi === '') delete data.name;
        if (typeKonstituen === '') delete data.konstituen_type;
        if (inputAlamat === '') delete data.address;
        if (selectCity === 0) delete data.city_id;
        if (inputNamaPIC === '') delete data.pic;
        if (inputMobilePIC === '') delete data.pic_mobile;
        if (selectStaff === 0) delete data.pic_staff_id;

        updateKonstituen(params.konstituenID, data);

        toast.success('Berhasil Merubah Konstituen', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        const defaultParams = { limit: 10, offset: 0 };
        const { success, payload } = await SERVICE_KONSTITUEN.getKonstituenList(defaultParams);
        
        if (success) {
            getKonstituenList();
            navigate('/konstituen', {replace: true});
        }
    };

    return (
        <div>
            <div className="space-y-8">
                <div>
                    <div className="font-light text-xl">Edit Konstituen</div>
                    <div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
                </div>
                <hr />
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                        <InputText label="Nama Institusi" name="nama_institusi" placeholder="Nama Institusi" defaultValue={konstituenDetail?.konstituen_name} onChange={(e) => setInputNamaInstitusi(e.target.value)} />
                        {/* {(showError && inputNamaInstitusi === '') && <div className="text-sm text-red-500">Belum Mengisi Nama Institusi</div>} */}
                    </div>
                    <div>
                        <InputSelectKonstituen selectedKonstituen={setTypeKonstituen} setPlaceholder={konstituenDetail?.konstituen_type}/>
                        {/* {(showError && typeKonstituen === '') && <div className="text-sm text-red-500">Belum Pilih Institusi</div>} */}
                    </div>
                    <div>
                        <InputText label="Alamat" name="alamat" placeholder="Alamat Institusi" defaultValue={konstituenDetail?.alamat_konstituen} onChange={(e) => setInputAlamat(e.target.value)} />
                        {/* {(showError && inputAlamat === '') && <div className="text-sm text-red-500">Belum Mengisi Alamat Institusi</div>} */}
                    </div>
                    <div>
                        <InputSelectCity selectedCity={setSelectCity} />
                        {/* {(showError && selectCity === 0) && <div className="text-sm text-red-500">Belum Mengisi Kota Institusi</div>} */}
                    </div>
                    <div>
                        <InputText label="Nama PIC Institusi" name="nama_pic_institusi" placeholder="Nama PIC Institusi" defaultValue={konstituenDetail?.konstituen_pic} onChange={(e) => setInputNamaPIC(e.target.value)} />
                        {/* {(showError && inputNamaPIC === '') && <div className="text-sm text-red-500">Belum Mengisi Nama PIC Institusi</div>} */}
                    </div>
                    <div>
                        <InputText label="Kontak PIC Institusi" name="mobile_pic_institusi" placeholder="Kontak PIC Institusi" defaultValue={konstituenDetail?.konstituen_pic_mobile} onChange={(e) => setInputMobilePIC(e.target.value)} />
                        {/* {(showError && (inputMobilePIC === '' || inputMobilePIC.replace(/[^a-zA-Z]/gi, ''))) && <div className="text-sm text-red-500">Belum Mengisi Kontak PIC Institusi</div>} */}
                    </div>
                    <div>
                        <InputSelectStaff selectedStaff={setSelectStaff} setPlaceholder={konstituenDetail?.pic_staff.name}/>
                        {/* {(showError && selectStaff === 0) && <div className="text-sm text-red-500">Belum Memilih Staff</div>} */}
                    </div>
                </div>
                <hr />
                <div className="flex justify-end">
                    <button className="px-7 py-3 rounded-sm inline-block text-center transition-all bg-primary-500 hover:bg-primary-400 disabled:bg-primary-300 text-white mx-2 disabled:bg-opacity-50 disabled:hover:bg-primary-500 disabled:hover:bg-opacity-50 disabled:cursor-not-allowed" 
                        disabled={(inputNamaInstitusi || typeKonstituen || inputAlamat || inputNamaPIC || inputMobilePIC) !== '' || (selectCity || selectStaff) !== 0 ? false : true}
                        onClick={handleForm}>Submit</button>
                    <button className="px-7 py-3 rounded-sm inline-block text-center transition-all bg-white hover:bg-primary-200 text-primary-200 hover:text-primary-100 border" onClick={() => navigate('/konstituen')}>Cancel</button>
                </div>
            </div>
        </div>
    )
};