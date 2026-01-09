export function PayPalLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="10"
        y="28"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.01em"
      >
        PAYPAL
      </text>
      <path d="M5 15 L8 22 L5 29 Z" fill="currentColor" opacity="0.6" />
      <path d="M4 15 L7 22 L4 29 Z" fill="currentColor" opacity="0.4" />
    </svg>
  )
}
