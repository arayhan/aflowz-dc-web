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
		pic_staff_id: yup.number().required('PIC wajib diisi'),
		pic_mobile: yup.string().when('pic_mobile', (val) => {
			return val?.length > 0
				? yup
						.string()
						.min(8, 'Nomor tidak valid')
						.matches(/^[0-9]*$/, 'Nomor tidak valid')
						.required('Nomor PIC wajib diisi')
				: yup.string().notRequired();
		})
	},
	['pic_mobile', 'pic_mobile']
);
