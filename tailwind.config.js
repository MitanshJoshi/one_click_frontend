/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #74CC7E 0%, #00818A 100%)',
      },
    },
  },
  plugins: [function ({ addBase, config }) {
            addBase({
                ".custom-scrollbar": {
                    /* Firefox */
                    scrollbarColor: "#fffff #fff",
                    scrollbarWidth: "thin",
                    /* Chrome, Edge, and Safari */
                    "&::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#fffff",
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#fff",
                    },
                    "&::-webkit-scrollbar-button": {
                        display: "none",
                    },
                },
            });
        },],
}