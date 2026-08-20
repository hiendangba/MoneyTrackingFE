import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  fieldControlClassName,
  fieldLabelClassName,
} from "./field-styles";

type TextFieldProps = Omit<ComponentPropsWithoutRef<"input">, "id"> & {
  id: string;
  label: string;
  labelAction?: ReactNode;
  helperText?: string;
  error?: string;
  endAdornment?: ReactNode;
};

export function TextField({
  id,
  label,
  labelAction,
  helperText,
  error,
  endAdornment,
  ...inputProps
}: TextFieldProps) {
  const description = error ?? helperText;
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-4">
        <label className={fieldLabelClassName} htmlFor={id}>
          {label}
        </label>
        {labelAction}
      </div>

      <div className="relative">
        <input
          aria-describedby={descriptionId}
          aria-invalid={error ? true : undefined}
          className={`${fieldControlClassName} ${error
            ? "border-red-500 focus:border-yellow-500 focus:ring-red-500/10"
            : ""
            } ${endAdornment ? "pr-16" : ""}`}
          id={id}
          {...inputProps}
        />
        {endAdornment ? (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {endAdornment}
          </div>
        ) : null}
      </div>

      {description ? (
        <p
          className={`m-0 text-xs ${error ? "text-red-500" : "text-muted"}`}
          id={descriptionId}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
