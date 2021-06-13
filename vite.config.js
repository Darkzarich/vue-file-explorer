import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

const commonConfig = {
  plugins: [vue()],
};

export default ({ command, mode }) => {
  if (mode === 'development') {
    return {
      ...commonConfig,
    };
  } else {
    return {
      base: path.resolve(__dirname, './dist/'),
      ...commonConfig,
    };
  }
};
