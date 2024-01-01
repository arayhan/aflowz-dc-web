import * as yup from 'yup';

export const loginSchema = yup.object().shape({
	username: yup.string().required('Username wajib diisi'),
	password: yup.string().required('Password wajib diisi')
});

export const formProgramSchema = yup.object().shape(
	{
		program_category_id: yup.number().required('Mitra wajib diisi'),
		name: yup.string().required('Nama program wajib diisi'),
		periode: yup.number('Periode harus berupa angka').required('Periode wajib diisi'),
		pic_staff_id: yup.number().required('PIC Tim Internal wajib diisi'),
		pic: yup.string().required('Nama PIC Kementerian wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Kementerian wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka'),
		description: yup.string().required('Deskripsi wajib diisi'),
		location: yup.string().required('Lokasi pelaksanaan program wajib diisi'),
		date: yup.string().required('Tanggal pelaksanaan program wajib diisi'),
		total_participant: yup.number().required('Jumlah peserta wajib diisi')
	},
	['pic_mobile', 'pic_mobile']
);

export const formProgramOrganizationSchema = yup.object().shape({
	program_id: yup.number().required('Program wajib diisi'),
	partner_id: yup.number().required('Staff wajib diisi'),
	position_id: yup.number().required('Posisi wajib diisi'),
	city_id: yup.number().required('Kota wajib diisi'),
	konstituen_id: yup.number().required('Institusi wajib diisi')
});

export const formMitraSchema = yup.object().shape(
	{
		name: yup.string().required('Nama program wajib diisi'),
		pic_staff_id: yup.number().required('PIC Tim Internal wajib diisi'),
		pic: yup.string().required('Nama PIC Kementerian wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Kementerian wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka'),
		address: yup.string().required('Alamat wajib diisi')
	},
	['pic_mobile', 'pic_mobile']
);

export const formMitraTimelineSchema = yup.object().shape({
	name: yup.string().required('Nama timeline wajib diisi'),
	start_date: yup.string().required('Tanggal mulai timeline wajib diisi'),
	end_date: yup.string().required('Tanggal berakhir timeline wajib diisi'),
	program_category_id: yup.number().required('PIC Tim Internal wajib diisi'),
	target_receiver: yup.string().required('Jumlah Target Penerima wajib diisi'),
	pic_staff_id: yup.number().required('PJ Internal wajib diisi'),
	location: yup.string().required('Lokasi wajib diisi'),
	status: yup.string().required('Status wajib diisi')
});

export const formCitySchema = yup.object().shape(
	{
		name: yup.string().required('Nama program wajib diisi'),
		province_id: yup.string().required('Provinsi wajib diisi'),
		pic_staff_id: yup.number().required('PIC Tim Internal wajib diisi'),
		pic: yup.string().required('Nama PIC Daerah wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Daerah wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka')
	},
	['pic_mobile', 'pic_mobile']
);

export const formVillageSchema = yup.object().shape(
	{
		name: yup.string().required('Nama program wajib diisi'),
		district_id: yup.string().required('District wajib diisi'),
		pic_staff_id: yup.number().required('PIC Tim Internal wajib diisi'),
		pic: yup.string().required('Nama PIC Daerah wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Daerah wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka')
	},
	['pic_mobile', 'pic_mobile']
);

export const formTPSSchema = yup.object().shape(
	{
		name: yup.string().required('Nama program wajib diisi'),
		periode: yup.number('Periode harus berupa angka').required('Periode wajib diisi'),
		contact: yup
			.string()
			.required('Kontak wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka'),
		total_target_voters: yup.number().required('Total Target Suara wajib diisi'),
		total_dc_voters: yup.number().required('Total Suara DC wajib diisi'),
		total_legitimate_vote: yup.number().required('Total Suara Yang Sah wajib diisi'),
		total_invalid_vote: yup.number().required('Total Suara Yang Tidak Valid wajib diisi'),
		village_id: yup.number().required('Kelurahan/Desa wajib diisi'),
		witness_staff_ids: yup.array().min(1, 'Saksi wajib diisi'),
		volunteer_staff_ids: yup.array().min(1, 'Relawan wajib diisi')
	},
	['contact', 'contact']
);

export const formDistrictSchema = yup.object().shape(
	{
		name: yup.string().required('Nama program wajib diisi'),
		city_id: yup.number().required('Kota wajib diisi'),
		pic_staff_id: yup.number().required('PIC Tim Internal wajib diisi'),
		pic: yup.string().required('Nama PIC Daerah wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Daerah wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka')
	},
	['pic_mobile', 'pic_mobile']
);

export const formKonstituenSchema = yup.object().shape(
	{
		name: yup.string().required('Nama Institusi wajib diisi'),
		konstituen_type: yup.string().required('Tipe institusi wajib dipilih'),
		address: yup.string().required('Belum mengisi alamat institusi'),
		city_id: yup.number().required('Belum memilih kota asal institusi'),
		district_id: yup.number().required('Belum memilih kecamatan asal institusi'),
		village_id: yup.number().required('Belum memilih kelurahan/desa asal institusi'),
		pic: yup.string().required('Belum mengisi PIC institusi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC institusi wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka'),
		pic_staff_id: yup.number().required('Belum memilih PIC tim internal')
	},
	['pic_mobile', 'pic_mobile']
);

export const formStaffSchema = yup.object().shape({
	nik_number: yup
		.string()
		.matches(/^[0-9]*$/, 'NIK tidak valid (Harus berupa angka)')
		.min(16, 'NIK tidak valid (Harus 16 angka)')
		.max(16, 'NIK tidak valid (Harus 16 angka)')
		.required('NIK wajib diisi'),
	name: yup.string().required('Nama wajib diisi'),
	birth_place: yup.string().required('Belum memiliih kota kelahiran'),
	birth_date: yup.date().nullable().required('Belum mengisi tanggal lahir'),
	gender: yup.string().required('Belum memilih jenis kelamin'),
	address: yup.string().required('Belum mengisi alamat domisili'),
	province: yup.number().required('Belum memiliih provinsi'),
	city: yup.number().nullable().required('Belum memiliih kota/kabupaten domisili'),
	district: yup.number().nullable().required('Belum memiliih kecamatan domisili'),
	village: yup.number().nullable().required('Belum memiliih kelurahan/desa domisili'),
	mobile: yup
		.string()
		.required('Nomor wajib diisi')
		.matches(/^[0-9]*$/, 'Nomor tidak valid (Harus berupa angka)')
		.min(8, 'Minimal 8 angka'),
	email: yup.string().email('Format Email tidak sesuai'),
	religion: yup.string().required('Belum memilih agama'),
	staff_titles: yup.array().min(1, 'Role wajib diisi')
});

export const formActivitySchema = yup.object().shape({
	description_activity: yup.string().required('Nama Kegiatan wajib diisi'),
	description_activity_detail: yup.string().required('Nama Detail Kegiatan wajib diisi'),
	village_id: yup.number().required('Kelurahan/Desa wajib diisi'),
	district_id: yup.string().required('Kecamatan wajib diisi'),
	city_id: yup.number().required('Kota wajib diisi'),
	category_id: yup.number().required('Kategori kegiatan wajib diisi'),
	activity_date: yup.string().required('Tanggal kegiatan wajib diisi'),
	pic: yup.string().required('PIC kegiatan wajib diisi'),
	pic_mobile: yup
		.string()
		.required('Nomor PIC kegiatan wajib diisi')
		.matches(/^[0-9]*$/, 'Nomor tidak valid')
		.min(8, 'Minimal 8 angka'),
	pic_staff_id: yup.number().required('PIC tim internal wajib diisi'),
	total_participant: yup.number().required('Total peserta wajib diisi'),
	checkout_description: yup.string().required('Deskripsi Checkout wajib diisi')
});

export const formActivityDetailSchema = yup.object().shape({
	description_activity_detail: yup.string().required('Nama Detail Kegiatan wajib diisi'),
	activity_date: yup.string().required('Tanggal kegiatan wajib diisi'),
	pic: yup.string().required('Belum mengisi PIC kegiatan'),
	pic_mobile: yup
		.string()
		.required('Nomor PIC kegiatan wajib diisi')
		.matches(/^[0-9]*$/, 'Nomor tidak valid')
		.min(8, 'Minimal 8 angka'),
	pic_staff_id: yup.number().required('PIC tim internal wajib diisi')
});

export const formActivityPromiseSchema = yup.object().shape({
	name: yup.string().required('Janji wajib diisi')
});

export const formProductSchema = yup.object().shape({
	name: yup.string().required('Nama wajib diisi'),
	sku_code: yup.string().required('SKU wajib diisi'),
	product_category_id: yup.number().required('Kategori Prodcuk wajib dipilih'),
	description: yup.string().required('Deskripsi wajib diisi'),
	quantity: yup.number().required('Jumlah kuantitas wajib diisi')
});

export const formProductMovementSchema = yup.object().shape({
	province: yup.number().nullable(),
	city: yup.number().nullable(),
	district: yup.number().nullable(),
	village: yup.number().nullable(),
	konstituen: yup.number().nullable(),
	program: yup.number().nullable(),
	pic_staff_id: yup.number().nullable().required('Belum memiliih PIC tim internal'),
	description: yup.string().required('Deskripsi wajib diisi'),
	method: yup.string().required('Belum memilih metode')
});

export const formProposalSchema = yup.object().shape({
	name: yup.string().required('Usulan wajib diisi')
});

export const formProgramTimelineSchema = yup.object().shape({
	name: yup.string().required('Nama timeline wajib diisi'),
	start_date: yup.string().required('Tanggal mulai timeline wajib diisi'),
	end_date: yup.string().required('Tanggal berakhir timeline wajib diisi')
});

export const formVisitasiSchema = yup.object().shape({
	name: yup.string().required('Nama mahasiswa wajib diisi'),
	date: yup.string().required('Tanggal visitasi wajib diisi'),
	origin: yup.string().required('Asal daerah wajib diisi'),
	note: yup.string().required('Catatan wajib diisi'),
	address: yup.string().required('Alamat tinggal wajib diisi'),
	phone: yup
		.string()
		.required('Nomor handphone mahasiswa wajib diisi')
		.matches(/^[0-9]*$/, 'Nomor tidak valid')
		.min(8, 'Minimal 8 angka'),
	father_phone: yup
		.string()
		.nullable()
		.test('is-valid-phone-number', 'Nomor tidak valid.', (value) => (!value ? true : /^[0-9]*$/.test(value)))
		.test('is-more-than-8-digits', 'Minimal 8 angka', (value) => (!value ? true : value.length > 8))
		.notRequired(),
	mother_phone: yup
		.string()
		.nullable()
		.test('is-valid-phone-number', 'Nomor tidak valid.', (value) => (!value ? true : /^[0-9]*$/.test(value)))
		.test('is-more-than-8-digits', 'Minimal 8 angka', (value) => (!value ? true : value.length > 8))
		.notRequired(),
	total_family_member: yup
		.number()
		.required('Wajib diisi')
		.typeError('Harus berupa angka')
		.min(1, 'Jumlah anggota keluarga wajib diisi'),
	konstituen_id: yup.number().required('Institusi wajib diisi'),
	program_id: yup.number().required('Program wajib diisi'),
	village_id: yup.number().required('Kelurahan/Desa wajib diisi'),
	district_id: yup.string().required('Kecamatan wajib diisi'),
	city_id: yup.number().required('Kota wajib diisi')
});

export const formVisitasiPromiseSchema = yup.object().shape({
	name: yup.string().required('Janji wajib diisi')
});

export const formDPTSchema = yup.object().shape({
	tps_id: yup.number().required('TPS wajib diisi'),
	nik_number: yup.string().required('NIK wajib diisi')
});
