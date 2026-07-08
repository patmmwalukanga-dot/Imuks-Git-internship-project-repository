export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: Feature) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="mb-stack-md">
        <span className="material-symbols-outlined text-primary text-[32px]">{icon}</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm">{title}</h3>
      <p className="font-body-sm text-on-surface-variant leading-relaxed max-w-sm">{description}</p>
    </div>
  );
}
