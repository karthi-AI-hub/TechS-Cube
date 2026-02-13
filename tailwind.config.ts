import type { Config } from 'tailwindcss'

export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brandS: '#002e46',
				brand3: '#dd822f',
				ink: '#002e46',
			},
			fontFamily: {
				display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			boxShadow: {
				soft: '0 12px 40px rgba(0, 46, 70, 0.12)',
			},
		},
	},
	plugins: [],
} satisfies Config
