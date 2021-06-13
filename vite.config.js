import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
const commonConfig = {
  plugins: [vue()],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
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
