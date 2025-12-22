export function CircularProgress({
  size = 200,
  strokeWidth = 20,
  progress = 65,
  stroke = "#22c55e",

}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size}>
      {/* FUNDO */}
      <circle
        stroke="#3641537c"
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
        style={{ transition: "stroke-dashoffset 0.7s ease" }}
      />

      {/* TEXTO */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
      >
        {progress}%
      </text>
    </svg>
  );
}
