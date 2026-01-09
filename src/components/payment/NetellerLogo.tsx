export function NetellerLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="10"
        y="28"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        NETELLER
      </text>
      <rect x="2" y="15" width="4" height="10" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
