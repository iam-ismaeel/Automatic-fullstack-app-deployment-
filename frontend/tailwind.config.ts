import type { Config } from "tailwindcss";
import typography from "./custom/typography";
import plugin from "tailwindcss/plugin";
import btn from "./custom/btn";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "banner-4": "url('/img/banner4.png')",
        "banner-5": "url('/img/banner5.png')",
        "banner-6": "url('/img/banner6.png')",
        "banner-8": "url('/img/banner-6.jpg')",
        "banner-top-1": "url('/img/AZANY-TOP-1.jpg')",
        "banner-top-2": "url('/img/AZANY-TOP-2.jpg')",
        "banner-top-3": "url('/img/Azany-top-3.jpg')",
        "banner-top-4": "url('/img/Azany-top-4.jpg')",
        "banner-bottom-1": "url('/img/AZANY-BOTTOM-1.jpg')",
        "banner-bottom-2": "url('/img/AZANY-BOTTOM-2.jpg')",
        "hair-1": "url('/img/hair1.png')",
        "hair-1-mobile": "url('/img/hair1-mobile.jpg')",
        azanypay: "url('/img/azanypay.jpeg')",
        "azanypay-mobile": "url('/img/azanypay-mobile.jpeg')",
        "hair-2": "url('/img/hair2.png')",
        "hair-3": "url('/img/hair3.png')",
        foodstuff: "url('/img/foodstuff.png')",
        "banner-7": "url('/img/banner7.png')",
        banner: "url('/img/banner.png')",
        caribbean: "url('/img/caribbean-island.png')",
        norway: "url('/img/norway.png')",
        trinidad: "url('/img/trinidad.png')",
        "who-we-are": "url('/img/who-we-are.png')",
        onboard: "url('/img/onboard.jpg')",
        callback: "url('/img/bg-callback.png')",
        processing: "url('/img/bg-processing.png')",
        successful: "url('/img/bg-successful.png')",
        // "b2b-bg":
        "affiliate-feedback": "url('/img/affiliate-feedback.png')",
        "home-appliance-gradient":
          "radial-gradient(50% 50% at 50% 50%, #F46C7C 0%, #DB4444 100%)",
      },
      clipPath: {
        "custom-circle": "circle(50% at 14% 50%)",
      },
      colors: {
        "primary-light": "#DB4444",
        primary: "#8b0000",
        "secondary-light": "#F5F5F5",
        secondary: "#EEEEEE",
        black: "#000000",
        success: "#279F51",
        main: "#E02014",
        guyana: "#BE1E2D",
        "main-light": "#f7dfde",
        subscription: {
          green: "#009B3A",
          blue: "#0F60FF",
          "light-blue": "#EFF4FA",
          gray: "#787E88",
          "light-gray": "#B3B7BB",
          "dark-gray": "#1A1A1A",
          red: "#BE1E2D",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        "libre-baskerville": ["var(--font-libre-baskerville)"],
        "public-sans": ["var(--font-public-sans)"],
        inter: ["var(--font-inter)"],
        "open-sans": ["var(--font-open-sans)"],
        roboto: ["var(--font-roboto)"],
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1024px" },
      slg: { max: "900px" },
      md: { max: "767px" },
      smd: { max: "596px" },
      sm: { max: "425px" },
      xsm: { max: "375px" },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms"),
    plugin(function ({ addComponents, addUtilities }) {
      const newComponents: any = {
        ...typography,
        ...btn,
      };
      addComponents(newComponents);

      addUtilities({
        ".steptransition::before": {
          content: '""',
          transition: "width 0.3s ease-in",
        },
        ".underline-after-line::after": {
          content: "''",
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "25%", // Adjust width
          height: "5px", // Adjust height
          backgroundColor: "#DB4444",
        },
      });
    }),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#DB4444",
          secondary: "#F5F5F5",
          white: "#FFFFFF",
        },
      },
    ],
  },
};
export default config;
