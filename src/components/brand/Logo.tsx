import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
};

const sizeMap = {
  sm: { icon: 32, text: "text-lg" },
  md: { icon: 40, text: "text-xl" },
  lg: { icon: 52, text: "text-2xl md:text-3xl" },
};

export function Logo({
  className,
  showText = true,
  size = "md",
  href = "/",
}: LogoProps) {
  const { icon, text } = sizeMap[size];

  const mark = (
    <>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="shrink-0"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="#C8A45C"
          strokeWidth="1.25"
          opacity="0.85"
        />
        <path
          d="M24 8 L28 18 L38 18 L30 24 L33 34 L24 28 L15 34 L18 24 L10 18 L20 18 Z"
          fill="none"
          stroke="#C8A45C"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="22" r="4" fill="#C8A45C" opacity="0.9" />
        <path
          d="M14 38 Q24 42 34 38"
          stroke="#8B1E1E"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
      {showText && (
        <span className={cn("font-display leading-none tracking-wide", text)}>
          <span className="text-ivory">City </span>
          <span className="text-gold">Top</span>
        </span>
      )}
    </>
  );

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 transition-opacity hover:opacity-90",
        className,
      )}
      aria-label="City Top — Home"
    >
      {mark}
    </Link>
  );
}
