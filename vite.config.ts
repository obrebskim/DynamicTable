import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { UserConfig } from 'vitest/config';

const config: UserConfig = {
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
};

// https://vitejs.dev/config/
export default defineConfig(config);
