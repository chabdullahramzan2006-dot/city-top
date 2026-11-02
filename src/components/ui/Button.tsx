import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.ComponentProps<typeof Link>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gold text-bg hover:bg-gold-muted border border-gold/80 shadow-[0_0_24px_rgba(200,164,92,0.15)]",
  outline:
    "border border-gold/50 text-gold hover:bg-gold/10 hover:border-gold bg-transparent",
  ghost: "text-ivory hover:bg-ivory/5 border border-transparent",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    className,
    children,
    size = "md",
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
