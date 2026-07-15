export type Size = "sm" | "md" | "lg";
export type Variant = "primary" | "secondary" | "tertiary" | "link";
export type Status = "danger" | "success" | "warning" | "info";

export const SIZES: Size[] = ["sm", "md", "lg"];
export const VARIANTS: Variant[] = ["primary", "secondary", "tertiary", "link"];
export const STATUSES: Status[] = ["danger", "success", "warning", "info"];

export const DEFAULT_SIZE: Size = "md";
export const DEFAULT_VARIANT: Variant = "secondary";

export const sizeClasses: Record<Size, string> = {
    sm: "h-8 text-sm gap-1",
    md: "h-10 text-base gap-1",
    lg: "h-12 text-lg gap-2",
};

export const paddingClasses: Record<Size, string> = {
    sm: "px-2",
    md: "px-2",
    lg: "px-4",
};

export const radiusClasses: Record<Size, string> = {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-lg",
};

export const iconSizeClasses: Record<Size, string> = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
};

export const variantClasses: Record<Variant, string> = {
    primary: "border border-primary bg-primary text-primary-foreground",
    secondary: "border border-border bg-surface text-foreground",
    tertiary: "border border-transparent bg-transparent text-foreground",
    link: "border border-transparent bg-transparent text-primary underline underline-offset-2",
};

export const statusClasses: Record<Status, string> = {
    danger: "border border-danger bg-danger text-danger-foreground",
    success: "border border-success bg-success text-success-foreground",
    warning: "border border-warning bg-warning text-warning-foreground",
    info: "border border-info bg-info text-info-foreground",
};

export const activeClasses =
    "relative z-10 border border-accent bg-accent-soft text-foreground";
export const disabledClasses = "opacity-50 pointer-events-none";
export const shadowClasses = "shadow-md";
