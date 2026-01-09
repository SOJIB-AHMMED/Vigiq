export function SkrillLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="10"
        y="28"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="24"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        SKRILL
      </text>
      <circle cx="5" cy="20" r="3" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
