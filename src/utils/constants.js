export const APP_NAME = process.env.REACT_APP_APP_NAME;

export const USER_ROLE_TYPES = {
	ADMIN: 'admin',
	OWNER: 'owner'
};

export const MENUS = [
	{ title: 'Mitra', icon: require('@/images/icons/box.svg').default, path: '/mitra' },
	{ title: 'Sekolah', icon: require('@/images/icons/box.svg').default, path: '/sekolah' },
	{ title: 'Kampus', icon: require('@/images/icons/box.svg').default, path: '/kampus' },
	{ title: 'Desa', icon: require('@/images/icons/box.svg').default, path: '/desa' },
	{ title: 'Kota', icon: require('@/images/icons/box.svg').default, path: '/kota' },
	{ title: 'Program', icon: require('@/images/icons/box.svg').default, path: '/program' }
];
