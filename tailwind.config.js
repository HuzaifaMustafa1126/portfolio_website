/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: ['sr-only'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        line: 'var(--color-line)',
      },
      fontFamily: { sans: ['var(--font-sans)'] },
      maxWidth: { site: 'var(--container-max)' },
      spacing: { gutter: 'var(--gutter)', section: 'var(--space-section)' },
    },
  },
  plugins: [],
}
