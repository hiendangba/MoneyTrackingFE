import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CheckboxFieldProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "type"
> & {
  id: string;
  label: ReactNode;
  description?: string;
};

export function CheckboxField({
  id,
  label,
  description,
  ...inputProps
}: CheckboxFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className="grid gap-1">
      <label className="flex items-start gap-2.5 text-sm leading-6 text-muted">
        <input
          aria-describedby={descriptionId}
          className="mt-0.5 size-4.5 shrink-0 accent-brand-500 focus-visible:ring-4 focus-visible:ring-brand-500/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          id={id}
          type="checkbox"
          {...inputProps}
        />
        <span>{label}</span>
      </label>

      {description ? (
        <p className="m-0 pl-7 text-xs text-muted" id={descriptionId}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
