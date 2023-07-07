import daisyUi from "daisyui";
import typographyPlugin from "@tailwindcss/typography";
import formsPlugin from "@tailwindcss/forms";
import containerQueriesPlugin from "@tailwindcss/container-queries";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    borderColor: {
      brand: "#fff",
    },
    extend: {
      width: {
        112: "28rem",
      },
    },
  },
  plugins: [daisyUi, typographyPlugin, formsPlugin, containerQueriesPlugin],
  daisyUi: {
    themes: ["dark"],
  },
};
