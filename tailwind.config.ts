import { createPlugin } from '@itsallsavvy/savvy-resuable-components'
import type { Config } from 'tailwindcss'

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src//**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/*components*/*.{js,ts,jsx,tsx,mdx}',

      // Include the file paths from node_modules to work Tailwind classes properly. UI library like Flowbite uses this way.
      './node_modules/@itsallsavvy/savvy-resuable-components/**/*js',
   ],
   theme: {
      extend: {
         boxShadow: {
            '03': '0 3.5px 5.5px 0 rgba(0,0,0,0.02)',
         },
         fontSize: {
            '2xs': '10px',
         },
         colors: {
            'panel-primary': '#F8F9FA',
         },
         screens: {
            '2xl': '1440px',
         },
         spacing: {
            '25': '100px',
            '50': '200px',
            '120': '480px',
            '140': '560px',
            '160': '1000px',
            'side-bar': '700px',
            'nav-menu': '280px',
         },
         backgroundImage: {
            'login-cat-img': `url('/assets/login-cat-img.jpg')`,
            'login-dog-img': `url('/assets/login-dog-img.jpg')`,
         },
      },
   },
   plugins: [
      createPlugin({
         // Add the primary color to override the default color.
         // primaryColor: '#98eb34'
      }),
      require('@tailwindcss/forms')({ strategy: 'class' }),
   ],
}
export default config
