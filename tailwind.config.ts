

const config = {
  content: [
    // "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        'custom': '30px',
        "custom-radius-10": "10px",
        "custom-radius-7": "7px"
      },
      colors: {
        'custom-color': "#0D8DC8",
        'custom-color-bg': "#F1F1F5"
      },
      fontSize: {
        "custom-fontsize": "15px",
        "custom-fontsize-19": "19px",
        "custom-fontsize-16": "16px",
        "custom-fontsize-27": "27px",
        "custom-fontsize-17": "17px"
      },
      boxShadow: {
        'custom': '0px 1px 0px 0px #DEDEDE inset, 0px -1px 0px 0px #DEDEDE inset',
        'custom-2': "0px 0px 8px 0px rgba(0, 0, 0, 0.25)"
      },
      borderWidth: {
        'custom': '1px',
      },
      borderColor: {
        'custom': '#DEDEDE',
      },
    },
  },
  // plugins: [require("flowbite/plugin")],
};
export default config;
