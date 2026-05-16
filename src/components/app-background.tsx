export default function AppBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
      <div className="absolute top-40 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
    </div>
  );
}