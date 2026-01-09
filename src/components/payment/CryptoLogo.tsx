export function CryptoLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="20" r="12" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path
        d="M18 11 L18 29 M22 15 L14 15 M22 25 L14 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <text
        x="36"
        y="26"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.01em"
      >
        CRYPTO
      </text>
    </svg>
  )
}
