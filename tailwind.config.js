/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            animation: {
                blink: 'blink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                strokeCircle: 'stroke .6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
                strokeCircleSlow: 'stroke 3s cubic-bezier(0.65, 0, 0.45, 1) forwards',
                strokeCheck: 'stroke .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards',
                fillGreen: 'fillGreen .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both',
                fillRed: 'fillRed .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both',
                swing: 'swing 1.3s ease-in-out infinite alternate',
                swinghair: 'swinghair 1.3s ease-in-out infinite alternate',
                flip: 'flip 1000ms 1.6s ease-in-out forwards',
                cross1a: 'cross1 300ms 1s ease-in-out forwards',
                cross2a: 'cross2 400ms 1.2s ease-in-out forwards',
                cross1b: 'cross1 400ms 1.1s ease-in-out forwards',
                cross2b: 'cross2 500ms 1.3s ease-in-out forwards',
                flipReverse: 'flipReverse 300ms',
                cross1Reverse: 'cross1Reverse 300ms',
                cross2Reverse: 'cross2Reverse 300ms',
                spin: 'spin 2s linear infinite',
                loading0: 'blurText 1.5s 0s infinite linear alternate',
                loading1: 'blurText 1.5s 0.2s infinite linear alternate',
                loading2: 'blurText 1.5s 0.4s infinite linear alternate',
                loading3: 'blurText 1.5s 0.6s infinite linear alternate',
                loading4: 'blurText 1.5s 0.8s infinite linear alternate',
                loading5: 'blurText 1.5s 1s infinite linear alternate',
                loading6: 'blurText 1.5s 1.2s infinite linear alternate',
                loading7: 'blurText 1.5s 1.4s infinite linear alternate',
                loading8: 'blurText 1.5s 1.6s infinite linear alternate',
                loading9: 'blurText 1.5s 1.8s infinite linear alternate',
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 },
                },
                stroke: {
                    '100%': { strokeDashoffset: 0 },
                },
                scale: {
                    '0%, 100%': { transform: 'none' },
                    '50%': { transform: 'scale3d(1.1, 1.1, 1)' },
                },
                fillGreen: {
                    '100%': { boxShadow: 'inset 0px 0px 0px 180px #84cc16' },
                },
                fillRed: {
                    '100%': { boxShadow: 'inset 0px 0px 0px 180px #ef4444' },
                },
                swing: {
                    '0%': { transform: 'rotate(10deg)' },
                    '100%': { transform: 'rotate(-10deg)' },
                },
                swinghair: {
                    '0%': { transform: 'rotate(6deg)' },
                    '100%': { transform: 'rotate(-6deg)' },
                },
                cross1: {
                    '0%': {
                        transform: 'rotate(45deg) scaleX(0) scaleY(0.7)',
                        boxShadow: '0 1vmin 5vmin rgba(0, 0, 0, 0)',
                    },
                    '100%': {
                        transform: 'rotate(45deg) scaleX(1) scaleY(1)',
                        boxShadow: '0 1vmin 5vmin rgba(0, 0, 0, 0.5)',
                    },
                },
                cross2: {
                    '0%': {
                        transform: 'rotate(-45deg) scaleX(0) scaleY(0.7)',
                        boxShadow: '0 1vmin 5vmin rgba(0, 0, 0, 0)',
                    },
                    '100%': {
                        transform: 'rotate(-45deg) scaleX(1) scaleY(1)',
                        boxShadow: '0 1vmin 5vmin rgba(0, 0, 0, 0.5)',
                    },
                },
                cross1Reverse: {
                    '100%': {
                        transform: 'rotate(45deg) scaleX(0) scaleY(0.7)',
                        boxShadow: '0 1vmin 5vmin rgba(0, 0, 0, 0)',
                        opacity: 0,
                    },
                    '0%': {
                        transform: 'rotate(45deg) scaleX(1) scaleY(1)',
                        boxShadow: '0 1vmin 5vmin rgba(0, 0, 0, 0.5)',
                        opacity: 1,
                    },
                },
                cross2Reverse: {
                    '100%': {
                        transform: 'rotate(-45deg) scaleX(0) scaleY(0.7)',
                        boxShadow: '0 1vmin 5vmin rgba(0, 0, 0, 0)',
                        opacity: 0,
                    },
                    '0%': {
                        transform: 'rotate(-45deg) scaleX(1) scaleY(1)',
                        boxShadow: '0 1vmin 5vmin rgba(0, 0, 0, 0.5)',
                        opacity: 1,
                    },
                },
                flip: {
                    '0%': {
                        transform: 'rotate(-90deg) rotateY(0deg) translateX(0)',
                    },
                    '60%': {
                        transform: 'rotate(-90deg) rotateY(200deg) translateX(3vmin)',
                    },
                    '80%': {
                        transform: 'rotate(-90deg) rotateY(170deg) translateX(3vmin)',
                    },
                    '100%': {
                        transform: 'rotate(-90deg) rotateY(180deg) translateX(3vmin)',
                    },
                },
                flipReverse: {
                    '100%': {
                        transform: 'rotate(-90deg) rotateY(0deg) translateX(0)',
                    },
                    '40%': {
                        transform: 'rotate(-90deg) rotateY(200deg) translateX(3vmin)',
                    },
                    '20%': {
                        transform: 'rotate(-90deg) rotateY(170deg) translateX(3vmin)',
                    },
                    '0%': {
                        transform: 'rotate(-90deg) rotateY(180deg) translateX(3vmin)',
                    },
                },
                spin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                blurText: {
                    '0%': { filter: 'blur(0px)' },
                    '100%': { filter: 'blur(4px)' },
                },
            },
            colors: {
                'bg-light': '#f1f5f9', // slate-100
                'active-light': '#fdba74', // orange-300
                'secondary-light': '#84cc16', // lime-500
                'secondary-active-light': '#bef264', // lime-300
                'bg-dark': '#713f12', // yellow-900
                'active-dark': '#84cc16', // lime-500
                'secondary-dark': '#fdba74', // orange-300
                'secondary-active-dark': '#f97316', // orange-500
                ok: '#84cc16', // lime-500
                error: '#ef4444', // red-500
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
