interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="card rounded-2xl p-7">
      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-xl mb-5">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed">{description}</p>
    </div>
  );
}
