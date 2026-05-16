export default function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="group relative rounded-3xl p-[2px] bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#FF4D94] shadow-2xl">
      <div className="absolute -inset-1 rounded-3xl opacity-0 blur-xl transition duration-500 group-hover:opacity-70 bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#FF4D94]" />
      <div className={`relative rounded-3xl border border-white/10 bg-white/85 backdrop-blur-xl ${className}`}>
        {children}
      </div>
    </div>
  );
}