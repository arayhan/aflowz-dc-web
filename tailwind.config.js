/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1.5rem'
			},
			colors: {
				primary: {
					50: '#e2effc',
					100: '#c0def7',
					200: '#87c4f2',
					300: '#48a7e8',
					400: '#208bd7',
					DEFAULT: '#1373bf',
					500: '#1373bf',
					600: '#105894',
					700: '#114b7b',
					800: '#144066',
					900: '#103352'
				}
			},
			fontFamily: {
				primary: ['"Inter"', 'sans-serif']
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/line-clamp')
	]
};
