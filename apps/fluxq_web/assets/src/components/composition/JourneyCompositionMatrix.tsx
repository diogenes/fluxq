import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

interface JourneyRow {
  readonly journeyKey: string;
  readonly families: string;
  readonly lanes: string;
}

const rows: JourneyRow[] = [
  { journeyKey: 'runtime.journeyMatrix.operatorOverview', families: 'CX-F01, CX-F02, CX-F03, CX-F05, CX-F06, CX-F07, CX-F12, CX-F15', lanes: 'fixture/live_smoke/live' },
  { journeyKey: 'runtime.journeyMatrix.runDetail', families: 'CX-F01, CX-F02, CX-F03, CX-F04, CX-F08, CX-F09, CX-F10, CX-F15', lanes: 'fixture/live_smoke/live' },
  { journeyKey: 'runtime.journeyMatrix.workflowAuthoring', families: 'CX-F01, CX-F02, CX-F03, CX-F04, CX-F11, CX-F15', lanes: 'fixture/live_smoke/live' },
  { journeyKey: 'runtime.journeyMatrix.providerOperations', families: 'CX-F01, CX-F02, CX-F03, CX-F05, CX-F06, CX-F07, CX-F10, CX-F12, CX-F15', lanes: 'fixture/live_smoke/live' },
  { journeyKey: 'runtime.journeyMatrix.portabilityAnalytics', families: 'CX-F01, CX-F02, CX-F03, CX-F05, CX-F06, CX-F07, CX-F10, CX-F12, CX-F13, CX-F15', lanes: 'fixture/live_smoke/live' }
];

export function JourneyCompositionMatrix() {
  const { t } = useTranslation();

  return (
    <Card className="space-y-3">
      <h3 className="fxq-display text-lg font-semibold">{t('runtime.journeyMatrix.title')}</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/8 text-xs uppercase tracking-wide text-[color:var(--fxq-text-secondary)]">
              <th className="px-3 py-2">{t('runtime.journeyMatrix.headers.journey')}</th>
              <th className="px-3 py-2">{t('runtime.journeyMatrix.headers.componentFamilies')}</th>
              <th className="px-3 py-2">{t('runtime.journeyMatrix.headers.laneSemantics')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.journeyKey} className="border-b border-white/6 align-top text-xs">
                <td className="px-3 py-2 font-medium">{t(row.journeyKey)}</td>
                <td className="px-3 py-2 fxq-mono text-[11px]">{row.families}</td>
                <td className="px-3 py-2 text-[color:var(--fxq-text-secondary)]">{row.lanes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
