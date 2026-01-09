export function CardLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="8" width="30" height="24" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="2" y1="15" x2="32" y2="15" stroke="currentColor" strokeWidth="2" />
      <text
        x="38"
        y="26"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.01em"
      >
        CARD
      </text>
    </svg>
  )
}
