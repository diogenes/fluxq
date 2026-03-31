import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const rootDir = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  async viteFinal(viteConfig) {
    return {
      ...viteConfig,
      plugins: [...(viteConfig.plugins ?? []), tailwindcss()],
      resolve: {
        ...(viteConfig.resolve ?? {}),
        alias: {
          ...(viteConfig.resolve?.alias ?? {}),
          '@': resolve(rootDir, '../src')
        }
      }
    };
  }
};

export default config;
