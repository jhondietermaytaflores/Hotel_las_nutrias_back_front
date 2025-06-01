// postcss.config.js
// postcss.config.js (con módulos ES)
/* import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
}; */



// postcss.config.js funcionaba
//  module.exports = {plugins: [/* require('tailwindcss'), */ require('@tailwindcss/postcss'), require('autoprefixer'),],  }; 


export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


