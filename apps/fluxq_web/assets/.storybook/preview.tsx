import type { Preview } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@/i18n/i18n';
import '../src/styles/app.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true }
  },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <div className="dark min-h-screen bg-[color:var(--fxq-background-base)] text-[color:var(--fxq-text-primary)]">
          <Story />
        </div>
      </I18nextProvider>
    )
  ]
};

export default preview;
