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
		pic_staff_id: yup.number().required('PIC internal wajib diisi'),
		pic: yup.string().required('PIC eksternal wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC eksternal wajib diisi')
			.matches(/^[0-9]*$/, 'Nomor tidak valid')
			.min(8, 'Minimal 8 angka')
	},
	['pic_mobile', 'pic_mobile']
);

export const formMitraSchema = yup.object().shape(
	{
		name: yup.string().required('Nama program wajib diisi'),
		alias: yup.string().required('Alias program wajib diisi'),
		pic_staff_id: yup.number().required('PIC internal wajib diisi'),
		pic: yup.string().required('PIC eksternal wajib diisi'),
		pic_mobile: yup
			.string()
			.required('Nomor PIC eksternal wajib diisi')
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
		.matches(/^[0-9]*$/, 'NIK tidak valid')
		.min(16, 'NIK tidak valid')
		.max(16, 'NIK tidak valid')
		.required('NIK wajib diisi'),
	name: yup.string().required('Nama wajib diisi'),
	birth_place: yup.string().required('Belum memiliih kota kelahiran'),
	birth_date: yup.date().nullable().required('Belum mengisi tanggal lahir'),
	gender: yup.string().required('Belum memilih jenis kelamin'),
	address: yup.string().required('Belum mengisi alamat domisili'),
	province: yup.number().required('Belum memiliih provinsi'),
	city: yup.number().required('Belum memiliih kota domisili'),
	village: yup.number().required('Belum memiliih kecamatan'),
	mobile: yup
		.string()
		.required('Nomor wajib diisi')
		.matches(/^[0-9]*$/, 'Nomor tidak valid')
		.min(8, 'Minimal 8 angka'),
	email: yup.string().email().required('Belum mengisi email'),
	religion: yup.string().required('Belum memilih agama'),
	staff_title: yup.string().required('Belum memiliih role')
});
