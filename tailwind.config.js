/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./layouts/**/*.html",
        "./content/**/*.md",
        "./assets/**/*.js",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Modern, professional palette — full scale
                primary: {
                    50: "#eff6ff",
                    100: "#dbeafe",
                    200: "#bfdbfe",
                    300: "#93c5fd",
                    400: "#60a5fa",
                    500: "#3b82f6",
                    600: "#2563eb",
                    700: "#1d4ed8",
                    800: "#1e40af",
                    900: "#1e3a8a",
                    950: "#172554",
                },
                surface: {
                    50: "#fafafa",
                    100: "#f5f5f5",
                    200: "#e5e5e5",
                    300: "#d4d4d4",
                    400: "#a3a3a3",
                    500: "#737373",
                    600: "#525252",
                    700: "#404040",
                    800: "#262626",
                    900: "#171717",
                    950: "#0a0a0a",
                },
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Arial",
                    "Noto Sans",
                    "sans-serif",
                ],
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        maxWidth: "none",
                        color: theme("colors.surface.700"),
                        a: {
                            color: theme("colors.primary.600"),
                            "&:hover": {
                                color: theme("colors.primary.700"),
                            },
                        },
                    },
                },
                invert: {
                    css: {
                        color: theme("colors.surface.300"),
                        a: {
                            color: theme("colors.primary.400"),
                            "&:hover": {
                                color: theme("colors.primary.300"),
                            },
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
};
