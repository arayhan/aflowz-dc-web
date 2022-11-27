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

export const PER_PAGE_OPTIONS = [10, 20, 50, 100];

export const MENUS = [
	{ title: 'Mitra', icon: require('@/images/icons/box.svg').default, path: '/mitra' },
	{ title: 'Program', icon: require('@/images/icons/box.svg').default, path: '/program' },
	{ title: 'Konstituen', icon: require('@/images/icons/box.svg').default, path: '/konstituen' },
	{ title: 'Partner', icon: require('@/images/icons/box.svg').default, path: '/partner' }
	// { title: 'Sekolah', icon: require('@/images/icons/box.svg').default, path: '/sekolah' },
	// { title: 'Kampus', icon: require('@/images/icons/box.svg').default, path: '/kampus' },
	// { title: 'Desa', icon: require('@/images/icons/box.svg').default, path: '/desa' },
	// { title: 'Kota', icon: require('@/images/icons/box.svg').default, path: '/kota' },
];
