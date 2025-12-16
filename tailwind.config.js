/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                mystic: '#E8D5F2',
                cosmic: '#1a1a2e',
                party: '#FFB6C1',
            },
        },
    },
    plugins: [],
}