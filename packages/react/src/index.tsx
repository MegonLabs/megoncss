import React, {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

// ─── Button ───
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success"
    | "warning";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  block?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      block,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const classes = [
      "btn",
      `btn-${variant}`,
      size !== "md" ? `btn-${size}` : "",
      block ? "btn-block" : "",
      loading ? "btn-loading" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

// ─── Input ───
export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  error?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, size, className, ...props }, ref) => {
    const classes = [
      "input",
      error ? "input-error" : "",
      size ? `input-${size}` : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <input ref={ref} className={classes} {...props} />;
  },
);

Input.displayName = "Input";

// ─── Select ───
export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  error?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, size, className, children, ...props }, ref) => {
    const classes = [
      "select",
      error ? "input-error" : "",
      size ? `select-${size}` : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <select ref={ref} className={classes} {...props}>
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";

// ─── Textarea ───
export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  error?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, size, className, ...props }, ref) => {
    const classes = [
      "textarea",
      error ? "input-error" : "",
      size ? `textarea-${size}` : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <textarea ref={ref} className={classes} {...props} />;
  },
);

Textarea.displayName = "Textarea";

// ─── Badge ───
export interface BadgeProps {
  variant?:
    | "default"
    | "blue"
    | "red"
    | "green"
    | "yellow"
    | "orange"
    | "purple"
    | "pink";
  size?: "sm" | "md" | "lg";
  outline?: boolean;
  dot?: boolean;
  className?: string;
  children: ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size,
  outline,
  dot,
  className,
  children,
}) => {
  const classes = [
    "badge",
    variant !== "default" ? `badge-${variant}` : "",
    size ? `badge-${size}` : "",
    outline ? "badge-outline" : "",
    dot ? "badge-dot" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (dot) return <span className={classes} />;

  return <span className={classes}>{children}</span>;
};

// ─── Alert ───
export interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  icon?: ReactNode;
  closeable?: boolean;
  onClose?: () => void;
  className?: string;
  children: ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  icon,
  closeable,
  onClose,
  className,
  children,
}) => {
  const classes = ["alert", `alert-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {icon && <div className="alert-icon">{icon}</div>}
      <div className="alert-content">
        {title && <p className="alert-title">{title}</p>}
        <p className="alert-desc">{children}</p>
      </div>
      {closeable && (
        <button className="alert-close" onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};

// ─── Modal ───
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  title?: string;
  closeable?: boolean;
  className?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  size = "md",
  title,
  closeable = true,
  className,
  children,
  footer,
}) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content modal-${size} ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || closeable) && (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            {closeable && (
              <button className="modal-close" onClick={onClose}>
                &times;
              </button>
            )}
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

// ─── Toast ───
export interface ToastProps {
  type?: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  type = "info",
  title,
  description,
  onClose,
  className,
}) => {
  const classes = ["toast", `toast-${type}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="toast-content">
        <p className="toast-title">{title}</p>
        {description && <p className="toast-desc">{description}</p>}
      </div>
      {onClose && (
        <button className="toast-close" onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};

// ─── Tabs ───
export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  children: ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onChange,
  className,
  children,
}) => {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue || "");

  const handleChange = (val: string) => {
    setActiveTab(val);
    onChange?.(val);
  };

  return (
    <div className={`tabs ${className || ""}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            active: (child as any).props.value === activeTab,
            onClick: () => handleChange((child as any).props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

export interface TabProps {
  value: string;
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export const Tab: React.FC<TabProps> = ({ active, onClick, children }) => {
  return (
    <button className={`tab ${active ? "active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

// ─── Card ───
export interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children }) => {
  return <div className={`card ${className || ""}`}>{children}</div>;
};

// ─── Field ───
export interface FieldProps {
  label?: string;
  error?: string;
  description?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

export const Field: React.FC<FieldProps> = ({
  label,
  error,
  description,
  required,
  className,
  children,
}) => {
  return (
    <div className={`field-group ${className || ""}`}>
      {label && (
        <label className="label">
          {label}
          {required && <span className="text-red">*</span>}
        </label>
      )}
      {children}
      {error && <p className="field-error-msg">{error}</p>}
      {description && !error && <p className="field-desc">{description}</p>}
    </div>
  );
};
