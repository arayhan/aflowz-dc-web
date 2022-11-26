import * as yup from 'yup';

export const loginSchema = yup.object().shape({
	username: yup.string().required('Username wajib diisi'),
	password: yup.string().required('Password wajib diisi')
});

export const formProgramSchema = yup.object().shape({
	program_category_id: yup.number().required('Mitra wajib diisi'),
	name: yup.string().required('Nama program wajib diisi'),
	periode: yup.number('Periode harus berupa angka').required('Periode wajib diisi')
	// pic: yup.string().required('PIC wajib diisi')
});
