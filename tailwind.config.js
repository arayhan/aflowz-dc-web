/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem',
			},
			colors: {
				primary: {
					100: '#d4dbe4',
					200: '#a9b7c9',
					300: '#7d94ad',
					400: '#527092',
					DEFAULT: '#274c77',
					500: '#274c77',
					600: '#1f3d5f',
					700: '#172e47',
					800: '#101e30',
					900: '#080f18',
				},
			},
			fontFamily: {
				primary: ['"Inter"', 'sans-serif'],
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/line-clamp'),
	],
};
