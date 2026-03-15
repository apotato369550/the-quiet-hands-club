export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 12 Q16 11 24 12" />
      <path d="M7 16 Q16 15 25 16" />
      <path d="M8 20 Q16 19 24 20" />
      <path d="M9 24 Q11 22 14 20" />
    </svg>
  )
}
