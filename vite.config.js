import vue from '@vitejs/plugin-vue';
import path from 'path';
import { builtinModules } from 'module';

// https://vitejs.dev/config/
const commonConfig = {
  plugins: [vue()],
  root: './renderer',
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      external: ['electron', ...builtinModules],
    },
  },
};

export default ({ command, mode }) => {
  if (mode === 'development') {
    return {
      ...commonConfig,
      server: {
        port: 3000,
      },
    };
  } else {
    return {
      base: path.resolve(__dirname, './dist/'),
      ...commonConfig,
    };
  }
};
