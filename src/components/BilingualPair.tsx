type BilingualPairProps = {
  en: string;
  ar: string;
  className?: string;
  enClassName?: string;
  arClassName?: string;
};

export function BilingualPair({
  en,
  ar,
  className = "",
  enClassName = "",
  arClassName = "",
}: BilingualPairProps) {
  return (
    <div className={`grid gap-2 sm:grid-cols-2 sm:gap-6 ${className}`}>
      <div className={`text-left ${enClassName}`}>{en}</div>
      <div className={`text-right font-ar ${arClassName}`} dir="rtl">
        {ar}
      </div>
    </div>
  );
}
