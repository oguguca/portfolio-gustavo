import './ShinyText.css'

interface ShinyTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export default function ShinyText({
  text,
  className = '',
  speed = 3.5,
  delay = 1.5,
}: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
      }}
    >
      {text}
    </span>
  )
}