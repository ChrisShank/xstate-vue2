import path from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
  plugins: [createVuePlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'XStateVue2'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['@xstate/fsm', 'xstate', '@vue/composition-api'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@xstate/fsm': 'XStateFSM',
          '@vue/composition-api': 'vueCompositionApi',
          xstate: 'XState'
        }
      }
    }
  }
});
