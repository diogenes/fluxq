import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@/i18n/i18n';
import { AppShell } from '@/components/shell/AppShell';
import { WorkspaceOverview } from '@/components/workspace/WorkspaceOverview';
import './styles/app.css';

function FallbackPreviewPage() {
  const { t } = useTranslation();

  return (
    <AppShell
      lane="fixture"
      title={t('workspace.title')}
      subtitle={t('workspace.description')}
    >
      <WorkspaceOverview />
    </AppShell>
  );
}

async function mountInertiaApp() {
  await createInertiaApp({
    id: 'app',
    resolve: async (name: string) => {
      const pages = import.meta.glob('./pages/**/*.tsx');
      const key = `./pages/${name}.tsx`;
      const loader = pages[key];

      if (!loader) {
        return FallbackPreviewPage;
      }

      const module = (await loader()) as { default: ComponentType<Record<string, unknown>> };
      return module.default;
    },
    setup({ App, el, props }) {
      createRoot(el).render(
        <I18nextProvider i18n={i18n}>
          <App {...props} />
        </I18nextProvider>
      );
    }
  });
}

const root = document.getElementById('app');

if (root?.dataset.page) {
  void mountInertiaApp();
} else if (root) {
  createRoot(root).render(
    <I18nextProvider i18n={i18n}>
      <FallbackPreviewPage />
    </I18nextProvider>
  );
}
