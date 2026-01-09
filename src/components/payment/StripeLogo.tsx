export function StripeLogo({ className = "" }: { className?: string }) {
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
        STRIPE
      </text>
      <rect x="3" y="18" width="4" height="4" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
