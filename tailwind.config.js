/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    plugins: [require('daisyui')],

    daisyui: {
        themes: [
            {
                commaleon: {
                    primary: '#FFFFFF',
                    secondary: '#BDC2D1',
                    'secondary-content': '#FFFFFF',
                    accent: '#9B9DA4',
                    neutral: '#181818',
                    'base-100': '#F5F6FA',
                    info: '#1D97FF',
                    success: '#00CA72',
                    'success-content': '#FFFFFF',
                    'error-content': '#FFFFFF',
                    warning: '#F7B731',
                    error: '#F75D59',
                },
            },
        ],
        darkTheme: 'commaleon',
        base: true,
        styled: true,
        utils: true,
        rtl: false,
        prefix: '',
        logs: true,
    },

    theme: {
        extend: {
            colors: {
                'gradient-start': '#8B2FF7', // Maviye yakın renk
                'gradient-end': '#0FF7AF', // Yeşile yakın renk
                black: '#181818',
                gray: '#BDC2D1',
                'light-gray': '#F5F6FA',
                'dark-gray': '#9B9DA4',
                purple: '#5600E8',
                error: '#F75D59',
                success: '#00CA72',
                'success-soft': 'rgba(0, 202, 114, 0.2)',
                blue: '#1D97FF',
                warning: '#F7B731',
            },
            fontSize: {
                xxs: '10px',
            },
            fontFamily: {
                sans: ['var(--font-poppins)'],
            },
            fontWeight: {
                sans: '200',
                serif: '200',
                body: '200',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1440px',
            },
            borderRadius: {
                csm: '30px',
                cxs: '15px',
                cmd: '40px',
                clg: '50px',
            },
            boxShadow: {
                DEFAULT:
                    '3px 3px 10px 3px rgba(205, 214, 243, 0.25), 2px 2px 4px 0px rgba(85, 102, 153, 0.11)',
            },
            borderColor: {
                DEFAULT: 'rgba(174, 195, 214, 0.30)',
                primary: 'rgba(174, 195, 214, 0.30)',
                secondary: '#FFFFFF',
            },
        },
    },
};
