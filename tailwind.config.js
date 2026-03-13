/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007AFF',
          dark: '#0A84FF',
        },
        secondary: {
          DEFAULT: '#5856D6',
          dark: '#5E5CE6',
        },
        background: {
          light: '#FFFFFF',
          dark: '#1C1C1E',
        },
        surface: {
          light: '#F8F9FA',
          dark: '#2C2C2E',
        },
        text: {
          light: '#000000',
          dark: '#FFFFFF',
          secondary: {
            light: '#6C757D',
            dark: '#8E8E93',
          }
        },
        border: {
          light: '#E9ECEF',
          dark: '#38383A',
        },
        error: {
          light: '#FF3B30',
          dark: '#FF453A',
        },
        success: {
          light: '#34C759',
          dark: '#32D74B',
        },
        warning: {
          light: '#FF9500',
          dark: '#FF9F0A',
        },
        info: {
          light: '#5AC8FA',
          dark: '#64D2FF',
        },
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'md': '16px',
        'lg': '18px',
        'xl': '20px',
        'xxl': '24px',
        'xxxl': '32px',
      },
    },
  },
  plugins: [],
}
