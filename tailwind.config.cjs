module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  purge: {
    content: [
      '.src/**/*.html',
      '.src/**/*.svelte',
    ],
    options: {
      // This is where we define classes as strings that we want to keep
      safelist: []
    }
  },
  darkMode: false,
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      blue: {
        light: '#afd1ff',
        DEFAULT: '#366bb4',
        dark: '#111827'
      },
      white: {
        DEFAULT: '#ffffff'
      },
      gray: {
        DEFAULT: '#e2e8f0'
      }
    },
    fontFamily: {
      title: ['BebasNeue'],
      text: ['Allerta']
    }
  }
}
