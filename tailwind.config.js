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
				},
				secondary: {
					100: '#fce2d1',
					200: '#f9c4a3',
					300: '#f7a774',
					400: '#f48946',
					500: '#f16c18',
					DEFAULT: '#f16c18',
					600: '#c15613',
					700: '#91410e',
					800: '#602b0a',
					900: '#301605'
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
