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
		description: yup.string().required('Deskripsi wajib diisi')
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
	date: yup.string().required('Tanggal timeline wajib diisi'),
	program_category_id: yup.number().required('PIC Tim Internal wajib diisi')
});

export const formCitySchema = yup.object().shape(
	{
		name: yup.string().required('Nama program wajib diisi'),
		province_id: yup.string().required('Provinsi wajib diisi'),
		pic_staff_id: yup.number().required('PIC Tim Internal wajib diisi'),
		pic: yup.string().required('Nama PIC Kementerian wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Kementerian wajib diisi')
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
		pic: yup.string().required('Nama PIC Kementerian wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Kementerian wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka')
	},
	['pic_mobile', 'pic_mobile']
);

export const formTPSSchema = yup.object().shape(
	{
		name: yup.string().required('Nama program wajib diisi'),
		village_id: yup.string().required('Desa wajib diisi'),
		pic_staff_id: yup.number().required('PIC Tim Internal wajib diisi'),
		pic: yup.string().required('Nama PIC Kementerian wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Kementerian wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka')
	},
	['pic_mobile', 'pic_mobile']
);

export const formDistrictSchema = yup.object().shape(
	{
		name: yup.string().required('Nama program wajib diisi'),
		city_id: yup.string().required('Kota wajib diisi'),
		pic_staff_id: yup.number().required('PIC Tim Internal wajib diisi'),
		pic: yup.string().required('Nama PIC Kementerian wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC Kementerian wajib diisi')
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
		city: yup.number().required('Belum memilih kota asal institusi'),
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
	email: yup.string().email().required('Belum mengisi email'),
	religion: yup.string().required('Belum memilih agama'),
	staff_titles: yup.array().min(1, 'Role wajib diisi')
});

export const formActivitySchema = yup.object().shape({
	description: yup.string().required('Deskripsi wajib diisi')
});

export const formActivityDetailSchema = yup.object().shape({
	description: yup.string().required('Deskripsi wajib diisi'),
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
