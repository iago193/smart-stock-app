type CircularProgressProps = {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0 – 100
};

function getProgressColor(progress: number) {
  if (progress < 40) return "#ef4444"; // red-500
  if (progress < 70) return "#facc15"; // yellow-400
  return "#22c55e"; // green-500
}

export function CircularProgress({
  size = 180,
  strokeWidth = 18,
  progress,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  const stroke = getProgressColor(progress);

  return (
    <svg width={size} height={size}>
      {/* FUNDO */}
      <circle
        stroke="#374151"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />

      {/* PROGRESSO */}
      <circle
        stroke={stroke}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{
          transition: "stroke-dashoffset 0.7s ease, stroke 0.4s ease",
        }}
      />

      {/* TEXTO */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill={stroke}
      >
        {Math.round(progress)}%
      </text>
    </svg>
  );
}
