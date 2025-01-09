interface NumberBadgeProps {
  number: number;
}

export const NumberBadge = ({ number }: NumberBadgeProps) => {
  return (
    <span className="bg-badge text-badge-foreground flex justify-center items-center rounded-[9999px] w-[32px] p-2 h-[32px] text-[14px]">
      {number}
    </span>
  );
};
