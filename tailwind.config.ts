import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tw-elements-react/js/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in-out",
      },
      backgroundImage: {
        "custom-background":
          'url("../../../public/assets/loginyregister/lyr2.png")',
      },
    },
  },
  plugins: [require("daisyui"), require("tw-elements/plugin.cjs")],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "daisy-",
    darkTheme: "light",
  },
};

export default config;
