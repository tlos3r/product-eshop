/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                jelly: {
                    "0%, 100%": { transform: "scale(1, 1)" },
                    "20%": { transform: "scale(0.9, 1.1)" },
                    "50%": { transform: "scale(1.1, 0.9)" },
                    "750%": { transform: "scale(0.95, 1.05)" },
                },
            },
            animation: {
                jelly: "jelly 0.5s ease-in-out",
            },
        },
        container: {
            center: true,
        },
    },
    plugins: [],
};
