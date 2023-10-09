export const APP_NAME = process.env.REACT_APP_APP_NAME;
export const APP_COLOR_PRIMARY = '#274c77';

export const USER_ROLE_TYPES = {
	ADMIN: 'admin',
	OWNER: 'owner'
};

export const VARIANT_TYPES = {
	LOADING: 'loading',
	ERROR: 'error',
	INFO: 'info',
	SUCCESS: 'success',
	WARNING: 'warning',
	DANGER: 'danger'
};

export const ACTION_TYPES = {
	CREATE: 'create',
	SEE_DETAIL: 'see_detail',
	UPDATE: 'update',
	DELETE: 'delete'
};

export const INSTITUSI_TYPES = {
	SEKOLAH: 'sekolah',
	KAMPUS: 'kampus',
	PAREKRAF: 'parekraf',
	OLAHRAGASENI: 'olahragaseni',
	KOKADES: 'kokades',
	LAINNYA: 'lainnya'
};

export const INSTITUSI_TYPE_ARRAY = [
	{ label: 'Sekolah', value: INSTITUSI_TYPES.SEKOLAH },
	{ label: 'Perguruan Tinggi', value: INSTITUSI_TYPES.KAMPUS },
	{ label: 'Sektor Pariwisata dan Ekonomi Kreatif', value: INSTITUSI_TYPES.PAREKRAF },
	{ label: 'Sektor Olahraga dan Seni', value: INSTITUSI_TYPES.OLAHRAGASENI },
	{ label: 'Perangkat KOKADES', value: INSTITUSI_TYPES.KOKADES },
	{ label: 'Lainnya', value: INSTITUSI_TYPES.LAINNYA }
];

export const TIMELINE_STATUS = {
	SOON: 'soon',
	ONGOING: 'ongoing',
	DONE: 'done'
};

export const TIMELINE_STATUS_ARRAY = [
	{ label: 'Akan Datang', value: TIMELINE_STATUS.SOON },
	{ label: 'Berlangsung', value: TIMELINE_STATUS.ONGOING },
	{ label: 'Selesai', value: TIMELINE_STATUS.DONE }
];

export const NEGATIVE_CASE_TYPES = {
	EMPTY_RESULT: 'EMPTY_RESULT',
	EMPTY_SEARCH: 'EMPTY_SEARCH',
	ERROR_CONNECTION: 'ERROR_CONNECTION'
};

export const ORGANIZATION_TYPE = {
	TIM_INTERNAL: 'TIM_INTERNAL',
	MITRA: 'MITRA'
};

export const STATUS_PENERIMA_TYPES = {
	CANDIDATE: 'candidate',
	CONFIRMED: 'confirmed',
	REJECTED: 'rejected'
};

export const STATUS_PENERIMA_TYPES_ARRAY = [
	{ label: 'Candidate', value: STATUS_PENERIMA_TYPES.CANDIDATE },
	{ label: 'Confirmed', value: STATUS_PENERIMA_TYPES.CONFIRMED },
	{ label: 'Rejected', value: STATUS_PENERIMA_TYPES.REJECTED }
];

export const PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];

export const MITRA_MENUS = [
	{ id: 1, title: 'Mitra', icon: require('@/images/icons/Icon_Home/Mitra.svg').default, path: '/mitra' },
	{ id: 2, title: 'Program', icon: require('@/images/icons/Icon_Home/Program.svg').default, path: '/program' },
	{
		id: 3,
		title: 'PIP',
		icon: require('@/images/icons/Icon_Home/Program.svg').default,
		path: '/program?keyword=PIP&category_id=6' // category id 6 = kemendikbud
	},
	{
		id: 4,
		title: 'KIP',
		icon: require('@/images/icons/Icon_Home/Program.svg').default,
		path: '/program?keyword=KIP&category_id=6' // category id 6 = kemendikbud
	},
	{ id: 5, title: 'Institusi', icon: require('@/images/icons/Icon_Home/Konstitusi.svg').default, path: '/institusi' }
];

export const KANTOR_MENUS = [
	{ id: 1, title: 'Tim Internal', icon: require('@/images/icons/Icon_Home/Staff.svg').default, path: '/staff' },
	{ id: 2, title: 'Absensi', icon: require('@/images/icons/Icon_Home/Absensi.svg').default, path: '/absensi' },
	{ id: 3, title: 'Inventory', icon: require('@/images/icons/Icon_Home/Inventory.svg').default, path: '/stockiest' }
];

export const AKTIVITAS_MENUS = [
	{ id: 1, title: 'Penerima', icon: require('@/images/icons/Icon_Home/Penerima.svg').default, path: '/penerima' },
	{ id: 2, title: 'Kegiatan', icon: require('@/images/icons/Icon_Home/Activity.svg').default, path: '/activity' },
	{
		id: 3,
		title: 'Visitasi',
		icon: require('@/images/icons/Icon_Home/Activity.svg').default,
		path: '/visitasi'
	},
	{ id: 4, title: 'Dapil', icon: require('@/images/icons/Icon_Home/Dapil.svg').default, path: '/dapil' }
];

export const DAPIL_MENUS = [
	{ id: 1, title: 'Kota', icon: require('@/images/icons/Icon_Home/Kota.svg').default, path: '/dapil/city' },
	{ id: 2, title: 'Kecamatan', icon: require('@/images/icons/Icon_Home/Desa.svg').default, path: '/dapil/district' },
	{ id: 3, title: 'Desa', icon: require('@/images/icons/Icon_Home/Desa.svg').default, path: '/dapil/village' }
];

export const KAMPANYE_MENUS = [
	{ id: 1, title: 'Kota', icon: require('@/images/icons/Icon_Home/Kota.svg').default, path: '/dapil/city' },
];

export const PRODUCT_MOVEMENT_TYPE = {
	IN: 'in',
	OUT: 'out',
	RETURN: 'return',
	CORRECTION_IN: 'correction-in',
	CORRECTION_OUT: 'correction-out'
};
