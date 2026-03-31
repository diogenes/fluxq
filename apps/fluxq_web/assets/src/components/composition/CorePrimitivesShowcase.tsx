import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Dialog } from '@/components/ui/dialog';
import { Sheet } from '@/components/ui/sheet';
import { Dropdown } from '@/components/ui/dropdown';
import { Tooltip } from '@/components/ui/tooltip';
import { Table, DenseRow } from '@/components/ui/table';
import { Alert } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export function CorePrimitivesShowcase() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder={t('primitives.inputPlaceholder')} />
        <Select defaultValue="fixture">
          <option value="fixture">fixture</option>
          <option value="live_smoke">live_smoke</option>
          <option value="live">live</option>
        </Select>
      </div>

      <Textarea placeholder={t('primitives.textareaPlaceholder')} />

      <div className="flex flex-wrap items-center gap-4">
        <label className="inline-flex items-center gap-2 text-sm">
          <Checkbox defaultChecked />
          <span>{t('primitives.checkbox')}</span>
        </label>
        <Switch label={t('primitives.switch')} defaultChecked />
        <Tooltip text={t('primitives.tooltipLabel')}>
          <Button variant="secondary" size="sm">{t('primitives.dropdownLabel')}</Button>
        </Tooltip>
      </div>

      <Dropdown label={t('primitives.dropdownLabel')}>
        <Button variant="ghost" size="sm">{t('actions.retry')}</Button>
        <Button variant="ghost" size="sm">{t('actions.reroute')}</Button>
      </Dropdown>

      <Dialog title={t('primitives.dialogTitle')} description={t('primitives.dialogDescription')} open>
        <div className="flex gap-2">
          <Button size="sm">{t('actions.acknowledge')}</Button>
          <Button variant="secondary" size="sm">{t('actions.export')}</Button>
        </div>
      </Dialog>

      <Sheet title={t('primitives.sheetTitle')}>
        <Table>
          <thead>
            <tr className="border-b border-white/8 text-xs uppercase tracking-wide text-[color:var(--fxq-text-secondary)]">
              <th className="px-3 py-2">state</th>
              <th className="px-3 py-2">lane</th>
              <th className="px-3 py-2">updated</th>
            </tr>
          </thead>
          <tbody>
            <DenseRow>
              <td className="px-3 py-2">retrying</td>
              <td className="px-3 py-2">live_smoke</td>
              <td className="px-3 py-2">12s ago</td>
            </DenseRow>
            <DenseRow>
              <td className="px-3 py-2">fallback_engaged</td>
              <td className="px-3 py-2">live</td>
              <td className="px-3 py-2">24s ago</td>
            </DenseRow>
          </tbody>
        </Table>
      </Sheet>

      <div className="grid gap-3 lg:grid-cols-3">
        <Alert tone="info" title={t('primitives.alertInfoTitle')}>
          {t('primitives.alertInfoBody')}
        </Alert>
        <Alert tone="warning" title={t('primitives.alertWarningTitle')}>
          {t('primitives.alertWarningBody')}
        </Alert>
        <Alert tone="error" title={t('primitives.alertErrorTitle')}>
          {t('primitives.alertErrorBody')}
        </Alert>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}
