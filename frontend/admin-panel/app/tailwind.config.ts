import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          admin: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        onprimary: "hsl(var(--on-primary))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
          "10": "hsl(var(--chart-10))",
          "20": "hsl(var(--chart-20))",
          "30": "hsl(var(--chart-30))",
          "40": "hsl(var(--chart-40))",
          "50": "hsl(var(--chart-50))",
          "100": "hsl(var(--chart-100))",
          "200": "hsl(var(--chart-200))",
          "300": "hsl(var(--chart-300))",
          "400": "hsl(var(--chart-400))",
          "500": "hsl(var(--chart-500))",
        },
        green: {
          "50": "#e0e6dc",
          "100": "#c1cdba",
          "200": "#a2b497",
          "300": "#839b75",
          "400": "#748e64",
          "500": "#658253",
          "600": "#5a754a",
          "700": "#465b3a",
          "800": "#324129",
          "900": "#1e2718",
          "950": "#141a10",
          DEFAULT: "#658253",
        },
        red: {
          DEFAULT: "#d95e3f",
        },
        yellow: {
          DEFAULT: "#f1c84b",
        },
        blue: {
          "100": "#0089F1",
        },
        light: {
          "100": "#D6E0FF",
          "200": "#EED1AC",
          "300": "#F8F8FF",
          "400": "#EDF1F1",
          "500": "#8D8D8D",
          "600": "#F9FAFB",
          "700": "#E2E8F0",
          "800": "#F8FAFC",
        },
        dark: {
          "100": "#16191E",
          "200": "#3A354E",
          "300": "#232839",
          "400": "#1E293B",
          "500": "#0F172A",
          "600": "#333C5C",
          "700": "#464F6F",
          "800": "#1E2230",
        },
        gray: {
          "100": "#CBD5E1",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
