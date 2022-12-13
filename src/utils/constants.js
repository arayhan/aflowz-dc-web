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

export const NEGATIVE_CASE_TYPES = {
	EMPTY_RESULT: 'EMPTY_RESULT',
	EMPTY_SEARCH: 'EMPTY_SEARCH',
	ERROR_CONNECTION: 'ERROR_CONNECTION'
};

export const PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];

export const MENUS = [
	{ title: 'Mitra', icon: require('@/images/icons/Icon_Home/Mitra.svg').default, path: '/mitra' },
	{ title: 'Program', icon: require('@/images/icons/Icon_Home/Program.svg').default, path: '/program' },
	{ title: 'Institusi', icon: require('@/images/icons/Icon_Home/Konstitusi.svg').default, path: '/institusi' },
	{ title: 'Penerima', icon: require('@/images/icons/Icon_Home/Penerima.svg').default, path: '/penerima' },
	{ title: 'Desa', icon: require('@/images/icons/Icon_Home/Desa.svg').default, path: '/village' },
	{ title: 'Kota', icon: require('@/images/icons/Icon_Home/Kota.svg').default, path: '/city' },
	{ title: 'Tim Internal', icon: require('@/images/icons/Icon_Home/Staff.svg').default, path: '/staff' },
	{ title: 'Dapil', icon: require('@/images/icons/box.svg').default, path: '/dapil' },
	{ title: 'Absensi', icon: require('@/images/icons/box.svg').default, path: '/absensi' },
	{ title: 'Inventory', icon: require('@/images/icons/box.svg').default, path: '/stockiest' },
	{ title: 'Kegiatan', icon: require('@/images/icons/box.svg').default, path: '/activity' }
];
