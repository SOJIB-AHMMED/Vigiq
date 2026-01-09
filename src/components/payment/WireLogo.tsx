export function WireLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="10"
        y="28"
        fontFamily="JetBrains Mono, monospace"
        fontSize="18"
        fontWeight="600"
        fill="currentColor"
        letterSpacing="0.05em"
      >
        WIRE TRANSFER
      </text>
      <line x1="3" y1="20" x2="6" y2="20" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </svg>
  )
}
