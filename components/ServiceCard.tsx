interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({
  icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="card-hover bg-[#111111] border border-[#1a1a1a] rounded-2xl p-7">
      <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-2xl mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#f5f5f5] mb-2">{title}</h3>
      <p className="text-sm text-[#666666] leading-relaxed">{description}</p>
    </div>
  );
}
