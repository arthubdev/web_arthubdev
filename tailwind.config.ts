import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },

      colors: {
        arthub: {
          primary: '#7B2EFF',
          secondary: '#A855F7',
          accent: '#C084FC'
        }
      }
    }
  }
}