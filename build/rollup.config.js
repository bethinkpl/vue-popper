import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import fs from 'fs';
import { minify } from 'csso';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    file: isProduction ? 'dist/vue-popper.min.js' : 'dist/vue-popper.js',
    format: 'umd',
    name: 'VuePopper',
  },
  plugins: [
    css({output: isProduction ? function (styles) {
        fs.writeFileSync(`dist/vue-popper.min.css`, minify(styles).css);
      } : 'vue-popper.css'}),
    vue({
      template: {},
      css: false,
    }),
    babel({
      runtimeHelpers: true,
      externalHelpers: false,
    }),
    (isProduction && terser())
  ],
};
