import sveltePreprocess from 'svelte-preprocess'
import { resolve } from 'path'

const cwd = process.cwd()

export default {
  preprocess: sveltePreprocess({
    postcss: true
  }),
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    vite: {
      resolve: {
        alias: {
          '@': resolve(cwd, 'src/components'),
          lib: resolve(cwd, 'src/lib'),
          models: resolve(cwd, 'src/models')
        }
      }
    }
  }
}
