module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        fontFamily: {

            'sans': ['"Montserrat"'],

            'serif': ['"Lora"', 'Georgia'],

            'mono': ['ui-monospace', 'SFMono-Regular'],

            'display': ['Oswald'],

            'body': ['"Lora"'],
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms")
    ],
}