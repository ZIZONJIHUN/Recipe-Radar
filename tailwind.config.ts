import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF385C',
          main: '#FF385C',
          light: '#FF5A73',
          dark: '#E31E3F',
          contrast: '#FFFFFF'
        },
        neutral: {
          white: '#FFFFFF',
          black: '#000000',
          gray: {
            900: '#222222',
            700: '#6A6A6A',
            500: '#EBEBEB',
            400: '#DDDDDD',
            300: '#F2F2F2',
            200: '#F7F7F7',
            100: '#C1C1C1'
          }
        },
        semantic: {
          error: '#FF385C',
          warning: '#FFB400',
          success: '#00A86B',
          info: '#0085FF'
        },
        overlay: {
          light: 'rgba(255, 255, 255, 0.8)',
          medium: 'rgba(255, 255, 255, 0.5)',
          dark: 'rgba(0, 0, 0, 0.25)'
        }
      },
      fontFamily: {
        primary: ['"Airbnb Cereal VF"', 'Circular', '-apple-system', 'BlinkMacSystemFont', 'Roboto', '"Helvetica Neue"', 'sans-serif'],
        fallback: ['system-ui', '-apple-system', 'sans-serif']
      },
      fontSize: {
        xs: ['10px', '1.2'],
        sm: ['11px', '1.2'],
        base: ['12px', '1.4'],
        md: ['13px', '1.4'],
        lg: ['14px', '1.4'],
        xl: ['16px', '1.4'],
        '2xl': ['20px', '1.4'],
        '3xl': ['21px', '1.4'],
        '4xl': ['22px', '1.4'],
        '5xl': ['28px', '1.2']
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
      },
      spacing: {
        '1': '2px',
        '2': '3px',
        '3': '4px',
        '4': '5.5px',
        '5': '8px',
        '6': '10px',
        '7': '11px',
        '8': '12px',
        '9': '14px',
        '10': '15px',
        '11': '22px',
        '12': '24px',
        '13': '32px',
        '14': '48px',
        '15': '49px'
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '50px'
      },
      boxShadow: {
        none: 'none',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '350ms'
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-in-out',
        'slide-up': 'slideUp 250ms ease-out',
        'scale': 'scale 200ms ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scale: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      maxWidth: {
        container: '1280px'
      },
      aspectRatio: {
        listing: '1 / 1'
      }
    },
  },
  plugins: [],
}

export default config