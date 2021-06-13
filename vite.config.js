import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
const commonConfig = {
  plugins: [vue()],
  root: './renderer',
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
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
