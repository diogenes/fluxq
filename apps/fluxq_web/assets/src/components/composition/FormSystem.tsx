import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { FormFieldContract, Lane } from '@/lib/ui-cx';

interface FormValues {
  workflowName: string;
  lane: Lane;
  timeoutMs: string;
  retries: string;
  notes: string;
  deterministic: boolean;
  reducedMotion: boolean;
}

const formFields: FormFieldContract[] = [
  {
    id: 'workflowName',
    labelKey: 'runtime.cy.formSystem.fields.workflowName.label',
    descriptionKey: 'runtime.cy.formSystem.fields.workflowName.description',
    kind: 'input',
    placeholderKey: 'runtime.cy.formSystem.fields.workflowName.placeholder',
    validation: { required: true, minLength: 3 }
  },
  {
    id: 'lane',
    labelKey: 'runtime.cy.formSystem.fields.lane.label',
    kind: 'select',
    options: [
      { value: 'fixture', labelKey: 'app.lane.fixture' },
      { value: 'live_smoke', labelKey: 'app.lane.liveSmoke' },
      { value: 'live', labelKey: 'app.lane.live' }
    ],
    validation: { required: true }
  },
  {
    id: 'timeoutMs',
    labelKey: 'runtime.cy.formSystem.fields.timeoutMs.label',
    kind: 'input',
    placeholderKey: 'runtime.cy.formSystem.fields.timeoutMs.placeholder',
    validation: { required: true, pattern: '^[0-9]+$' }
  },
  {
    id: 'retries',
    labelKey: 'runtime.cy.formSystem.fields.retries.label',
    kind: 'input',
    placeholderKey: 'runtime.cy.formSystem.fields.retries.placeholder',
    validation: { required: true, pattern: '^[0-9]+$' }
  },
  {
    id: 'notes',
    labelKey: 'runtime.cy.formSystem.fields.notes.label',
    kind: 'textarea',
    placeholderKey: 'runtime.cy.formSystem.fields.notes.placeholder',
    validation: { maxLength: 240 }
  }
];

export function FormSystem() {
  const { t } = useTranslation();
  const [values, setValues] = useState<FormValues>({
    workflowName: '',
    lane: 'fixture',
    timeoutMs: '45000',
    retries: '2',
    notes: '',
    deterministic: true,
    reducedMotion: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const laneTone = values.lane === 'live' ? 'warning' : values.lane === 'live_smoke' ? 'info' : 'success';

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (values.workflowName.trim().length < 3) {
      nextErrors.workflowName = t('runtime.cy.formSystem.validation.workflowName');
    }
    const timeout = Number(values.timeoutMs);
    if (Number.isNaN(timeout) || timeout < 5000 || timeout > 300000) {
      nextErrors.timeoutMs = t('runtime.cy.formSystem.validation.timeoutMs');
    }
    const retries = Number(values.retries);
    if (Number.isNaN(retries) || retries < 0 || retries > 5) {
      nextErrors.retries = t('runtime.cy.formSystem.validation.retries');
    }
    if (values.notes.length > 240) {
      nextErrors.notes = t('runtime.cy.formSystem.validation.notes');
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = () => {
    setSaved(false);
    if (!validate()) return;
    setSaved(true);
  };

  const summary = useMemo(
    () => [
      `${t('runtime.cy.formSystem.fields.workflowName.label')}: ${values.workflowName || '-'}`,
      `${t('runtime.cy.formSystem.fields.lane.label')}: ${values.lane}`,
      `${t('runtime.cy.formSystem.fields.timeoutMs.label')}: ${values.timeoutMs}`,
      `${t('runtime.cy.formSystem.fields.retries.label')}: ${values.retries}`
    ],
    [t, values]
  );

  return (
    <section className="space-y-3 rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="fxq-display text-base font-semibold">{t('runtime.cy.formSystem.title')}</h3>
        <Badge tone={laneTone}>{values.lane}</Badge>
      </div>

      <p className="text-sm text-[color:var(--fxq-text-secondary)]">
        {t('runtime.cy.formSystem.description')}
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        {formFields.map((field) => (
          <label key={field.id} className="min-w-0 space-y-1 text-sm">
            <span className="font-medium">{t(field.labelKey)}</span>
            {field.descriptionKey ? (
              <span className="block text-xs text-[color:var(--fxq-text-secondary)]">{t(field.descriptionKey)}</span>
            ) : null}
            {field.kind === 'input' ? (
              <Input
                value={values[field.id as keyof FormValues] as string}
                onChange={(event) => setValues((current) => ({ ...current, [field.id]: event.target.value }))}
                placeholder={field.placeholderKey ? t(field.placeholderKey) : undefined}
                className={errors[field.id] ? 'border-[color:var(--fxq-semantic-error)]/50' : undefined}
              />
            ) : null}
            {field.kind === 'select' ? (
              <Select
                value={values.lane}
                onChange={(event) => setValues((current) => ({ ...current, lane: event.target.value as Lane }))}
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>{t(option.labelKey)}</option>
                ))}
              </Select>
            ) : null}
            {field.kind === 'textarea' ? (
              <Textarea
                value={values.notes}
                onChange={(event) => setValues((current) => ({ ...current, notes: event.target.value }))}
                placeholder={field.placeholderKey ? t(field.placeholderKey) : undefined}
                rows={3}
                className={errors[field.id] ? 'border-[color:var(--fxq-semantic-error)]/50' : undefined}
              />
            ) : null}
            {errors[field.id] ? (
              <span className="block text-xs text-[color:var(--fxq-semantic-error)]">{errors[field.id]}</span>
            ) : null}
          </label>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={values.deterministic}
            onChange={(event) => setValues((current) => ({ ...current, deterministic: event.target.checked }))}
          />
          <span>{t('runtime.cy.formSystem.fields.deterministic.label')}</span>
        </label>
        <Switch
          checked={values.reducedMotion}
          onChange={(event) => setValues((current) => ({ ...current, reducedMotion: event.target.checked }))}
          label={t('runtime.cy.formSystem.fields.reducedMotion.label')}
        />
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <Button type="button" size="sm" variant="ghost" onClick={() => setValues((current) => ({ ...current, workflowName: '', notes: '' }))}>
          {t('runtime.cy.formSystem.clear')}
        </Button>
        <Button type="button" size="sm" variant="secondary" onClick={submit}>
          {t('runtime.cy.formSystem.submit')}
        </Button>
      </div>

      <div className="space-y-2 rounded-[var(--fxq-radius-sm)] border border-white/8 bg-[color:var(--fxq-background-surface-low)]/70 p-2">
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">
          {t('runtime.cy.formSystem.summary')}
        </div>
        {summary.map((item) => (
          <div key={item} className="fxq-mono text-xs break-words">{item}</div>
        ))}
        {saved ? (
          <Badge tone="success">{t('runtime.cy.formSystem.saved')}</Badge>
        ) : null}
      </div>
    </section>
  );
}
