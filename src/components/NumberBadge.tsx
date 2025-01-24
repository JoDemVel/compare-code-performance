interface NumberBadgeProps {
  number: number;
  className?: string;
  ariaLabel?: string;
}

export const NumberBadge = ({
  number,
  className,
  ariaLabel,
}: NumberBadgeProps) => (
  <span
    className={`bg-badge text-badge-foreground flex justify-center items-center rounded-full w-8 h-8 text-sm font-medium ${
      className ?? ''
    }`}
    aria-label={ariaLabel}
  >
    {number}
  </span>
);
