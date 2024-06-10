/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "verhalen-photo-cover": "url(https://picsum.photos/500?random=1)",
      },
      colors: {
        accent: "#ff7a00",
        "accent-darker": "#9d4f17",
        primary: "#545454",
      },
    },
  },
  plugins: [],
}
