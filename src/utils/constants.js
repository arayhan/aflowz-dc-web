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

export const NEGATIVE_CASE_TYPES = {
	EMPTY_RESULT: 'EMPTY_RESULT',
	EMPTY_SEARCH: 'EMPTY_SEARCH',
	ERROR_CONNECTION: 'ERROR_CONNECTION'
};

export const ORGANIZATION_TYPE = {
	TIM_INTERNAL: 'TIM_INTERNAL',
	MITRA: 'MITRA'
};

export const PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];

export const MITRA_MENUS = [
	{ id: 1, title: 'Mitra', icon: require('@/images/icons/Icon_Home/Mitra.svg').default, path: '/mitra' },
	{ id: 2, title: 'Program', icon: require('@/images/icons/Icon_Home/Program.svg').default, path: '/program' },
	{ id: 3, title: 'Institusi', icon: require('@/images/icons/Icon_Home/Konstitusi.svg').default, path: '/institusi' }
];

export const KANTOR_MENUS = [
	{ id: 4, title: 'Tim Internal', icon: require('@/images/icons/Icon_Home/Staff.svg').default, path: '/staff' },
	{ id: 5, title: 'Absensi', icon: require('@/images/icons/Icon_Home/Absensi.svg').default, path: '/absensi' },
	{ id: 8, title: 'Inventory', icon: require('@/images/icons/Icon_Home/Inventory.svg').default, path: '/stockiest' }
];

export const AKTIVITAS_MENUS = [
	{ id: 6, title: 'Penerima', icon: require('@/images/icons/Icon_Home/Penerima.svg').default, path: '/penerima' },
	{ id: 7, title: 'Kegiatan', icon: require('@/images/icons/Icon_Home/Activity.svg').default, path: '/activity' },
	{ id: 9, title: 'Dapil', icon: require('@/images/icons/Icon_Home/Dapil.svg').default, path: '/dapil' }
];

export const DAPIL_MENUS = [
	{ id: 10, title: 'Kota', icon: require('@/images/icons/Icon_Home/Kota.svg').default, path: '/dapil/city' },
	{ id: 11, title: 'Kecamatan', icon: require('@/images/icons/Icon_Home/Desa.svg').default, path: '/dapil/district' },
	{ id: 12, title: 'Desa', icon: require('@/images/icons/Icon_Home/Desa.svg').default, path: '/dapil/village' }
];
