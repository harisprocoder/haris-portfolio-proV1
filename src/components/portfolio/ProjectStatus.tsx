export default function ProjectStatus() {
  return (
    <div className="scroll-reveal">
      <div
        className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
        style={{
          background: "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.25)",
        }}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
        </span>
        <span className="text-sm font-medium" style={{ color: "#22c55e" }}>
          Available — 2 project slots open this month
        </span>
      </div>
    </div>
  );
}
