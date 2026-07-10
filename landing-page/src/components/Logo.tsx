export default function Logo({ size = "text-headline-md" }: { size?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`material-symbols-outlined text-primary ${size}`}>school</span>
      <span className={`${size} font-headline-md font-bold text-primary`}>Scholarly</span>
    </div>
  );
}
